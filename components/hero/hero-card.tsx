"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Pill, Truck, Clock, ShieldCheck, Building2, PackageCheck } from "lucide-react"
import { supbase } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const location = useRouter()

  const handleClick = async () => {
    try {
      const { data, error } = await supbase.auth.getSession();

      if (error || !data.session) {
        return location.replace("/login");
      }

      const accessToken = data.session.access_token;

      // Redirect using access token
      location.replace(`/${accessToken}`);
    } catch (err) {
      console.error("Error getting session:", err);
      // Optionally redirect or show a toast
    }
  };




  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating medical icons */}
      <div className="absolute inset-0">
        {[Pill, PackageCheck, ShieldCheck].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.2,
              scale: 1,
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 0.5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Icon className="w-8 h-8 text-blue-500/20" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-6 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 text-sm font-medium mb-6">
                Trusted by 1000+ Pharmacies
              </span>
            </motion.div>

            <motion.h1
              className="text-3xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Your Reliable
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                {" "}
                Partner{" "}
              </span>
              in Medicine Distributin
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Streamline your pharmacy's supply chain with our comprehensive distribution network. Get access to a wide
              range of medicines with competitive pricing and rapid delivery.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                onClick={handleClick}
                className="inline-flex items-center justify-center py-6 md:text-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-600 rounded-md hover:from-blue-700 hover:to-teal-700 transition"
              >
                Start Ordering
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                // onClick={handleClick} // Replace "#" with the actual URL
                className="inline-flex items-center justify-center  py-6 text-lg font-medium border border-blue-200 rounded-md hover:bg-blue-50 transition"
              >
                View Catalog
              </Button>
            </motion.div>


            <motion.div
              className="mt-12 flex items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center gap-8">
                <div className="text-sm text-gray-600">
                  <span className="block text-2xl font-bold text-gray-900">24/7</span>
                  Support Available
                </div>
                <div className="text-sm text-gray-600">
                  <span className="block text-2xl font-bold text-gray-900">1000+</span>
                  Products
                </div>
                <div className="text-sm text-gray-600">
                  <span className="block text-2xl font-bold text-gray-900">48h</span>
                  Fast Delivery
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product showcase */}
          <div className="relative">
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="relative rounded-2xl overflow-hidden bg-white border border-blue-100 shadow-2xl">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                <div className="p-6">
                  <div className="space-y-6">
                    {/* Product Categories */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Pill, title: "Prescription Drugs", count: "500+" },
                        { icon: PackageCheck, title: "OTC Medicines", count: "300+" },
                        { icon: Building2, title: "Healthcare Products", count: "200+" },
                        { icon: ShieldCheck, title: "Medical Supplies", count: "100+" },
                      ].map((item, i) => (
                        <motion.div
                          key={item?.title}
                          className="p-4 rounded-xl bg-blue-50/50 border border-blue-100"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                        >
                          <item.icon className="w-6 h-6 text-blue-600 mb-2" />
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          <div className="text-sm text-blue-600">{item.count}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating info cards */}
            <motion.div
              className="absolute -right-8 top-20 bg-white rounded-lg p-4 shadow-xl border border-blue-100"
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: 1,
                x: 0,
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                delay: 1,
                y: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <div className="text-sm font-medium">Fast Delivery Available</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -left-8 bottom-20 bg-white rounded-lg p-4 shadow-xl border border-blue-100"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                delay: 1.2,
                y: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <div className="text-sm font-medium">24/7 Order Processing</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

