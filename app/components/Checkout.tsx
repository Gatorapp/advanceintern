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
    } catch (err: unknown) {
      console.error("Payment Error:", err);
      if (err instanceof Error) {
        setError(err.message || "An error occurred during payment.");
      } else {
        setError("An error occurred during payment.");
      }
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
        <div className="checkout-form checkout-form--flex">
          <h1 className="checkout-form__title">Complete Your Payment</h1>

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
            className="manual-address-input"
          />
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}
          {/* Enter Address Manually Button */}
          <button
            type="button"
            className="manual-address-button"
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
                className="manual-address-input"
              />
              <input
                type="text"
                placeholder="Address Line 2"
              />
              <div className="manual-address-row">
                <input
                className="manual-address-input"
                  type="text"
                  placeholder="City"
                />
                <input
                  className="manual-address-input"
                  type="text"
                  placeholder="Zip Code"
                />
              </div>
              <input
                className="manual-address-input"
                type="text"
                placeholder="State"
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