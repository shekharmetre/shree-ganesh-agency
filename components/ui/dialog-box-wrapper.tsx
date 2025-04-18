"use client";

import { useEffect, useRef, useState } from "react";
import EmailVerification from "../helper/verification/mobile-otp-verfiication";
import { apiRequest } from "@/utils/helper/api-client";

const OpenDialog = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [inputValue, setInputValue] = useState("");

    // const openDialog = () => {
    //     dialogRef.current?.showModal();
    // };

    const closeDialog = () => {
        dialogRef.current?.close();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
    };

    useEffect(() => {
        const sendRequest = async () => {
            try {
                const response = await apiRequest({
                    url: "/api/email/agent-otp",
                    method: "POST",
                    data: { number: inputValue },
                });
                console.log("Successfully sent OTP",response);
            } catch (error) {
                console.log(error);
            }
        };

        if (/^\d{10}$/.test(inputValue)) {
            sendRequest();
        }
    }, [inputValue]);

    return (
        <div>
            {/* Input Field */}
            <div>
                <div className="relative">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                        value={inputValue}
                        onChange={handleInputChange}
                        maxLength={10}
                    />
                    <label
                        htmlFor="username"
                        className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
                    >
                        Agent Verification
                    </label>
                </div>
            </div>

            {/* Native HTML Dialog */}
            <dialog ref={dialogRef}>
                <button onClick={closeDialog} className="flex justify-end items-end">✖</button>
                <EmailVerification agentEmail="nothing" closeDialog={()=>{}} mobileNumber={inputValue} />
            </dialog>
        </div>
    );
};

// Fix: Explicitly set displayName
OpenDialog.displayName = "OpenDialog";

export default OpenDialog;
