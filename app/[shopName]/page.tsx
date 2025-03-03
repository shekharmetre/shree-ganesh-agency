import LiveOrderSummary from "@/components/ShopPage/live-order"
import { ProductPage } from "@/components/ShopPage/product-pages"

import { HeroShop } from "@/components/ShopPage/shop-hero"
import { supbase } from "@/utils/supabase/client"


export default async function ShopName({ params }: { params: { shopName: string } }) {
    const access_token = params.shopName
    console.log(access_token)

    let userData = null
    let errorMessage = null

    if (access_token) {
        const { data, error } = await supbase.auth.getUser(access_token)

        if (error) {
            errorMessage = error.message
        } else {
            userData = data.user
        }
    }

    return (
        <div>
            {errorMessage ? (
                <div className="text-red-500">Error fetching user: </div> 
                // {errorMessage}
            ) : userData ? (
                <p>Welcome, {userData.email}</p>
            ) : (
                <p>Loading user data...</p>
            )}

            <div className="md:flex md:gap-2">
                <div>
                    
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
