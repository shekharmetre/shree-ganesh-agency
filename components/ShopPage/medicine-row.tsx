'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  Plus, Minus } from 'lucide-react';



interface Medicine {
  id: number;
  name: string;
  manufacturer: string;
  pricePerUnit: number;
  stock: string;
  expiryDate: string;
  category: string;
  offers?: {
      type: string;
      description: string;
  } | null;
}

interface MedicineRowProps {
  medicine: Medicine;
}

export function MedicineRow({ medicine }: MedicineRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(0); // use instead medicine.quantity

  const updateQuantity = (delta: number) => {
    const newQuantity = Math.max(0, quantity + delta);
    setQuantity(newQuantity);
  };

  return (
    <div className="border-b last:border-b-0">
      {/* Desktop View */}
      <div
        className="hidden md:flex p-4 cursor-pointer hover:bg-gray-50 items-center text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-1/4 font-medium">{medicine.name}</div>
        <div className="w-3/4 flex">
          <div className="w-1/5 text-center">{medicine.category}</div>
          <div className="w-1/5 text-center">{medicine.stock}</div>
          <div className="w-1/5 text-center">{medicine.expiryDate}</div>
          <div className="w-1/5 text-center">₹{medicine.pricePerUnit}</div>
          <div className="w-1/5 flex items-center justify-center space-x-2">
            <button
              className="p-1 rounded-full hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity(-1);
              }}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              className="p-1 rounded-full hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity(1);
              }}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div
        className="md:hidden p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{medicine.name}</h3>
            <p className="text-sm text-gray-500">{medicine.category}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">₹ 45.00</p> 
            {/* // use isntaed {medicine.pricePerUnit} */}
            <p className="text-sm text-gray-500">Stock: <strong>In Stock</strong></p> 
            {/*  */}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Expires: {medicine.expiryDate}
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="p-1 rounded-full hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity(-1);
              }}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              className="p-1 rounded-full hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity(1);
              }}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Section - Same for both views */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-50 space-y-2">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Manufacturer:</span> {medicine?.manufacturer}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Bulk Discount:</span> Not any
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Offer Type:</span> {medicine?.offers?.type}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Offer Details:</span> {medicine?.offers?.description}
                  </p>
                </div>
              </div>
              <button 
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={(e) => {
                    e.stopPropagation()
                    // dispatch(addToCart(medicine))
                }}
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


//  onClick={() => {
//         dispatch(
//           addToCart({
//             id: data.id,
//             name: data.title || "",
//             srcUrl: data.srcUrl,
//             price: data.price,
//             attributes: [sizeSelection, colorSelection.name],
//             discount: data.discount,
//             quantity: data.quantity,
//           })
//         );
//       }}