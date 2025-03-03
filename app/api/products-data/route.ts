import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  const filePath = join(process.cwd(), "public", "data.json"); // Get absolute path
  const data = JSON.parse(readFileSync(filePath, "utf8")); // Read file
  
  return NextResponse.json(data);
}
