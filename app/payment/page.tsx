
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/Checkout";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount"); // Retrieve the amount from query parameters

  return (
    <div className="payment-page">
      <div className="upgrade-container">
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Subscribe to Summarist Premium Plus</h1>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
}