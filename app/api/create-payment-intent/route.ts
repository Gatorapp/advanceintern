import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil",
});

export async function POST(req: NextRequest) {
  try {
    
    const { amount } = await req.json();

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    console.log("Amount received:", amount);
    console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY ? "Loaded" : "Not Loaded");
    console.log("Base URL:", process.env.NEXT_PUBLIC_BASE_URL);

    const paymentIntent = await stripe.paymentIntents.create({
      amount, 
      currency: "usd",
      payment_method_types: ["card"],
    });

    
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/for-you`, 
    });
  } catch (error: any) {
    console.error("Error creating payment intent:", error);

  
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}