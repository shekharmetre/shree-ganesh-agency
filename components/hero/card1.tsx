import { calculateDiscountedPrice } from "@/lib/utils";
import StarRating from "../star-rating";
import Image from "next/image";
import { MagicCard } from "../ui/magic-card";
import { CartItem } from "@/app/page";

interface ProductCard2Props {
  itemName: string;
  discount?: number; // Optional, default is 20
  price: number;
  scrollable?: boolean; // Optional, determines if the item should scroll
  image?: string; // Optional, image source
  category: string;
  offer: number;
}

export function ProductCard2({
  itemName,
  price,
  scrollable,
  image,
  offer,
  category,
}: ProductCard2Props) {
  const cartItem: CartItem = {
    id: Math.random(), // Ensure a unique ID
    name: itemName,
    srcUrl: image || "", // Map `image` to `srcUrl`
    price: price,
    attributes: [], // Convert category to attributes array
    discount: { percentage: offer }, // Convert offer to discount object
    quantity: 1, // Default quantity
  };

  const gradientColor = "#D9D9D955"; // This could be dynamic if needed

  return (
    <MagicCard
      gradientColor={gradientColor}
      className={`${
        scrollable ? "flex-grow flex-shrink-0 md:basis-[15%] basis-[60%]" : "w-full"
      } text-black py-2 px-2 md:p-5 cursor-pointer flex flex-col justify-between min-h-[220px]
         hover:scale-105 shadow-2xl whitespace-nowrap hover:shadow-lg mt-2 transition-transform duration-300 ease-in-out`}
    >
      <Image
        src={image || ""}
        alt={itemName}
        width={200}
        height={200}
        className=" md:object-cover w-32  h-32 m-auto"
      />
     <h1 className="w-[80%]">{itemName}</h1>
    </MagicCard>
  );
}
