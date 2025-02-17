
'use client'
import { motion } from "framer-motion";
import { Search, Truck, CreditCard, RotateCcw, Star, Package, Clock, Shield } from "lucide-react";

export const HeroShop = () => {
  return (
    <div className="bg-[#0A2533]  text-white">
      {/* Background Decorative Elements - Only visible on desktop */}
      <div className="hidden lg:block">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-emerald-500 rounded-full opacity-10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500 rounded-full opacity-10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-12">
        {/* Stats Banner */}
        <motion.div
          className="flex items-center justify-between text-xs lg:text-sm overflow-hidden whitespace-nowrap mb-8 lg:mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="flex items-center gap-2">
            <Package className="hidden lg:block w-4 h-4" />
            10 CR+ Customers
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Clock className="hidden lg:block w-4 h-4" />
            Pan India Delivery
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Shield className="hidden lg:block w-4 h-4" />
            4.5 Rating
          </span>
        </motion.div>

        {/* Main Content Grid */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 lg:space-y-8 mb-12 lg:mb-0">
            <div className="space-y-3">
              <motion.h2
                className="text-lg lg:text-xl text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                HEY THERE,
              </motion.h2>
              <motion.h1
                className="text-4xl lg:text-6xl font-bold text-amber-400 leading-tight mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Get Medicines Fast
              </motion.h1>
              <motion.p
                className="text-2xl lg:text-3xl text-gray-300 leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                with Superfast Delivery in your city
              </motion.p>
            </div>

            {/* Badge */}
            <motion.div
              className="inline-block px-6 py-2 rounded-full bg-[#1A3B4B] text-sm lg:text-base"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              ONLY ON PHARMEASY
            </motion.div>

            {/* Search Bar */}
            <motion.div
              className="relative max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="bg-white rounded-full flex items-center p-2 lg:p-3 shadow-lg">
                <Search className="w-6 h-6 text-gray-400 ml-2" />
                <input
                  type="text"
                  placeholder="Search for Medicine..."
                  className="flex-1 px-3 py-2 bg-transparent text-gray-800 outline-none w-full"
                />
                <button className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-white px-6 py-2 lg:px-8 lg:py-3 rounded-full font-medium">
                  Search
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {[
              {
                title: "Cash on Delivery",
                desc: "On all your orders",
                icon: <CreditCard className="w-8 h-8 lg:w-10 lg:h-10 text-emerald-400" />,
                delay: 0.6,
              },
              {
                title: "Express Delivery",
                desc: "Free* and fast in your city",
                icon: <Truck className="w-8 h-8 lg:w-10 lg:h-10 text-amber-400" />,
                delay: 0.7,
              },
              {
                title: "Easy Returns",
                desc: "No questions asked",
                icon: <RotateCcw className="w-8 h-8 lg:w-10 lg:h-10 text-emerald-400" />,
                delay: 0.8,
              },
              {
                title: "Top Rated",
                desc: "4.5+ rating on Google",
                icon: <Star className="w-8 h-8 lg:w-10 lg:h-10 text-amber-400" />,
                delay: 0.9,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#1A3B4B] p-4 lg:p-6 rounded-2xl hover:bg-[#234557] transition-colors group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="lg:transform lg:group-hover:-translate-y-1 lg:transition-transform">
                  {feature.icon}
                  <h3 className="font-semibold mt-3 mb-1 lg:text-lg">{feature.title}</h3>
                  <p className="text-sm lg:text-base text-gray-400">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


