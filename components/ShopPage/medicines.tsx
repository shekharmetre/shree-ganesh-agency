'use client'
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function Medicines({ item }: { item: any }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b bg-white">
            {/* Medicine Row (Scrollable) */}
            <div
                className="flex p-2 cursor-pointer hover:bg-gray-50 items-center text-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className="w-24 flex-shrink-0 font-semibold">{item.name}</p>
                <div className="flex-1 overflow-x-auto flex gap-3 text-center">
                    <p className="min-w-[80px]">{item.category}</p>
                    <p className="min-w-[80px]">{item.stock}</p>
                    <p className="min-w-[80px]">{item.expiryDate}</p>
                    <p className="min-w-[60px]">${item.pricePerUnit}</p>
                    {/* Quantity Selector */}
                    <div className="min-w-[80px] flex items-center justify-center gap-1">
                        <button className="bg-gray-300 px-1 py-0.5 rounded">-</button>
                        <p>{item.quantity}</p>
                        <button className="bg-gray-300 px-1 py-0.5 rounded">+</button>
                    </div>
                </div>
            </div>

            {/* Collapsible Offers & Add to Cart */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-2 bg-gray-50 text-md"
                    >
                        <p><strong>Bulk Discount:</strong> {item.bulkDiscount}</p>
                        <p><strong>Offers:</strong> {item.offers.type} - {item.offers.description}</p>
                        
                        {/* Add to Cart Button */}
                        <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md w-full text-[10px]">
                            Add to Cart
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}