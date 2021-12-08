import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { supabase } from "../../../lib/supabaseClient";
import CheckoutForm from "./CheckoutForm";
import getStripeCustomerId from "../../../helpers/checkout/getStripeCustomerId";
const stripePublishableKey = process.env.NEXT_STRIPE_PUBLISHABLE_KEY

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
const stripePromise = loadStripe("pk_test_51IkyECLSQuRsBVHwF7qm2tCexmpVUdG2fMphLozNAwUelsH4aklQqXVOu8HjkJjq0dWcALrjPfnAQerGxlEpQI8000E8OwzIHi");

export default function Checkout({ session }) {
  const [clientSecret, setClientSecret] = useState("");
  const [stripeCustomerId, setStripeCustomerId] = useState('')
  const user = supabase.auth.user()

  useEffect(() => {
    if (user) {
      const userId = user['id']
      getStripeCustomerId(userId, setStripeCustomerId)
    }
  }, [user])

  useEffect(() => {
    if (session && stripeCustomerId) {
      // Create PaymentIntent as soon as the page loads
      fetch("/api/v1/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: session.user,
          stripeCustomerId: stripeCustomerId,
          items: [{price: 'price_1K252ULSQuRsBVHwBmVYETzD'}]
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret)
          console.log(data)
        });
    }
  }, [stripeCustomerId]);

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
          <CheckoutForm options={options} stripeCustomerId={stripeCustomerId} />
        </Elements>
      )}
    </div>
  );
}