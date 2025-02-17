import React from "react";
import { NumberTicker } from "../ui/number-ticker";
import { LeftToRightMove } from "../helper/framerWrapper";

const AboutUsSection: React.FC = () => {
  return (
    <section className="md:py-20 relative xl:mr-0 lg:mr-5 mr-0">
      <div className="w-full  px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
          {/* Left Section */}
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="flex-col justify-start lg:items-start items-center md:gap-4 mt-5 flex">
                <h6 className="text-gray-400 text-base font-normal leading-relaxed">About Us</h6>
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <LeftToRightMove>
                    <h2 className="text-indigo-700 text-2xl font-bold font-manrope leading-normal lg:text-start text-center">
                      Transform the Way You Order Medicines with Shri Ganesh Agency Web App
                    </h2>
                  </LeftToRightMove>

                  <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    Our innovative app helps medical stores easily order medicines, access real-time offers, and maintain strong relationships with the agency.
                  </p>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="w-full flex-col justify-center items-start gap-6 flex">
                <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9"><NumberTicker value={33} /> + Years Of Trust</h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">Building Strong relationships with medical stores</p>
                  </div>
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9"><NumberTicker value={100} />+ Pharmacies Served</h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">Helping pharmacies streamline their medicine procurement efficiently.</p>
                  </div>
                </div>
                <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  <div className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9"><NumberTicker value={98} />% Client Satisfaction</h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">Trusted by medical professionals for reliability and service excellence</p>
                  </div>
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">Over a Million Orders Fulfilled</h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">Ensuring seamless and timely delivery of medicines to medical stores..</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Read More Button */}
            <button className="sm:w-fit w-full group px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
              <span className="px-1.5 text-indigo-600 text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">Read More</span>
              <svg className="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996" stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Right Section - Image */}
          <div className="w-full lg:justify-start justify-center items-start flex">
            <div className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
              <img className="sm:mt-5 sm:ml-5 w-full md:h-full h-[40vh] rounded-3xl object-cover" src="/hero/production.png" alt="about Us image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
