import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateDiscountedPrice(originalPrice: number, discountPercentage: number): number {
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);
  return Math.round(discountedPrice); // Rounds to the nearest integer
}


export const compareArrays = (a: any[], b: any[]) => {
  return a.toString() === b.toString();
};



