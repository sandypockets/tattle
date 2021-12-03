import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { supabase } from "../../../lib/supabaseClient";
import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
const stripeApiKey = process.env.NEXT_STRIPE_SECRET_KEY
const stripePromise = loadStripe(stripeApiKey);

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const user = supabase.auth.user()
    // Create PaymentIntent as soon as the page loads
    fetch("/api/v1/stripe2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ id: "Tattle Monthly" }],
        user: user.id
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}