"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import './checkout.css';

interface CheckoutFormProps {
  amount: string | null;
}

export default function CheckoutForm({ amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showManualAddress, setShowManualAddress] = useState(false);
  const searchParams = useSearchParams();
  const planTitle = searchParams.get("planTitle") || "Premium Plan";

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

      if (!response.ok) {
        throw new Error(`Failed to create payment intent: ${response.statusText}`);
      }

      const { clientSecret, redirectUrl } = await response.json();

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

      window.location.href = redirectUrl || "/for-you";
    } catch (err: any) {
      console.error("Payment Error:", err);
      setError(err.message || "An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App-Container is-noBackground flex-container justify-content-center">
      <div className="App App--singleItem">
        {/* Left Section: Subscription Summary */}
        <div className="App-Overview">
          <h2>Summarist
          {process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY?.startsWith("sk_test_") && <p>Test Mode</p>}
          </h2>
          <h3 className="plan__card--title">{planTitle}</h3>
          <p>
            <strong>{loading ? "Processing..." : `Pay $${(parseInt(amount || "0", 10) / 100).toFixed(2)}`}</strong> per year
          </p>
          <button className="btn"
          onClick={() => window.history.back()}>
            back
            </button>
        </div>

        {/* Right Section: Payment Form */}
        <div className="checkout-form" style={{ flex: 1 }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Complete Your Payment</h1>

          {/* Email Input */}
          <input
            className="checkout-form__email"
            type="email"
            placeholder="Email Address"
          />

          {/* Card Information */}
          <div className="FormFieldGroup-labelContainer flex-container justify-content-space-between">
            <label htmlFor="cardForm-fieldset">
              <span className="Text Text-color--gray600 Text-fontSize--13 Text-fontWeight--500">Card information</span>
            </label>
            <CardElement />
          </div>

          {/* Cardholder Name Input */}
          <div className="FormFieldGroup-labelContainer flex-container justify-content-space-between">
            <label htmlFor="cardForm-fieldset">
              <span className="Text Text-color--gray600 Text-fontSize--13 Text-fontWeight--500">Cardholder name</span>
            </label>
          <input
            className="checkout-form__cardholder-name"
            type="text"
            placeholder="Cardholder Name"
          />
          </div>

          {/* Billing Address Input */}
          <div className="FormFieldGroup-labelContainer flex-container justify-content-space-between">
            <label htmlFor="cardForm-fieldset">
              <span className="Text Text-color--gray600 Text-fontSize--13 Text-fontWeight--500">Billing Address</span>
            </label>
          <input
            type="text"
            placeholder="Address"
            style={{
              width: "100%",
              padding: "0.5rem",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
          </div>

          {/* Error Message */}
          {/* Enter Address Manually Button */}
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              color: "#007bff",
              textDecoration: "underline",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
            onClick={() => setShowManualAddress(!showManualAddress)}
          >
            Enter address manually
          </button>

          {/* Manual Address Inputs */}
          {showManualAddress && (
            <div>
              <input
                type="text"
                placeholder="Address Line 1"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              />
              <input
                type="text"
                placeholder="Address Line 2"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              />
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <input
                  type="text"
                  placeholder="City"
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                />
                <input
                  type="text"
                  placeholder="Pin"
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                />
              </div>
              <input
                type="text"
                placeholder="State"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              />
            </div>
          )}

          {/* Pay Button */}
          <button
            type="submit"
            disabled={!stripe || loading}
            onClick={handleSubmit}
          >
            {loading ? "Processing..." : `Pay $${(parseInt(amount || "0", 10) / 100).toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}