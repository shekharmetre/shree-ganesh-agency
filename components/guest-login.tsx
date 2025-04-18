'use client'

import { login } from "@/app/login/action";

export function GuestLOgin() {

   async function hadleGuestLogin(e:any){
        e.preventDefault();
        const formData = new FormData();
        formData.append("email","dummy@gmail.com")
        formData.append("password","1111111111")
        await login(formData);
    }

    return (
        <button
            type="button" 
            onClick={hadleGuestLogin}
            className="w-full text-black bg-pink-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
            Guest Login
        </button>
    )
}