
import AboutUsSection from "@/components/hero/aboutUs";
import { Worker } from "@/components/hero/worker";
import { Footer } from "@/components/hero/footer";
import HeroSection from "@/components/hero/hero-card";
import { Benefits } from "@/components/hero/benefit";
import { ProductCategories } from "@/components/hero/category";
import ProductShowcases from "@/components/hero/product";
import AutoScrollingTestimonials from "@/components/hero/testimonial";
import HowItWorks from "@/components/hero/how-works";
import MedicineCarousel from "@/components/ShopPage/medicine-carousel";
import { headers } from 'next/headers';
import { prisma } from "@/utils/prisma";

export default async function Home() {
  const headersList = headers();
  const role = (await headersList).get("x-user-role")
  console.log("User role from header:", role);
  console.log("noign")


  return (
    <>
      <HeroSection />
      <Benefits />
      <ProductCategories />
      <ProductShowcases />
      <MedicineCarousel />
      <AboutUsSection />
      <HowItWorks />
      <AutoScrollingTestimonials />
      <Worker />
      <Footer />
    </>
  )
} 