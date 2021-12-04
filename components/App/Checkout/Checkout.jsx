import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { supabase } from "../../../lib/supabaseClient";
import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
const stripePromise = loadStripe('pk_test_51IkyECLSQuRsBVHwF7qm2tCexmpVUdG2fMphLozNAwUelsH4aklQqXVOu8HjkJjq0dWcALrjPfnAQerGxlEpQI8000E8OwzIHi');


export default function Checkout({ session }) {
  const [clientSecret, setClientSecret] = useState("");
  const [user, setUser] = useState()

  useEffect(() => {
    const user = supabase.auth.user()
    setUser(user)
  }, [])

  useEffect(() => {
    if (session || user) {
      // Create PaymentIntent as soon as the page loads
      fetch("/api/v1/stripe2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: "Tattle Monthly" }],
          user: session.user.id
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret)
        });
    }
  }, [user, session]);

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