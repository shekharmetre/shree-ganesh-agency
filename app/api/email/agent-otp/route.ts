import { isExpired } from "@/utils/helper";
import {  sendOtpEmail } from "@/utils/helper/server-helper";
import { prisma } from "@/utils/prisma";
import { supbase } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber } = await req.json();
    console.log("Received phoneNumber:", phoneNumber);

    if (!phoneNumber) {
      return NextResponse.json({ message: "Phone number is required" }, { status: 400 });
    }

    // Find the agent by phone number
    const agent = await prisma.agent.findFirst({
      where: { agentNumber: phoneNumber },
    });

    if (!agent) {
      return NextResponse.json({ message: "Agent Not Found" }, { status: 404 });
    }

    if (!agent.agentEmail) {
      return NextResponse.json({ message: "Agent email not found" }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
5
    // Insert OTP into Supabase
    const istOffset = 5.5 * 60 * 60000; // Convert 5 hours 30 minutes to milliseconds

    // Get the current IST time and set expiry to 10 minutes from now
    const expiryIST = new Date(Date.now() + 10 * 60000 + istOffset); // 10-minute expiry in IST

    // Convert IST time to UTC
    const expiryUTC = new Date(expiryIST.getTime() - expiryIST.getTimezoneOffset() * 60000).toISOString(); // Convert IST to UTC

    const { data, error: insertError } = await supbase
      .from("otp_codes")
      .insert([
        {
          email: agent.agentEmail,
          otp: otp,
          expires_at: expiryUTC, // Store expiry in UTC
        },
      ]);

    if (insertError) {
      console.error("Error inserting OTP:", insertError);
    }

    if (insertError) {
      console.error('Error inserting OTP:', insertError.message);
      return NextResponse.json({ message: "Failed to store OTP", error: insertError.message }, { status: 500 });
    } else {
      console.log('OTP inserted successfully:', data);
    }

    // Construct the HTML content for the OTP email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #007bff;">Agent Verification Required ✅</h2>
        <p>Hello, <strong>${agent.agentEmail}</strong> 👋</p>
        <p>Your One-Time Password (OTP): <strong style="font-size: 1.2em; color: #007bff;">${otp}</strong></p>
        <p style="color: red;">⚠️ This OTP is valid for only <strong>5 minutes</strong>. Please do not share it with anyone.</p>
        <p>Use this OTP to verify your agent account and complete the registration process.</p>
        <p style="color: gray; font-size: 0.9em;">If you did not request this verification, please ignore this email.</p>
      </div>
    `;

    // Send OTP email
    await sendOtpEmail({
      to: agent.agentEmail,
      subject: "Agent Verification Code",
      htmlContent,
    });

    return NextResponse.json({ message: "OTP sent successfully", data: agent.agentEmail });

  } catch (error: any) {
    console.error("Error in OTP API:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const otp = searchParams.get("otp");

  if (!email || !otp) {
    return NextResponse.json({ error: "Missing email or OTP" }, { status: 400 });
  }

  console.log("Confirmation OTP is", email);

  // Fetch the latest OTP for the given email
  const { data, error } = await supbase
    .from("otp_codes")
    .select("otp, expires_at")
    .eq("email", email)
    .order("expires_at")
    .limit(1);

    // bhagyawantimobile@gmail.com
  console.log("Fetched OTP Data:", data);

  if (error) {
    return NextResponse.json({ message: "Error retrieving OTP", error: error.message }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ message: "OTP not found" }, { status: 404 });
  }

  const latestOtp = data[0];
  console.log("latest otp",latestOtp)

  // // Check if OTP is expired
  if (isExpired(latestOtp.expires_at)) {
    return NextResponse.json({ message: "OTP has expired" }, { status: 410 });
  }

  // // Validate OTP
  if (latestOtp.otp !== otp) {
    return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
  }

  return NextResponse.json({ message: "OTP verified successfully" });
}

