'use client';

import { useState, useRef, useEffect } from 'react';
import { apiRequest } from "@/utils/helper/api-client";
import EmailVerification from './mobile-otp-verfiication';
import { useQuery } from '@tanstack/react-query';
import SpinnerbLoader from '@/components/spinnerLoader';
import { ToastMessage } from '@/lib/features/ToastMessage';

// API request function
export const sendRequest = async (inputValue: string) => {
  try {
    const response = await apiRequest({
      url: "/api/email/agent-otp",
      method: "POST",
      data: { phoneNumber: inputValue },
    });
    console.log(response);
    return response;  // Make sure to return the response
  } catch (error) {
    throw error;  // Throw error to be handled by useQuery
  }
};

export const AgentVerification = () => {
  const [inputValue, setInputValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true); // For controlling the dialog
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [AgentEmail, setAgentEmail] = useState<string | unknown>()

  // Use Tanstack Query for making the API request
  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ['sendOtp', inputValue],  // Add inputValue to the query key to trigger refetch when it changes
    queryFn: () => sendRequest(inputValue),
    enabled: false, // Disable automatic fetching
    retry: false
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };


  useEffect(() => {
    if (data) {
      if (data.statusCode !== 200) {
        console.log(data)
        ToastMessage("Error", data.message as string || "unknown error");
        // here why problem is there i set on api all object of error returning that's why
      
      } else {
        ToastMessage("success", data?.message as string || "Successfully sent otp")
        setAgentEmail(data?.data)
        // setAgentEmail(data.data);
        setIsDialogOpen(true); // Open dialog if API call succeeds
        dialogRef.current?.showModal()
      }
    }
  }, [data, isError, error]);

  useEffect(() => {
    if (/^\d{10}$/.test(inputValue)) {
      refetch(); // Trigger the query when the input value is valid
    }
  }, [inputValue, refetch]);

  // Close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
    dialogRef.current?.close(); // Close dialog programmatically
  };

  console.log(AgentEmail)

  const isVerified = false



  return (
    <div>
      {/* Input Field */}
      <div className="flex flex-col space-y-2">
        <div className="relative">
          <input
            id="username"
            name="username"
            type="text"
            className={`border-b py-1 transition-colors focus:outline-none peer bg-inherit
              ${isVerified ? "border-green-500 text-green-700" : "border-gray-300 focus:border-blue-700 focus:border-b-2"}
            `}
            value={isVerified ? "" : inputValue}
            onChange={handleInputChange}
            maxLength={10}
            disabled={isVerified} // Disable input when verified
          />
          <label
            htmlFor="username"
            className={`absolute left-0 top-1 cursor-text transition-all
              ${isVerified ? "text-green-700 -top-4 text-xs" : "peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-700"}
            `}
          >
            Agent Verification
          </label>

          {/* Verified Badge */}
          {isVerified && (
            <span className="absolute right-0 top-1 text-green-700 text-sm font-semibold">✔ Verified</span>
          )}
        </div>

        {isLoading && (
          <dialog className='w-full h-[100vh] m-auto' open>
            <div className="flex justify-center items-center py-6">
              <SpinnerbLoader />
              <span className="ml-4">Loading...</span>
            </div>
          </dialog>
        )}

        {isDialogOpen && (
          <dialog ref={dialogRef}>
            <button onClick={closeDialog} className="flex justify-end items-end">✖</button>
            <EmailVerification  agentEmail={AgentEmail as string} closeDialog={closeDialog} mobileNumber={inputValue} />
          </dialog>
        )}
      </div>
    </div>
  );
};
