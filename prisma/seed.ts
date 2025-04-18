import {createClient} from "@supabase/supabase-js"
// import { createClient } from '@/utils/supabase/server';
import { PrismaClient, UserRole } from '@prisma/client';
const prisma = new PrismaClient();



const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// Function to create a new user
async function createUser(email:string, password:string) {
    const { data:{user}, error } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm : true
    });

    if (error) {
        console.error('Error creating user:', error);
        return null;
    }

    console.log('User created:', user);
    return user;
}

// Example usage
// createUser('newuser@example.com', 'securepassword123');


async function main() {
  // Clear existing data
  await prisma.user.deleteMany();
  await prisma.agent.deleteMany();

  // Create agents
  const agents = await Promise.all(
    [1, 2, 3, 4].map(async (i) => {
      return await prisma.agent.create({
        data: {
          agentName: `Agent ${i}`,
          agentEmail: `agent${i}@gmail.com`,
          password: '1111111111',
        },
      });
    })
  );

  // Create users with different roles
  const roles: UserRole[] = ['RETAILER', 'USER', 'AGENT', 'DISTRIBUTOR'];
  
  await Promise.all(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(async (i) => {
      const agent = agents[i % 4];
      const role = roles[i % roles.length];

        const userData = await createUser(`user${i}@gmail.com`,"1111111111")

      if (!userData?.id) {
        console.error(`No user data returned for user ${i}`);
        return;
      }

      console.log(`Created user ${i} with ID:`, userData?.id);
      
      // Create user in Prisma
      return await prisma.user.create({
        data: {
          name: `User ${i}`,
          email: `user${i}@gmail.com`,
          password: '1111111111',
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=User${i}`,
          address: `Address ${i}`,
          phone: `9999999${i.toString().padStart(3, '0')}`,
          isVerified: i % 2 === 0,
          agentId: agent.id,
          authId: userData?.id,
          role: role,
        },
      });
    })
  );

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });