"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Package, Tag, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { MedicineItem } from "@/types/schema.types";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion"
import Image from "next/image";

// Types


interface DesktopViewProps {
    items: MedicineItem[];
    expandedItems: Record<number, boolean>;
    toggleItem: (id: number) => void;
    isExpiryApproaching: (expiryDate: string) => boolean;
    getStockStatusColor: (status: string) => string;
    getStockStatusIcon: (status: string) => React.ReactNode | null;
}

export function DesktopView({
    items,
    expandedItems,
    toggleItem,
    isExpiryApproaching,
    getStockStatusColor,
    getStockStatusIcon,
}: DesktopViewProps) {
    return (
        <div className="hidden md:block overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Medicine Name</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price per Unit</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.length > 0 &&
                        items.map((item) => (
                            <React.Fragment key={item.id}>
                                <TableRow
                                    className={cn("cursor-pointer hover:bg-muted/50", expandedItems[item.id] && "bg-muted/50")}
                                    onClick={() => toggleItem(item.id)}
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            {item.isNew && <Badge className="bg-primary text-xs">NEW</Badge>}
                                            {item.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">{item.qty}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {item.percentage > 0 && (
                                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                                    {item.percentage}% OFF
                                                </Badge>
                                            )}
                                            ₹{item.pricePerUnit.toFixed(2)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div
                                            className={cn(
                                                "flex items-center gap-1",
                                                isExpiryApproaching(item.expiryDate) && "text-amber-600",
                                            )}
                                        >
                                            {isExpiryApproaching(item.expiryDate) && <AlertTriangle className="h-4 w-4" />}
                                            {format(new Date(item.expiryDate), "MMM dd, yyyy")}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cn("flex items-center gap-1", getStockStatusColor(item.stock))}>
                                            {getStockStatusIcon(item.stock)}
                                            <span>{item.stock}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleItem(item.id);
                                            }}
                                        >
                                            {expandedItems[item.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <AnimatePresence>
                                    {expandedItems[item.id] && (
                                        <motion.tr
                                            key={item.id}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-muted/30"
                                        >
                                            <td colSpan={6} className="p-0">
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.1 }}
                                                >
                                                    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                                                                {item.image.includes("/medicines/") ? (
                                                                    <Package className="h-10 w-10 text-gray-400" />
                                                                ) : (
                                                                    <Image
                                                                        src={item.image || "/placeholder.svg?height=80&width=80"}
                                                                        alt={item.name}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-medium">{item.name}</h4>
                                                                <p className="text-sm text-muted-foreground">ID: {item.id}</p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-medium">Manufacturer:</span>
                                                                <span className="text-sm">{item.manufacturer}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-medium">Category:</span>
                                                                <Badge variant="outline">{item.category}</Badge>
                                                            </div>
                                                            {item.percentage > 0 && (
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-sm font-medium">Discount:</span>
                                                                    <Badge className="bg-green-600">{item.percentage}% OFF</Badge>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div>
                                                            {item.offers && (
                                                                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-center gap-2">
                                                                    <Tag className="h-5 w-5 text-amber-600" />
                                                                    <div>
                                                                        <p className="text-amber-800 text-sm font-medium">{item.offers}</p>
                                                                     
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </td>
                                        </motion.tr>
                                    )}
                                </AnimatePresence>
                            </React.Fragment>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}
