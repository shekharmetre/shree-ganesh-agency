"use client";
import Image from "next/image";
import { useState } from "react";

interface Offer {
  title: string;
  image: string;
}

interface CarouselProps {
  offers: Offer[];
}

export default function Carousel({ offers }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + offers.length) % offers.length);
  };

  return (
    <div className="relative w-full">
      {/* Carousel Wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`absolute w-full h-full flex flex-col items-center justify-center text-white transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image src={offer.image} alt={offer.title} width={500} height={500} className="w-full p-2 rounded-md" />
            <div className="absolute bottom-4 bg-black/50 text-white px-4 py-2 rounded-md">
              {offer.title}
            </div>
          </div>
        ))}
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3">
        {offers.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      {/* Controls */}
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
        onClick={prevSlide}
      >
        ◀
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
        onClick={nextSlide}
      >
        ▶
      </button>
    </div>
  );
}
