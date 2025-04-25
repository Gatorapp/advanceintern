"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  amount: string | null; // Accept the amount as a prop
}

export default function CheckoutForm({ amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card element not found.");
      setLoading(false);
      return;
    }

    try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: parseInt(amount || "0", 10) }),
        });

        console.log("API Response:", response);
      
        if (!response.ok) {
          throw new Error(`Failed to create payment intent: ${response.statusText}`);
        }
      
        const { clientSecret } = await response.json();
      
        if (!clientSecret) {
          throw new Error("Client secret is missing in the response.");
        }
      
        const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });
      
        if (stripeError) {
          throw new Error(stripeError.message || "An error occurred during payment.");
        }
      
        alert("Payment successful!");
      } catch (err: any) {
        console.error("Payment Error:", err);
        setError(err.message || "An error occurred during payment.");
      } finally {
        setLoading(false);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay $${(parseInt(amount || "0", 10) / 100).toFixed(2)}`}
      </button>
    </form>
  );
}