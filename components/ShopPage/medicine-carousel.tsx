import { Plus } from "lucide-react";

const medicineData = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        price: 120,
        stock: 250,
        image:
            "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2,
        name: "Azithromycin 250mg",
        price: 350,
        stock: 120,
        image:
            "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3,
        name: "Vitamin D3 60K",
        price: 220,
        stock: 180,
        image:
            "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 4,
        name: "Omeprazole 20mg",
        price: 180,
        stock: 200,
        image:
            "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 1,
        name: "Paracetamol 500mg",
        price: 120,
        stock: 250,
        image:
            "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2,
        name: "Azithromycin 250mg",
        price: 350,
        stock: 120,
        image:
            "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3,
        name: "Vitamin D3 60K",
        price: 220,
        stock: 180,
        image:
            "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 4,
        name: "Omeprazole 20mg",
        price: 180,
        stock: 200,
        image:
            "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
];

export default function MedicineCarousel() {
    return (
        <div className="overflow-x-auto max-w-7xl mx-auto whitespace-nowrap py-4">
            <h1 className="text-3xl font-semibold font-serif mb-5">New Brands</h1>
            <div className="flex space-x-4 px-4">
                {medicineData.map((medicine) => (
                    <div
                        key={medicine.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow min-w-[250px]"
                    >
                        <img
                            src={medicine.image}
                            alt={medicine.name}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800">{medicine.name}</h3>
                            <div className="flex justify-between items-center mt-2">
                                <div>
                                    <p className="text-indigo-600 font-bold">₹{medicine.price}</p>
                                    <p className="text-sm text-gray-500">Stock: {medicine.stock}</p>
                                </div>
                                <button className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200">
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
