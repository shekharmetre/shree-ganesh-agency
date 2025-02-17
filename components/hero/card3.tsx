import { motion } from 'framer-motion';
import { Package, Shield, Gift, Pill, Timer, Star, Plus, ArrowRight } from 'lucide-react';
import React from 'react';

const ProductCard = ({ 
  layout, 
  title, 
  image, 
  price, 
  mrp, 
  offer, 
  composition, 
  packSize, 
  freebie 
}: {
  layout: number;
  title: string;
  image: string;
  price: number;
  mrp: number;
  offer: string;
  composition: string;
  packSize: string;
  freebie?: string;
}) => {
  const layouts = {
    1: "bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200",
    2: "bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200",
    3: "bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200",
    4: "bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200",
    5: "bg-gradient-to-r from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200"
  };

  return (
    <motion.div
      className={`relative w-80 rounded-2xl overflow-hidden shadow-lg`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {offer && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {offer}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start gap-4">
          <motion.img
            src={image}
            alt={title}
            className="w-24 h-24 object-contain rounded-lg bg-white p-2"
            whileHover={{ scale: 1.05 }}
          />
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-1">{title}</h3>
            <p className="text-sm text-gray-600 mb-2">{composition}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Package className="w-4 h-4" />
              <span>{packSize}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-2xl font-bold text-gray-800">₹{price}</p>
              <p className="text-sm text-gray-500 line-through">MRP: ₹{mrp}</p>
            </div>
            {freebie && (
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Gift className="w-4 h-4" />
                {freebie}
              </div>
            )}
          </div>

          {/* <motion.button
            className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 font-medium"
            whileHover={{ gap: '12px' }}
            whileTap={{ scale: 0.98 }}
          >
            Add to Cart
            <Plus className="w-4 h-4" />
          </motion.button> */}
        </div>
      </div>
    </motion.div>
  );
};

const ProductCards = () => {
  const products = [
    {
      layout: 1,
      title: "Dolo 650mg",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300",
      price: 32.85,
      mrp: 38.65,
      offer: "15% OFF",
      composition: "Paracetamol 650mg",
      packSize: "15 Tablets",
      freebie: "2 Strips Free"
    },
    {
      layout: 2,
      title: "Crocin Advance",
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=300",
      price: 48.50,
      mrp: 55.00,
      offer: "Buy 2 Get 1",
      composition: "Paracetamol 500mg",
      packSize: "100 Tablets",
      freebie: "10 Tablets Free"
    },
    {
      layout: 3,
      title: "Azithral 500",
      image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=300",
      price: 145.30,
      mrp: 170.95,
      offer: "20% OFF",
      composition: "Azithromycin 500mg",
      packSize: "5 Tablets",
    },
    {
      layout: 4,
      title: "Allegra 120mg",
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=300",
      price: 98.75,
      mrp: 115.00,
      offer: "Save ₹16.25",
      composition: "Fexofenadine 120mg",
      packSize: "10 Tablets",
      freebie: "1 Strip Free"
    },
    {
      layout: 5,
      title: "Pan 40",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=300",
      price: 120.50,
      mrp: 150.00,
      offer: "Limited Time",
      composition: "Pantoprazole 40mg",
      packSize: "30 Tablets",
      freebie: "5 Tablets Free"
    }
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center items-start p-8">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductCards;