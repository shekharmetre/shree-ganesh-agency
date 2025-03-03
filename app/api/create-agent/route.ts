import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const agents = await prisma.agent.findMany();
        return NextResponse.json({ message: "Success", agents });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching agents", error: error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { agentName, agentEmail, agentNumber, password } = await req.json();

        if (!agentName || !agentEmail || !agentNumber || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        console.log(prisma)

        const agent = await prisma.agent.create({
            data: {
                agentName,
                agentEmail,
                agentNumber,
                password,
            },
        });

        return NextResponse.json({ message: "Agent created successfully", agent });
    } catch (error) {
        return NextResponse.json({ message: "Error creating agent", error: error }, { status: 500 });
    }
}
