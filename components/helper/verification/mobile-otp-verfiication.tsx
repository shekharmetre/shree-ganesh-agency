'use client'
import { ToastMessage } from "@/lib/features/ToastMessage";
import { apiRequest, maskEmail } from "@/utils/helper/api-client";
import { useRef, useState } from "react";
import { sendRequest } from "./agent-verirication";
import { verifyUser } from "@/lib/features/verification/verificationSlice";
import FiveMinuteTimer from "@/hooks/timer-setup";


const verifyOtp = async (agentEmail: string, otpCode: string) => {
    try {
        const response = await apiRequest({
            url: `/api/email/agent-otp?email=${agentEmail}&otp=${otpCode}`,
            method: "GET",
        });

        if (response.statusCode !== 200) {
            console.log(response);
            ToastMessage("Error", response.message || "OTP verification failed.");
            return false; // Return false if verification fails
        }

        ToastMessage("Success", "You are now verified!");
        return true; // Return true if verification is successful
    } catch (error) {
        console.error("Error verifying OTP:", error); // Log error to console
        ToastMessage("Error", "Error verifying OTP. Please try again.");
        return false; // Return false if there is an error
    }
};

const EmailVerification = ({ agentEmail = "8546474589", closeDialog, mobileNumber }: { agentEmail: string, closeDialog: () => void, mobileNumber: string }) => {

    // Create refs for each OTP input field
    const inputRefs = [...Array(6)].map(() => useRef<HTMLInputElement>(null));


    // Store OTP values in state
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const [expiryTime, setExpiryTime] = useState(() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300); // Set initial 5-minute timer
        return time;
    });

    // Handle input change
    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!/^\d*$/.test(value)) return; // Allow only numbers

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to the next input field if a number is entered
        if (value && index < 3) {
            inputRefs[index + 1]?.current?.focus();
        }
    };



    const handleVerify = async () => {
        const otpCode = otp.join(""); // Combine values
        console.log("Entered OTP:", otpCode);

        if (otpCode.length !== 6) {
            ToastMessage("Error", "Enter OTP correctly");
            return; // Exit the function early
        }

        const success = await verifyOtp(agentEmail, otpCode);

        if (!success) {
            return;
        }
        // dispatch(verifyUser())
        closeDialog()
    };


    const resendingOtp = async () => {
        const response = await sendRequest(mobileNumber);
        if (response.statusCode !== 200) {
            return ToastMessage("Error", response.message)
        }
        const newTime = new Date();
        newTime.setSeconds(newTime.getSeconds() + 300);
        setExpiryTime(newTime);
        return ToastMessage("success", response.message)
    }

    return (
        <div className="relative flex flex-col justify-center overflow-hidden">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    {/* Heading */}
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold md:text-3xl text-2xl">
                            <p>Mobile Verification</p>
                        </div>
                        <div className="flex flex-row md:text-sm text-xs font-medium text-gray-400">
                            <p>We have sent a code to your {maskEmail(agentEmail)}</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div>
                        <div className="flex flex-col space-y-16">
                            {/* OTP Input Fields */}
                            <div className="grid grid-cols-6 gap-2">
                                {otp.map((value, index) => (
                                    <div key={index} className="h-16">
                                        <input
                                            ref={inputRefs[index]} // Assign ref to each input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            maxLength={1}
                                            value={value}
                                            onChange={(e) => handleChange(index, e)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col space-y-5">
                                <div>
                                    <button
                                        type="button"
                                        onClick={handleVerify} // Verify OTP
                                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                                    >
                                        Verify Account
                                    </button>
                                </div>

                                {/* Resend Link */}
                                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                    <p>Didn't receive code?</p>
                                    {/* <a className="flex flex-row items-center text-blue-600" href="#" rel="noopener noreferrer">
                                        Resend
                                    </a> */}
                                    {/* <button className="underline" onClick={resendingOtp}>resend</button> */}
                                    <FiveMinuteTimer expiryTimestamp={expiryTime} onComplete={() => console.log("Timer finished!")}>
                                        <button className="underline" onClick={resendingOtp}>
                                            Resend
                                        </button>
                                    </FiveMinuteTimer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
