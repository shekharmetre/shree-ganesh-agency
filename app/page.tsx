import Image from "next/image";

import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import AboutUsSection from "@/components/hero/aboutUs";
import { Offers } from "@/components/offers";
import { ProductWrapper } from "@/components/helper/product-wrapper";
import { Product } from "@/components/hero/card2";
import { Worker } from "@/components/hero/worker";
import { Footer } from "@/components/hero/footer";

interface Product {
  name: string;
  offer: number;
  image: string;
  rating: number;
  ratedPeople: number;
  price: number;
  category: string;
}


const pharmaData: Product[] = [
  {
    name: "Cetirizine 10mg",
    offer: 18,
    image: "/hero/cetirizine.png",
    rating: 4.7,
    ratedPeople: 1100,
    price: 90,
    category: "Antihistamine",
  },
  {
    name: "Metformin 500mg",
    offer: 12,
    image: "/hero/metformin.png",
    rating: 4.5,
    ratedPeople: 200,
    price: 150,
    category: "Diabetes Medication",
  },
  {
    name: "Atorvastatin 20mg",
    offer: 8,
    image: "/hero/atorvastatin.png",
    rating: 4.4,
    ratedPeople: 650,
    price: 200,
    category: "Cholesterol Medication",
  },
  {
    name: "Cetirizine 10mg",
    offer: 18,
    image: "/hero/cetirizine.png",
    rating: 4.7,
    ratedPeople: 1100,
    price: 90,
    category: "Antihistamine",
  },
  {
    name: "Metformin 500mg",
    offer: 12,
    image: "/hero/metformin.png",
    rating: 4.5,
    ratedPeople: 200,
    price: 150,
    category: "Diabetes Medication",
  },
  {
    name: "Salbutamol Inhaler",
    offer: 30,
    image: "/hero/salbutamol.png",
    rating: 4.6,
    ratedPeople: 1400,
    price: 300,
    category: "Asthma Medication",
  },
  {
    name: "Cetirizine 10mg",
    offer: 18,
    image: "/hero/cetirizine.png",
    rating: 4.7,
    ratedPeople: 1100,
    price: 90,
    category: "Antihistamine",
  },
  {
    name: "Shelcal 500 mg - Calcium Supplement",
    offer: 6,
    image: "/hero/shelcal.png",
    rating: 4.1,
    ratedPeople: 220,
    price: 135,
    category: "Vitamins & Supplements"
  },
  {
    name: "Karela Jamun Juice - Blood Sugar Support",
    offer: 6,
    image: "/hero/oil.png",
    rating: 4.1,
    ratedPeople: 220,
    price: 135,
    category: "Ayurvedic & Herbal"
  },
  {
    name: "Abzorb Dusting Powder - Antifungal Skin Care",
    offer: 6,
    image: "/hero/skincare-powder.png",
    rating: 4.1,
    ratedPeople: 220,
    price: 135,
    category: "Skin Care"
  }
];




export default function Home() {

  return (
    <div className="mb-20">
      {/* hero section */}
      <div className="relative">
        <Image src="/hero/hero.png" alt="hero" width={1000} height={1000} className="w-full md:h-[40vh] h-[25vh] object-fill md:object-cover opacity-80" />
        <div className="absolute top-10 md:top-20 left-5 lg:left-32">
          <h1 className="text-[#CEEB2B] capitalize md:text-5xl text-xl font-bold">
            <TextAnimate animation="blurInUp" by="character">
              Get Medicines Fast
            </TextAnimate>
          </h1>

          <p className="w-[80%]  md:mt-5 md:text-5xl font-medium">With Suparfast Deliver & Order in your city</p>
          <Button variant="destructive" className="md:mt-10 mt-2 md:p-10 md:text-5xl">
            Start Now
          </Button>
        </div>
      </div>
      {/* about us section */}
      <div className="">
        <Offers />
        <ProductWrapper className="p-2 bg-blue-500" title={"Trending Near You"} subTitle={"Popular in Your City"} scrollable={true} header="All Time Best Deal">
          {pharmaData && pharmaData.map((item, index) => <Product category={item.category} id={index} key={index} scrollable={true} itemName={item.name} discount={item.offer} price={item.price} image={item.image} />)}
        </ProductWrapper>
       productPage

            {/* about section */}

        <AboutUsSection />

        {/* worker section */}
        <Worker />

        {/* footer */}
        <Footer />

      </div>
    </div>
  )
} 