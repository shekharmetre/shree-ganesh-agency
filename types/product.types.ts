export type Discount = {
    amount: number;
    percentage: number;
  };
  
  export type Product = {
    id: number;
    title: string;
    srcUrl: string;
    gallery?: string[];
    price: number;
    discount: Discount;
    rating: number;
  };

  export interface CartItem {
    id: number;
    name: string;
    manufacturer: string;
    pricePerUnit: number;
    image? : string
    stock: string;
    expiryDate: string;
    category: string;
    isNew? : boolean,
    perecentage? : number,
    quantity? : number | 1,
    offers?: {
        type: string;
        description: string;
    } | null;
  }