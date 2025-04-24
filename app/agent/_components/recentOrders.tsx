'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion"; // Import Framer Motion
import { AgentWithLatestRetailerOrdersType } from "@/types/schema.types";
import { StatusBadge } from "@/components/ui/statusBadge";
import { useState } from "react";
import { MedicineInventory } from "@/components/products/medicines";

export function RecentOrders({ initialData }: { initialData: AgentWithLatestRetailerOrdersType | null }) {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [instialData, setInitialData] = useState(initialData)

    const toggleRow = (id: number) => {
        setExpandedRow(prev => (prev === id ? null : id));
    };
    // Animation variants for the table rows
    if (!initialData) {
        return <div>Loading....</div>
    }

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05, // Staggered animation
                duration: 0.5,
                ease: "easeOut",
            },
        }),
    };

    function onQtyChange(item, value) {
        setInitialData((prev) => ({
            ...prev,
            retailers: prev?.retailers.map((r) =>
                r.id === item.id ? { ...r, qty: value } : r
            ),
        }));
    }


    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle>Recent Orders</CardTitle>
                    <Button variant="outline" size="sm">
                        View All
                    </Button>
                </div>
                <CardDescription>Latest orders placed by retailers</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">ID</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Retailer</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Date</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {instialData && instialData.retailers
                                .filter(retailer => retailer.orders.length > 0) // only show retailers who have orders
                                .map((retailer, index) => {
                                    const latestOrder = retailer.orders[0]; // assuming ordered by createdAt desc
                                    const isExpanded = expandedRow === latestOrder.id;
                                    return (
                                        <>
                                            <motion.tr
                                                key={retailer.id}
                                                className="border-b border-gray-200 dark:border-gray-700"
                                                variants={rowVariants}
                                                initial="hidden"
                                                animate="visible"
                                                custom={index}
                                                onClick={() => toggleRow(latestOrder.id)}
                                            >
                                                <td className="py-3 px-4">#{latestOrder.id}</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center">
                                                        <Avatar className="h-6 w-6 mr-2">
                                                            <AvatarImage src={retailer.avatar || "/placeholder.svg"} alt="Avatar" />
                                                            <AvatarFallback>{retailer.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <span>{retailer.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    {new Date(latestOrder.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">{latestOrder.totalPrice}</td>
                                                <td className="py-3 px-4">
                                                    <StatusBadge status={latestOrder.status.toLowerCase()} />

                                                </td>
                                                <td className="py-3 px-4">
                                                    <Button variant="secondary" size="sm">
                                                        View
                                                    </Button>
                                                </td>
                                            </motion.tr>
                                            {
                                                isExpanded && (
                                                    <motion.tr
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <td colSpan={6} className="px-4 py-3 bg-gray-50 dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300">
                                                            {/* Extra content here */}
                                                            <MedicineInventory onQtyChange={onQtyChange} items={latestOrder.items} />
                                                        </td>
                                                    </motion.tr>
                                                )
                                            }

                                        </>
                                    );
                                })}
                        </tbody>


                    </table>
                </div>
            </CardContent>
        </Card >
    );
}