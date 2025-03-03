'use client'
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react"; // Search icon
import { Button } from "@/components/ui/button"; // Ensure correct button import
import { MedicineRow } from "../medicine-row";

const ProductList = ({ data }: { data: any[] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleItems, setVisibleItems] = useState(10); // Default visible items

    // Filtered Data using search input
    const filteredData = useMemo(() => {
        return data.filter((medicine) =>
            medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, data]);

    // Load More Items
    const LoadMore = () => {
        setVisibleItems((prev) => prev + 10); // Increase visible items by 10
    };

    if(!data){
        return <div>Data Not found</div>
    }

    console.log(data)

    return (
        <div>
            {/* Search Input */}
            <div className="grid place-content-end mt-2">
                <div className="relative w-[90%] md:max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search product..."
                        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Desktop Table Headers */}
            <ul className="hidden mt-10 md:flex text-gray-700 font-semibold uppercase text-xs">
                <li className="w-1/4">Product Name</li>
                <li className="w-3/4 flex">
                    <ul className="w-1/5 text-center">Category</ul>
                    <ul className="w-1/5 text-center">Stock</ul>
                    <ul className="w-1/5 text-center">Expiry</ul>
                    <ul className="w-1/5 text-center">Price</ul>
                    <ul className="w-1/5 text-center">Quantity</ul>
                </li>
            </ul>

            {/* Mobile View Title */}
            <div className="md:hidden text-gray-700 font-semibold uppercase ml-5 text-md mt-5">
                Products List
            </div>

            {/* Scrollable Content with Animation */}
            <div className="overflow-y-auto m-auto max-h-[calc(100vh-4rem)]">
                {filteredData.length > 0 ? (
                    filteredData.slice(0, visibleItems).map((medicine, index) => (
                        <motion.div
                            key={medicine.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }} // Delay each item slightly
                        >
                            <MedicineRow medicine={medicine} />
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-4">No products found.</p>
                )}

                {visibleItems < filteredData.length && (
                    <Button className="bg-blue-400 p-2 px-4 mt-4" onClick={LoadMore}>
                        Load More
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ProductList;
