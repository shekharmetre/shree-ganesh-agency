"use server"

import { prisma } from "@/utils/prisma";

export  async function GetLatestOreders(user:string){
    return await await prisma.agent.findUnique({
    where: { authId: user },
    select: {
      id: true,
      agentUsername: true,
      retailers: {
        where: { role: "RETAILER" }, // only retailers
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          phone: true,
          isVerified: true,
          createdAt: true,
          orders: {
            orderBy: { createdAt: "desc" },
            take: 1, // latest 2 orders per retailer
            where : {status:"PENDING"},
            select: {
              id: true,
              items: true,
              totalPrice: true,
              status: true,
              createdAt: true,
            }
          }
        }
      }
    }
  });
}