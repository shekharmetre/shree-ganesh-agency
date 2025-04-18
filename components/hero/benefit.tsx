"use client";
import React from "react";
import { NumberTicker } from "../ui/number-ticker";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, PillIcon, Truck } from "lucide-react";

// Benefits Data
const benefits = [
  {
    title: "Fast & Reliable Delivery",
    description: "We ensure 24-48 hour delivery across major cities.",
    icon: Truck,
  },
  {
    title: "Best Wholesale Prices",
    description: "Get the most competitive rates for bulk orders.",
    icon: DollarSign,
  },
  {
    title: "Wide Range of Medicines",
    description: "We offer a vast catalog of pharmaceutical products.",
    icon: PillIcon,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export function AboutUsSection() {
  return (
    <section className="md:py-20 relative xl:mr-0 lg:mr-5 mr-0">
      <div className="w-full px-4 md:px-5 lg:px-5 mx-auto">
        <motion.div 
          className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <motion.div className="w-full flex-col justify-center items-start gap-8 flex">
              <motion.h1 className="text-indigo-700 text-2xl font-bold leading-normal lg:text-start text-center" variants={fadeInUp}>
                Transform the Way You Order Medicines with Shri Ganesh Agency Web App
              </motion.h1>
              <motion.p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center" variants={fadeInUp}>
                Our innovative app helps medical stores easily order medicines, access real-time offers, and maintain strong relationships with the agency.
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div className="w-full lg:justify-start justify-center items-start flex" variants={fadeInUp}>
            <div className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
              <Image className="sm:mt-5 sm:ml-5 w-full md:h-full h-[40vh] rounded-3xl object-cover" src="/hero/production.png" width={564} height={646} alt="About Us image" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function Benefits() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card>
                <CardContent className="p-6 text-center">
                  <benefit.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}