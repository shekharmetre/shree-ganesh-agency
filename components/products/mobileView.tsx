"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Package, Tag } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { MedicineItem } from "@/types/schema.types";
import Image from "next/image";

// Types


interface MobileViewProps {
  items: MedicineItem[];
  expandedItems: Record<number, boolean>;
  toggleItem: (id: number) => void;
  isExpiryApproaching: (expiryDate: string) => boolean;
  getStockStatusColor: (status: string) => string;
  getStockStatusIcon: (status: string) => React.ReactNode | null;
}

export function MobileView({
  items,
  expandedItems,
  toggleItem,
  isExpiryApproaching,
  getStockStatusColor,
  getStockStatusIcon
}: MobileViewProps) {
  return (
    <div className="md:hidden space-y-4">
      {items.map((item) => (
        <Card key={item.name} className={cn(expandedItems[item.id] && "border-primary/50")}>
          <CardContent className="p-0">
            <div className="p-4 cursor-pointer" onClick={() => toggleItem(item.id)}>
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {item.isNew && <Badge className="bg-primary text-xs">NEW</Badge>}
                    <h3 className="font-medium">{item.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                >
                  {expandedItems[item.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-medium ml-1">{item.qty}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium ml-1">₹{item.pricePerUnit.toFixed(2)}</span>
                  {item.percentage > 0 && (
                    <Badge variant="outline" className="ml-1 text-xs bg-green-50 text-green-700 border-green-200">
                      {item.percentage}% OFF
                    </Badge>
                  )}
                </div>
                <div>
                  <span className="text-muted-foreground">Expiry:</span>
                  <span className={cn("font-medium ml-1", isExpiryApproaching(item.expiryDate) && "text-amber-600")}>
                    {format(new Date(item.expiryDate), "MMM dd, yyyy")}
                    {isExpiryApproaching(item.expiryDate) && <AlertTriangle className="inline-block h-3 w-3 ml-1" />}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Stock:</span>
                  <span className={cn("font-medium ml-1 flex items-center gap-1", getStockStatusColor(item.stock))}>
                    {getStockStatusIcon(item.stock)}
                    <span>{item.stock}</span>
                  </span>
                </div>
              </div>
            </div>

            {expandedItems[item.id] && (
              <div className="overflow-hidden px-4 pb-4 pt-2 border-t bg-muted/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                    {item.image.includes("/medicines/") ? (
                      <Package className="h-8 w-8 text-gray-400" />
                    ) : (
                      <Image
                        src={item.image || "/placeholder.svg?height=64&width=64"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">ID: {item.id}</p>
                    <p className="text-sm">Manufacturer: {item.manufacturer}</p>
                  </div>
                </div>

                {item.offers && (
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-2 mb-2 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-amber-600" />
                    <div>
                      {/* <p className="text-amber-800 text-xs font-medium">{item.offers.type}</p> */}
                      <p className="text-amber-800 text-xs">{item.offers}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{item.category}</Badge>
                  {item.percentage > 0 && <Badge className="bg-green-600">{item.percentage}% OFF</Badge>}
                  {item.isNew && <Badge className="bg-primary">NEW</Badge>}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
