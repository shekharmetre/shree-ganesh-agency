'use client'; // This directive ensures the component is client-side rendered

import dynamic from 'next/dynamic';
import { MissedOrder } from "./missed-order";
import SimpleBarChart from "./weekly-report";
import MainProduct from './product-list';

// Dynamically import Marquee to ensure it's only rendered on the client side
const Marquee = dynamic(() => import('react-fast-marquee'), { ssr: false });

export const ProductPage = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden -mt-8">
      {/* Marquee Announcement */}
      <div className="p-2 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg shadow-lg">
        <Marquee speed={50} gradient={false} className="text-white font-semibold">
          🚨 Announcement: Exclusive discounts on antibiotics and painkillers this week! 🚨
          🛒 Place your orders now and save up to 20%! 🛒
          📞 Contact support for bulk order inquiries. Limited stock available! 📞
        </Marquee>
      </div>

      {/* Header */}
      <div id="header">
        <h1 className="text-2xl md:text-5xl font-bold text-start ml-5 mt-3 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          Welcome To, Shri Ganesh Agency
        </h1>

        {/* Cards */}
        <div className="overflow-x-auto whitespace-nowrap mt-14 max-w-screen-sm snap-x px-2">
          <div className="inline-flex gap-3">
            {/* Missed Order Card */}
            <div className="w-[80vw] flex-shrink-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-300 p-4 rounded-lg snap-center h-40">
              <MissedOrder />
            </div>

            {/* Weekly Report Card */}
            <div className="w-[80vw] flex-shrink-0 bg-gray-100 p-4 rounded-lg snap-center">
              <SimpleBarChart />
            </div>

            {/* Placeholder Cards */}
            <div className="w-[80vw] flex-shrink-0 bg-gray-100 p-4 rounded-lg snap-center">
              hello wr
            </div>
            <div className="w-[80vw] flex-shrink-0 bg-gray-100 p-4 rounded-lg snap-center">
              hello wr
            </div>
          </div>
        </div>
      </div>
      <MainProduct />
    </div>
  );
};