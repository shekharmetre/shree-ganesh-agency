'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MedicineRow } from '../medicine-row';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Search } from 'lucide-react';

interface Medicine {
    id: number;
    name: string;
    manufacturer: string;
    pricePerUnit: number;
    stock: string;
    expiryDate: string;
    category: string;
    offers?: {
        type: string;
        description: string;
    } | null;
}

const fetchProducts = async (): Promise<Medicine[]> => {
    try {
        const response = await axios.get<Medicine[]>('/api/products-data');
        localStorage.setItem('lastFetchDate', new Date().toISOString());
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export default function MainProduct() {
    const [visibleItems, setVisibleItems] = useState<number>(20);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const lastFetchDate = localStorage.getItem('lastFetchDate');
    const today = new Date().toDateString();
    const isNewDay = !lastFetchDate || new Date(lastFetchDate).toDateString() !== today;

    const { data = [], isLoading, isError } = useQuery<Medicine[]>({
        queryKey: ['fetchProducts'],
        queryFn: fetchProducts,
        staleTime: isNewDay ? 0 : 1000 * 60 * 60 * 24,
        retry: false,
    });

    const filteredData = useMemo(() => {
        return searchTerm
            ? data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : data;
    }, [searchTerm, data]);

    const LoadMore = () => setVisibleItems((prev) => Math.min(prev + 20, filteredData.length));

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data.</p>;

    return (
        <section id="product-section" className='w-full'>

            {/* searchfuncionalit */}
            <div className='flex mt-5 justify-end'>

                <div className="flex items-center gap-2 w-full max-w-[70vw]">
                    {/* Search Input Container */}
                    <div className="relative flex-grow">
                        <Search className="absolute top-5 left-3 transform -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="border p-2 pl-10 rounded w-full mb-4 placeholder-gray-500 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

            </div>
            <div className="md:hidden text-gray-700 font-semibold uppercase ml-5 text-md mt-5">
                Products List
            </div>
            <div className="overflow-y-auto m-auto max-h-[calc(100vh-4rem)]">
                {filteredData.slice(0, visibleItems).map((medicine, index) => (
                    <motion.div
                        key={medicine.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <MedicineRow medicine={medicine} />
                    </motion.div>
                ))}
                {visibleItems < filteredData.length && (
                    <Button className="bg-blue-400 p-2 px-4 mt-4" onClick={LoadMore}>
                        Load More
                    </Button>
                )}
            </div>
        </section>
    );
}
