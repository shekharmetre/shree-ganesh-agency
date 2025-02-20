
import { Bell,User2 } from 'lucide-react';
import React from 'react';
import { DropdownMenuDemo } from './ui/drop-downWrapper';
import { CardDemo } from './ui/notification';
import { Profile } from './profile';
import { supbase } from '@/utils/supabase/client';
import { ButtonRedirect } from './ui/redirectbutton';
import Link from 'next/link';
import { ShopppingCart } from './navbar/shoppingCart';
import Image from 'next/image';

const notifications = [
    {
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
]

export async function Navbar() {
    // console.log(supbase.auth.getUser())
    const { data: { user } } = await supbase.auth.getUser();
console.log(user);
    return (
        <header className="bg-gray-100  md:py-0 sticky md:top-0 top-0 z-50">
            <div className="container mx-auto px-4  bg-transparent flex items-center">
                {/* Combined content */}
                <div className="flex items-center w-full">
                    {/* logo */}
                    <div className="mr-auto md:w-36 py-2 ml-10 md:ml-0 flex-shrink-0">
                        {/* <img className="w-full" src="/logo.svg" alt="" /> */}
                        <Image className="w-full" width={100} height={100} src="/logo.svg" alt="" />
                    </div>
                    {/* phone number */}
                    <div className="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
                        <span className="font-bold md:text-xl">8 800 332 65-66</span>
                        <span className="font-semibold text-sm text-gray-400">Support 24/7</span>
                    </div>
                    {!user ? (
                        <>
                            <nav className="contents">
                                <ul className="ml-4 xl:w-48 flex items-center justify-end">
                                    <li className="ml-2 lg:ml-4 relative inline-block">
                                        <div className="">
                                            <div className="absolute -top-4 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">12</div>

                                            <DropdownMenuDemo triggered={<Bell className="w-6 h-6 cursor-pointer" />}>
                                                <CardDemo notifications={notifications} />
                                            </DropdownMenuDemo>

                                        </div>
                                    </li>
                                    {/* shoppingCart */}
                                    <ShopppingCart />
                                    <li className="ml-2 lg:ml-4 relative inline-block">
                                        <div className="">
                                            <DropdownMenuDemo triggered={<User2 className="w-6 h-6" />}>
                                                <Profile />
                                            </DropdownMenuDemo>
                                        </div>
                                    </li>
                                </ul>
                            </nav>

                            {/* cart count */}
                            <div className="ml-4 hidden sm:flex flex-col font-bold">
                                <span className="text-xs text-gray-400">Your Cart</span>
                                <span>$2,650,59</span>
                            </div>
                        </>
                    ) : (
                        <div className='flex md:gap-10 gap-2 items-center md:ml-20'>
                            <ButtonRedirect buttonName='Login' />
                            <Link href="/register" className='font-semibold text-md md:text-xl underline'>Register</Link>
                        </div>
                    )}

                </div>
            </div>
            <hr />
        </header>
    );
}
