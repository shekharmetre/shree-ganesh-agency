"use client";

import React from "react";
export default function CartPage() {
return (
  <div>CartPage</div>
)

  // return (
  //   <main className="pb-20">
  //     <div className="max-w-frame mx-auto px-4 xl:px-0">
  //       {cart && cart.items.length > 0 ? (
  //         <>
  //           <BreadcrumbCart />
  //           <h2
  //             className={cn([
  //               "font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6",
  //             ])}
  //           >
  //             your cart
  //           </h2>
  //           <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
  //             <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
  //               {cart && cart?.items?.map((product, idx, arr) => (
  //                 <React.Fragment key={idx}>
  //                   <ProductCard data={product} />
  //                   {arr.length - 1 !== idx && (
  //                     <hr className="border-t-black/10" />
  //                   )}
  //                 </React.Fragment>
  //               ))}
  //               {/* {cart && cart?.items?.map((products,idx,arr)=>{
  //                 console.log("products",products,"array",arr)
  //                 return (
  //                   <div>
  //                     returning something
  //                   </div>
  //                 )
  //               })}
  //               hell world */}
  //             </div>
  //             <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
  //               <h6 className="text-xl md:text-2xl font-bold text-black">
  //                 Order Summary
  //               </h6>
  //               <div className="flex flex-col space-y-5">
  //                 <div className="flex items-center justify-between">
  //                   <span className="md:text-xl text-black/60">Subtotal</span>
  //                   <span className="md:text-xl font-bold">${totalPrice}</span>
  //                 </div>
  //                 <div className="flex items-center justify-between">
  //                   <span className="md:text-xl text-black/60">
  //                     Discount (-
  //                     {Math.round(
  //                       ((totalPrice - adjustedTotalPrice) / totalPrice) * 100
  //                     )}
  //                     %)
  //                   </span>
  //                   <span className="md:text-xl font-bold text-red-600">
  //                     -${Math.round(totalPrice - adjustedTotalPrice)}
  //                   </span>
  //                 </div>
  //                 <div className="flex items-center justify-between">
  //                   <span className="md:text-xl text-black/60">
  //                     Delivery Fee
  //                   </span>
  //                   <span className="md:text-xl font-bold">Free</span>
  //                 </div>
  //                 <hr className="border-t-black/10" />
  //                 <div className="flex items-center justify-between">
  //                   <span className="md:text-xl text-black">Total</span>
  //                   <span className="text-xl md:text-2xl font-bold">
  //                     ${Math.round(adjustedTotalPrice)}
  //                   </span>
  //                 </div>
  //               </div>
  //               <div className="flex space-x-3">
  //                 <InputGroup className="bg-[#F0F0F0]">
  //                   <InputGroup.Text>
  //                     <Tag className="text-black/40 text-2xl" />
  //                   </InputGroup.Text>
  //                   <InputGroup.Input
  //                     type="text"
  //                     name="code"
  //                     placeholder="Add promo code"
  //                     className="bg-transparent placeholder:text-black/40"
  //                   />
  //                 </InputGroup>
  //                 <Button
  //                   type="button"
  //                   className="bg-black rounded-full w-full max-w-[119px] h-[48px]"
  //                 >
  //                   Apply
  //                 </Button>
  //               </div>
  //               <Button
  //                 type="button"
  //                 className="text-sm md:text-base font-medium bg-black rounded-full w-full py-4 h-[54px] md:h-[60px] group"
  //               >
  //                 Go to Checkout{" "}
  //                 <ArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
  //               </Button>
  //             </div>
  //           </div>
  //         </>
  //       ) : (
  //         <div className="flex items-center flex-col text-gray-300 mt-32">
  //           <ShoppingBasket strokeWidth={1} className="text-6xl" />
  //           <span className="block mb-4">Your shopping cart is empty.</span>
  //           <Button className="rounded-full w-24" asChild>
  //             <Link href="/">Shop</Link>
  //           </Button>
  //         </div>
  //       )}
  //     </div>
  //   </main>
  // );
}