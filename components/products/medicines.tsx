"use client";

import React, { useState } from "react";
// import { DesktopView } from "./DesktopView";
import { useIsMobile } from "../helper/mobile-check";

// Types
import { AlertTriangle, CheckCircle } from "lucide-react";
import { DesktopView } from "./desktop-mobile";
import { MobileView } from "./mobileView";
import { MedicineItem } from "@/types/schema.types";

interface MedicineInventoryProps {
    items: MedicineItem[];
}

export function MedicineInventory({ items }: MedicineInventoryProps) {
    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
    const isMobile = useIsMobile();

    const toggleItem = (id: number) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const isExpiryApproaching = (expiryDate: string) => {
        const expiry = new Date(expiryDate);
        const threeMonthsFromNow = new Date();
        threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
        return expiry <= threeMonthsFromNow;
    };

    const getStockStatusColor = (status: string) => {
        switch (status) {
            case "In Stock":
                return "text-green-600";
            case "Low Stock":
                return "text-amber-600";
            case "Out of Stock":
                return "text-red-600";
            default:
                return "text-gray-600";
        }
    };

    const getStockStatusIcon = (status: string) => {
        switch (status) {
            case "In Stock":
                return <CheckCircle className="h-4 w-4" />;
            case "Low Stock":
                return <AlertTriangle className="h-4 w-4" />;
            case "Out of Stock":
                return <AlertTriangle className="h-4 w-4" />;
            default:
                return null;
        }
    };
    const itemsArray = Array.isArray(items) ? items : [items];

    return (
        <div>
            {isMobile ? (
                <MobileView
                    items={itemsArray}
                    expandedItems={expandedItems}
                    toggleItem={toggleItem}
                    isExpiryApproaching={isExpiryApproaching}
                    getStockStatusColor={getStockStatusColor}
                    getStockStatusIcon={getStockStatusIcon}
                />
            ) : (
                <DesktopView
                    items={itemsArray}
                    expandedItems={expandedItems}
                    toggleItem={toggleItem}
                    isExpiryApproaching={isExpiryApproaching}
                    getStockStatusColor={getStockStatusColor}
                    getStockStatusIcon={getStockStatusIcon}
                   
                />
            )}
        </div>
    );
}
