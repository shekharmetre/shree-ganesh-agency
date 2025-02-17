import LiveOrderSummary from "@/components/ShopPage/live-order";
import { MedicineRow } from "@/components/ShopPage/medicine-row";
import { ProductPage } from "@/components/ShopPage/product-page";
import { HeroShop } from "@/components/ShopPage/shop-hero";
import axios from "axios";




async function getMedicines() {
    try {
        const response = await axios.get("http://localhost:3000/api/data?limit=30");
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export default async function ShopName() {
    return (
        <div>
            <div className="md:flex md:gap-2">
                <div className="">
                    <HeroShop />
                    <ProductPage />
                </div>

            </div>
            <div className="hidden md:block">
                {/* <LiveOrderSummary /> */}
            </div>
        </div>
    )
}