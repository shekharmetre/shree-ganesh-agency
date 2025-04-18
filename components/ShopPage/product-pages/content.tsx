import { useState } from "react";

const ScrollableNav = ({selectedItem}:{selectedItem?:(value:string)=>void}) => {
    const [activeTab, setActiveTab] = useState("Dashboard");

    const menuItems = ["Dashboard", "Orders", "History", "Offers", "Support"];

    return (
        <div className="w-full">
            <ul className="flex gap-4 overflow-x-auto md:flex-wrap p-2 scrollbar-hide">
                {menuItems.map((item) => (
                    <li
                        key={item}
                    onClick={() => {setActiveTab(item)}}
                        className={`cursor-pointer px-4 py-2 text-gray-600 whitespace-nowrap ${
                            activeTab === item ? "border-b-2 border-blue-600 text-blue-600 font-semibold" : ""
                        }`}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScrollableNav;
