import { calculateDiscountedPrice } from "@/lib/utils";
import Image from "next/image";
// import AddToCartBtn from "../Tabs/AddToCartBtn";

interface ProductProps {
    id: number; // Changed from key to id
    itemName: string;
    discount?: number; // Default is 6
    price?: number;
    scrollable?: boolean;
    image?: string;
    category?: string;
}

export function Product({
    id, // Fixed from key
    itemName,
    price = 0,
    discount = 6,
    scrollable,
    image = "/placeholder.png", // Added a fallback image
    // category = "Uncategorized", // Default categor
}: ProductProps) {
    const discountedPrice = calculateDiscountedPrice(price, discount);

    return (
        <div key={id} className={`${scrollable ? "flex-grow flex-shrink-0 md:basis-[15%] basis-[60%]" : "w-full"} 
      text-black px-2 md:p-5 cursor-pointer flex flex-col justify-between rounded-md min-h-[220px]
         hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out`}>
            
            {/* Product Image */}
            <Image
                src={image}
                alt={itemName}
                width={500}
                height={500}
                className="w-full h-40 object-contain m-auto p-4 rounded-md border-2"
            />

            {/* Product Name */}
            <h1 className="mt-2 font-serif font-semibold text-sm">{itemName}</h1>

            {/* Price and Discount */}
            <span className="font-serif font-semibold text-xl flex gap-2 items-center">
                Rs. {discountedPrice}{" "}
                <span className="text-green-500 text-md font-semibold">({discount}%)</span>
            </span>

            {/* Add to Cart Button */}
            {/* <div className="flex justify-end">
                <AddToCartBtn
                    data={{
                        id: id, // Fixed from key
                        title: itemName,
                        srcUrl: image,
                        price: discountedPrice,
                        attributes: [category],
                        discount: { percentage: discount },
                        quantity: 1, // Default quantity
                    }}
                />
            </div> */}
        </div>
    );
}
