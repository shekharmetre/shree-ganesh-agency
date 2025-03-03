'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion"
import { MedicineRow } from "../medicine-row";
import ScrollableNav from "./content";

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
}).map((med, index) => ({
    ...med,
    id: index + 1,
    name: [
        "Hydroxyzine 25mg",
        "Metformin 500mg",
        "Atorvastatin 10mg",
        "Lisinopril 20mg",
        "Amlodipine 5mg",
        "Sertraline 50mg",
        "Omeprazole 20mg",
        "Levothyroxine 50mcg",
        "Albuterol Inhaler",
        "Montelukast 10mg",
        "Losartan 50mg",
        "Gabapentin 300mg",
        "Amoxicillin 500mg",
        "Azithromycin 250mg",
        "Prednisone 10mg",
        "Ibuprofen 400mg",
        "Acetaminophen 500mg",
        "Cetirizine 10mg",
        "Fluoxetine 20mg",
        "Pantoprazole 40mg"
    ][index % 20],
    manufacturer: [
        "Lupin", "Sun Pharma", "Cipla", "Dr. Reddy's", "Torrent",
        "Mankind", "Alkem", "Zydus", "Intas", "Glenmark"
    ][index % 10],
    pricePerUnit: Math.floor(Math.random() * 500) + 50,
    stock: Math.random() > 0.2 ? "In Stock" : "Low Stock",
    expiryDate: `202${Math.floor(Math.random() * 3) + 6}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    category: [
        "Anxiety & Sleep", "Diabetes", "Cardiovascular", "Hypertension",
        "Pain Relief", "Antibiotics", "Respiratory", "Gastrointestinal",
        "Thyroid", "Allergy"
    ][index % 10],
    offers: Math.random() > 0.5 ? {
        type: ["Free Strips", "Discount", "Combo Offer", "Loyalty Points"][Math.floor(Math.random() * 4)],
        description: [
            "Buy 10 strips, get 1 free.",
            "10% off on orders above ₹1000",
            "Buy with Vitamin D3 for 15% off",
            "Earn 2x points on purchase"
        ][Math.floor(Math.random() * 4)]
    } : null
}));

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
        queryKey: ['fetchProducts'],
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

    function selectedScrollNav(value:string){
        console
    }


    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Header - Responsive */}
            <div className="sticky top-0  bg-white  p-3 border-b">
            <ScrollableNav selectedItem={selectedScrollNav} />
                <div className="grid place-content-end mt-2">
                    <div className="relative  w-[90%] md:max-w-md">
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

            </div>
            <div>
                <div className="md:hidden text-gray-700 font-semibold uppercase ml-5 text-md mt-5">
                    Products List
                </div>
                {/* Scrollable Content with Animation */}
                <div className="overflow-y-auto m-auto max-h-[calc(100vh-4rem)]">
                    {filteredData.slice(0, visibleItems).map((medicine: any, index: number) => (
                        <motion.div
                            key={medicine.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }} // Delay each item slightly
                        >
                            <MedicineRow medicine={medicine} />
                        </motion.div>
                    ))}

                    <Button className="bg-blue-400 p-2 px-4" onClick={LoadMore}>
                        Load More
                    </Button>
                </div>
            </div>
        </div>
    );
}