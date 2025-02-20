import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const res = await fetch("http://localhost:3000/api/products-data", {
            method: "GET",
            cache: "no-store", // Avoid caching to get fresh data
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        // Optional: Paginate the data
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get("limit") || "20", 10);
        const offset = parseInt(searchParams.get("offset") || "0", 10);

        const paginatedData = data.slice(offset, offset + limit);

        return NextResponse.json({
            data: paginatedData,
            total: data.length,
            hasNextPage: offset + limit < data.length,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
    }
}
