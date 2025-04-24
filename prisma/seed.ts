import { createClient } from "@supabase/supabase-js";
import { OrderStatus, PrismaClient, UserRole } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Categories and offers for seeding
const medicineCategories = [
  "Analgesics (Pain Relievers)",
  "Antibiotics",
  "Antacids / Antiulcerants",
  "Antipyretics (Fever Reducers)",
  "Antihistamines / Anti-Allergic",
  "Cough & Cold Preparations",
  "Antidiabetics",
  "Cardiovascular Medicines",
  "Vitamins & Supplements",
  "Antifungal & Antiviral Drugs"
];
const offerPool = [
  { type: "BUY_X_GET_Y",       description: "Buy 12 strips, get 1 strip free" },
  { type: "BUY_X_GET_Y",       description: "Buy 10 strips, get 2 strips free" },
  { type: "PERCENT_DISCOUNT",  description: "15% off on purchase above ₹5000" },
  { type: "FREE_SAMPLE",       description: "Free sample with every purchase" },
  { type: "COMBO_OFFER",       description: "Painkiller + Antacid combo at 20% off" }
];

async function createSupabaseUser(email: string, password: string,role:UserRole) {
  const { data: { user }, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    role : role,
  });
  if (error) {
    console.error("[Supabase] error creating user", email, error);
    return null;
  }
  return user;
}

async function main() {
  // 1️⃣ Clean up old data in proper order
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();
  await prisma.agent.deleteMany();


  // 2️⃣ Create some agents
  const agents = await Promise.all(
    [1, 2, 3, 4].map(async idx => {
      const email = `agent${idx}@example.com`;
      const supaUser = await createSupabaseUser(email, 'SecureP@ssw0rd',"AGENT");
      if (!supaUser?.id) return null;

      const agent = await prisma.agent.create({
        data: {
          agentUsername: faker.internet.userName(),
          agentEmail: email,
          authId: supaUser.id
        }
      });
      console.log(`Created Agent ${agent.agentEmail}`);
      return agent;
    })
  );
  const validAgents = agents.filter(a => a !== null) as typeof agents[number][];

  // 3️⃣ Seed retailers (users) with 2–3 orders each
  for (let i = 1; i <= 10; i++) {
    const email = `retailer${i}@example.com`;
    const supaUser = await createSupabaseUser(email, '1111111111',"RETAILER");
    if (!supaUser?.id) {
      console.warn(`Skipping retailer ${email}`);
      continue;
    }

    const agent = faker.helpers.arrayElement(validAgents)!;
    const phoneE164 = `+91${faker.string.numeric(10)}`;
    const user = await prisma.user.create({
      data: {
        name: faker.company.name(),
        email,
        avatar: faker.image.avatar(),
        address: faker.location.streetAddress(),
        phone: phoneE164,
        isVerified: faker.datatype.boolean(),
        agentId: agent.id,
        role: UserRole.RETAILER,
        authId: supaUser.id,
        orders: {
          create: Array.from({ length: faker.number.int({ min: 2, max: 3 }) }).map(() => {
            const items = Array.from({ length: 25 }).map((_, idx) => {
              const qty = faker.number.int({ min: 1, max: 5 });
              const pricePerUnit = faker.number.int({ min: 50, max: 2000 });
              return {
                id: idx + 1,
                name: `${faker.science.chemicalElement().name} ${faker.number.int({ min: 5, max: 1000 })}mg`,
                manufacturer: faker.company.name(),
                pricePerUnit,
                qty,
                image: `/medicines/${faker.string.uuid()}.png`,
                stock: faker.helpers.arrayElement(["In Stock", "Low Stock", "Out of Stock"]),
                expiryDate: faker.date.future({ years: 3 }).toISOString(),
                isNew: faker.datatype.boolean({ probability: 0.3 }),
                percentage: faker.datatype.boolean({ probability: 0.3 }) ? faker.number.int({ min: 10, max: 70 }) : 0,
                category: faker.helpers.arrayElement(medicineCategories),
                offers: faker.datatype.boolean({ probability: 0.6 })
                  ? faker.helpers.arrayElement(offerPool)
                  : null
              };
            });

            const totalPrice = items.reduce((sum, it) => sum + it.qty * it.pricePerUnit, 0);
            return {
              status: faker.helpers.arrayElement(Object.values(OrderStatus)),
              items,
              totalPrice
            };
          })
        }
      }
    });
    console.log(`Created Retailer ${user.email} with orders`);
  }

  console.log('✅ Seeding finished');
}

main()
  .catch(e => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
