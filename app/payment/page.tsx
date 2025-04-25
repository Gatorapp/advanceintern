"use client";

import React from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/Checkout";

// Load Stripe with your public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount"); // Retrieve the amount from query parameters

  return (
    <div className="payment-page">
      <h1>Upgrade to Premium</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} /> {/* Pass the amount as a prop */}
      </Elements>
    </div>
  );
}