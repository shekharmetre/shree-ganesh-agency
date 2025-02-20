'use client'
import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';


interface Medication {
    id: number;
    name: string;
    manufacturer: string;
    pricePerUnit: number;
    bulkDiscount: string;
    stock: string;
    expiryDate: string;
    quantity: number;
    category: string;
    offers: {
        type: string;
        description: string;
    };
}

export function MedicationCard({ medication, expandable = true }: { medication: Medication, expandable: boolean }) {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='shadow-md'
        >
            <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <ul className="flex">
                    <li className="w-32 flex-shrink-0">P.Name Lorem ipsum dolor sit amet.</li>
                    <div className="flex flex-1 justify-between">
                        <li>Qty</li>
                        <li>Stock</li>
                        <li>Expiry</li>
                    </div>
                </ul>
            </div>
            {expandable && <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200"
                    >
                        <div className="p-4 bg-gray-50">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Manufacturer Details</h4>
                                    <p className="text-sm text-gray-600">Manufacturer: {medication.manufacturer}</p>
                                    <p className="text-sm text-gray-600">Expiry Date: {medication.expiryDate}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Offers & Discounts</h4>
                                    <p className="text-sm text-gray-600">Bulk Discount: {medication.bulkDiscount}</p>
                                    <p className="text-sm text-gray-600">{medication.offers.type}: {medication.offers.description}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>}

        </motion.div>
    );
}


{/* <div className="flex max-w-5xl gap-2"> */ }
{/* <div>
    <h3 className="font-semibold text-lg text-gray-900">{medication.name}</h3>
    <p className="text-sm text-gray-600">{medication.category}</p>
</div>
<div className="text-center">
    <p className="font-medium text-gray-900">${medication.pricePerUnit}</p>
    <p className="text-sm text-gray-600">Per Unit</p>
</div>
<div className="text-center">
    <p className="font-medium text-green-600">{medication.stock}</p>
    <p className="text-sm text-gray-600">Status</p>
</div>
<div className="text-center">
    <p className="font-medium text-gray-900">{medication.quantity}</p>
    <p className="text-sm text-gray-600">Quantity</p>
</div> */}
{/* dummy one */ }
{/* <div className="text-center">
    <p className="font-medium text-gray-900">${medication.pricePerUnit}</p>
    <p className="text-sm text-gray-600">Per Unit</p>
</div>
<div className="text-center">
    <p className="font-medium text-green-600">{medication.stock}</p>
    <p className="text-sm text-gray-600">Status</p>
</div>
<div className="text-center">
    <p className="font-medium text-gray-900">{medication.quantity}</p>
    <p className="text-sm text-gray-600">Quantity</p>
</div> */}
// </div>
{/* {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />} */ }