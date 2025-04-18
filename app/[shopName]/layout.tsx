import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import React from "react";

export default function ShopPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="md:flex md:gap-4">
            <Sidebar />
            <main>
            <Navbar />
                {children}
            </main>
        </div>
    )
}