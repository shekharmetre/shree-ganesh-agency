import React, { ReactNode } from "react";

// Define types for the props
interface ProductWrapperProps {
    scrollable?: boolean;
    children: ReactNode; // ReactNode is used for any valid JSX content
    className?: string;
    header?: string;
    headerClass?: string;
    view?: boolean;
    onclick?: () => void; // onclick is a function, optionally passed
    title? : String;
    subTitle? : String
}

export function ProductWrapper({
    scrollable = false,
    children,
    className = '',
    header = "Today's Best Offer",
    headerClass = "md:text-4xl text-2xl font-semibold font-serif",
    view = false,
    onclick,
    title,
    subTitle
}: ProductWrapperProps) {
    return (
        <div className="mt-5 p-2">
            <h1 className="font-serif font-semibold text-xl md:text-4xl">{title || "Trending Near You"}</h1>
            <span className="text-gray-500 text-sm md:text-xl">{subTitle || "Popular in your city"}</span>
            <div
                className={`
          ${scrollable
                        ? "flex items-center gap-3 overflow-x-auto md:overflow-x-scroll md:max-w-full px-4"
                        : "grid lg:grid-cols-5  md:grid-cols-3 grid-cols-2 gap-4 w-full"} 
          ${className}`}
            >
                {children}
            </div>
        </div>
    );
}
