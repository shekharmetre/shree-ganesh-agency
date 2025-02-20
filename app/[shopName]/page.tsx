import LiveOrderSummary from "@/components/ShopPage/live-order";
import { ProductPage } from "@/components/ShopPage/product-page";
import { HeroShop } from "@/components/ShopPage/shop-hero";


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
                <LiveOrderSummary />
            </div>
        </div>
    )
}