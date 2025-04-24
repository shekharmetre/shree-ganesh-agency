import { Prisma } from "@prisma/client";

export enum UserRole {
  AGENT = "AGENT",
  DISTRIBUTOR = "DISTRIBUTOR",
  USER = "USER",
  RETAILER = "RETAILER",
}

export type Agent = {
  id: string;
  agentUsername: string;
  agentEmail: string;
  authId: string;
  createdAt: Date;
  updatedAt: Date;
  // Relations
  retailers: User[];
};

export enum OrderStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  DISPATCHED = "DISPATCHED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export type Order = {
  id: number;
  retailerId: number;
  status: OrderStatus;
  items: Prisma.JsonValue; // Use `Prisma.JsonValue` if using @prisma/client
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  // Relations
  retailer: User;
};

export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  address?: string | null;
  phone: string;
  isVerified: boolean;
  agentId: string;
  role: UserRole;
  authId: string;
  createdAt: Date;
  updatedAt: Date;
  // Relations
  agent: Agent;
  orders: Order[];
};

export type AgentWithLatestRetailerOrdersType = {
  id: string;
  agentUsername: string;
  retailers: {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    phone: string;
    isVerified: boolean;
    createdAt: Date;
    orders: {
      id: number;
      items: any; // Replace with a more specific type if you know the JSON shape
      totalPrice: number;
      status: "PENDING" | "VERIFIED" | "DISPATCHED" | "COMPLETED" | "CANCELLED";
      createdAt: Date;
    }[];
  }[];
};


export interface MedicineItem {
  id: number
  name: string
  manufacturer: string
  pricePerUnit: number
  qty: number
  image: string
  stock: "In Stock" | "Low Stock" | "Out of Stock"
  expiryDate: string
  isNew: boolean
  percentage: number
  category: string
  offers: Offer | null
}
