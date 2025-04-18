'use client'
import { Stethoscope, Syringe, BriefcaseMedical, Pill, HeartPulse, Bandage, FlaskConical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

// Define the type for a category item
type Category = {
  name: string;
  icon: React.ElementType;
};

// Sample categories data
const categories: Category[] = [
  { name: "General Medicine", icon: Syringe },
  { name: "Medical Equipment", icon: Stethoscope },
  { name: "OTC Products", icon: BriefcaseMedical },
  { name: "Prescription Drugs", icon: Pill },
  { name: "Vitamins & Supplements", icon: Syringe },
  { name: "Healthcare & Wellness", icon: HeartPulse },
  { name: "First Aid & Bandages", icon: Bandage },
  { name: "Diagnostic Tools", icon: FlaskConical },
];

export function ProductCategories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          className="text-4xl font-bold text-gray-900 mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Product Categories
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="cursor-pointer"
            >
              <Card className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-transform hover:scale-105">
                <CardContent className="p-8 flex flex-col items-center">
                  <category.icon className="w-14 h-14 text-blue-600 mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
