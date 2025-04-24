"use client";
import React from "react";
import { NumberTicker } from "../ui/number-ticker";
import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }, // Staggered effect
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const AboutUsSection: React.FC = () => {
  return (
    <div className="w-full px-4 max-w-7xl mx-auto">
      <motion.div
        className="w-full flex flex-col lg:flex-row items-center justify-center xl:gap-12 gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Left Section */}
        <motion.div className="w-full flex flex-col justify-center items-center lg:items-start gap-10">
          <motion.div className="w-full flex flex-col justify-center items-center lg:items-start gap-8">
            <motion.div className="flex flex-col items-center lg:items-start gap-4 mt-5" variants={fadeInUp}>
              <h6 className="text-gray-400 text-center text-base font-normal leading-relaxed">About Us</h6>
              <motion.h1 className="text-indigo-700 text-2xl font-bold font-manrope leading-normal text-center lg:text-left" variants={fadeInUp}>
                Transform the Way You Order Medicines with Shri Ganesh Agency Web App
              </motion.h1>
              <motion.p className="text-gray-500 text-base font-normal leading-relaxed text-center lg:text-left" variants={fadeInUp}>
                Our innovative app helps medical stores easily order medicines, access real-time offers, and maintain strong relationships with the agency.
              </motion.p>
            </motion.div>

            {/* Statistics Cards */}
            <motion.div className="w-full flex flex-col justify-center items-center lg:items-start gap-6">
              <div className="w-full grid md:grid-cols-2 gap-8">
                {[
                  { value: 33, label: "Years Of Trust", desc: "Building strong relationships with medical stores" },
                  { value: 100, label: "Pharmacies Served", desc: "Helping pharmacies streamline their medicine procurement efficiently." },
                  { value: 98, label: "% Client Satisfaction", desc: "Trusted by medical professionals for reliability and service excellence." },
                  { value: "Over a Million", label: "Orders Fulfilled", desc: "Ensuring seamless and timely delivery of medicines to medical stores." },
                ].map((stat, index) => (
                  <motion.div
                    key={stat?.value}
                    className="w-full p-4 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex flex-col items-center lg:items-start"
                    variants={fadeInUp}
                  >
                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9 text-center lg:text-left">
                      {typeof stat.value === "number" ? (
                        <NumberTicker value={stat.value} />
                      ) : (
                        stat.value || "Over a Million"
                      )}{" "}
                      {stat.label}
                    </h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed text-center lg:text-left">{stat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Read More Button */}
          <motion.button
            className="sm:w-fit w-full px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-md transition-all duration-700 ease-in-out flex items-center justify-center"
            variants={fadeInUp}
          >
            <span className="px-1.5 text-indigo-600 text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
              Read More
            </span>
            <svg className="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996" stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Right Section - Image with Centering Fix */}
        <motion.div className="w-full flex justify-center items-center" variants={fadeInUp}>
          <div className="relative sm:w-[564px] w-full sm:h-[646px] h-full bg-gray-100 rounded-3xl border border-gray-200">
            <Image
              className="w-full md:h-full h-[40vh] rounded-3xl object-cover"
              src="/hero/production.png"
              width={564}
              height={646}
              alt="About Us image"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUsSection;
