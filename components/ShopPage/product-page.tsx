'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MedicineRow } from "./medicine-row";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "primereact/button";
import { Search } from "lucide-react";


const medications = Array(20).fill({
    id: 80,
    name: "Hydroxyzine 25mg",
    manufacturer: "Lupin",
    pricePerUnit: 9.5,
    bulkDiscount: "6% off on 80+ units",
    stock: "In Stock",
    expiryDate: "2027-03-15",
    quantity: 1,
    category: "Anxiety & Sleep",
    offers: {
        type: "Free Strips",
        description: "Buy 10 strips, get 1 free.",
    },
}).map((med, index) => ({ ...med, id: index + 1 }));

export const fetchProducts = async () => {
    try {
        const response = await axios.get("/api/products-data")
        localStorage.setItem("lastFetchDate", new Date().toISOString());
        return medications;  // Make sure to return the response
    } catch (error) {
        throw error;
    }
};

export const ProductPage = () => {
    const lastFetchDate = localStorage.getItem("lastFetchDate");
    const today = new Date().toDateString();
    const isNewDay = !lastFetchDate || new Date(lastFetchDate).toDateString() !== today;
    const { isLoading, isError, data, refetch, } = useQuery({
        queryKey: ['fetchProducts'],  // Add inputValue to the query key to trigger refetch when it changes
        queryFn: () => fetchProducts(),
        staleTime: isNewDay ? 0 : 1000 * 60 * 60 * 24,
        retry: false,
    });

    const [visibleItems, setVisibleItems] = useState(50); // Show first 20 items
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<any[]>([]);



    useEffect(() => {
        if (data) {
            const filtered = searchTerm
                ? data.filter((item: any) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                ).slice(0, visibleItems)
                : data.slice(0, visibleItems);
            setFilteredData(filtered);
        }
    }, [searchTerm, visibleItems, data]);


    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data.</p>;


    const LoadMore = () => {
        if (data) {
            setVisibleItems((prev) => Math.min(prev + 20, data.length));
        }

    };


    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Header - Responsive */}
            <div className="sticky top-0 bg-white shadow-md z-10 p-3 border-b">
                <div className="hidden md:flex text-gray-700 font-semibold uppercase text-xs">
                    <div className="w-1/4">Product Name</div>
                    <div className="w-3/4 flex">
                        <div className="w-1/5 text-center">Category</div>
                        <div className="w-1/5 text-center">Stock</div>
                        <div className="w-1/5 text-center">Expiry</div>
                        <div className="w-1/5 text-center">Price</div>
                        <div className="w-1/5 text-center">Quantity</div>
                    </div>
                </div>
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search product..."
                        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="md:hidden text-gray-700 font-semibold uppercase text-md mt-5">
                    Products List
                </div>
            </div>

            {/* Scrollable Content */}

            <div className="overflow-y-auto m-auto max-h-[calc(100vh-4rem)]">
                {filteredData.slice(0, visibleItems).map((medicine: any, index: number) => {
                    // const isLastItem = index === filteredData.length - 1;
                    return (
                        <div key={medicine.id}>
                            <MedicineRow medicine={medicine} />
                        </div>
                    )
                })}

                <Button className="bg-blue-400 p-2 px-4" onClick={LoadMore}>Load More</Button>
            </div>
        </div>
    );
}