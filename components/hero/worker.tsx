"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const pharmaDistributorWorkers = [
    {
      name: "Ravi Kumar",
      role: "Senior Sales Executive",
      experience: "8 Years in Pharmaceutical Distribution",
      contact: "+91 9876543210",
      location: "Bidar, Karnataka",
      image: "/hero/boy-user.png"
    },
    {
      name: "Ayesha Patel",
      role: "Inventory Manager",
      experience: "5 Years in Pharmaceutical Stock Management",
      contact: "+91 9123456789",
      location: "Andur, Bidar",
      image: "/hero/girl-user.png"
    },
    {
      name: "Sameer Khan",
      role: "Distribution Officer",
      experience: "6 Years in Logistics and Distribution",
      contact: "+91 9654321987",
      location: "Chondi, Bidar",
      image: "/hero/boy-user.png"
    },
    {
      name: "Priya Mehta",
      role: "Procurement Specialist",
      experience: "4 Years in Pharmaceutical Procurement",
      contact: "+91 8901234567",
      location: "Pune, Maharashtra",
      image: "/hero/girl-user.png"
    },
    {
      name: "Anil Singh",
      role: "Warehouse Supervisor",
      experience: "7 Years in Warehouse Operations",
      contact: "+91 9956781234",
      location: "Hyderabad, Telangana",
      image: "/hero/boy-user.png"
    }
];

export function Worker() {
    return (
        <div className="p-5">
            <motion.h1 
                className="md:text-5xl text-2xl text-center my-5 text-[#7961DC] font-extrabold"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                Trusted Professionals for Your Pharma Orders
            </motion.h1>

            {/* Scrollable on small & medium screens, grid layout on large screens */}
            <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-5 overflow-x-auto md:overflow-x-hidden px-4">
                {pharmaDistributorWorkers.map((item, index) => (
                    <motion.div
                        key={index}
                        className="min-w-[200px] flex-shrink-0 md:flex-shrink"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Image 
                            src={item.image} 
                            alt={item.name} 
                            width={200} 
                            height={200} 
                            className="w-full rounded-lg hover:scale-105 hover:shadow-lg cursor-pointer transition-transform duration-150"
                        />
                        <p className="text-center font-medium mt-2">{item.name}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
