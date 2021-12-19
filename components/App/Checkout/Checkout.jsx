import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { supabase } from "../../../lib/supabaseClient";
import CheckoutForm from "./CheckoutForm";
import CheckoutLoadingState from "./CheckoutLoadingState";
import { getStripeCustomerId } from "../../../helpers/subscriptions";
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// const stripePromise = loadStripe("pk_test_51IkyECLSQuRsBVHwF7qm2tCexmpVUdG2fMphLozNAwUelsH4aklQqXVOu8HjkJjq0dWcALrjPfnAQerGxlEpQI8000E8OwzIHi");
const stripePromise = loadStripe(stripePublishableKey);

export default function Checkout({ session }) {
  const [clientSecret, setClientSecret] = useState("");
  const [stripeCustomerId, setStripeCustomerId] = useState('')
  const [loading, setLoading] = useState(true)
  const user = supabase.auth.user()

  useEffect(() => {
    user && getStripeCustomerId(user['id'], setStripeCustomerId)
  }, [])

  useEffect(() => {
    if (user && stripeCustomerId?.length > 0) {
      // Create PaymentIntent as soon as the page loads
      fetch("/api/v1/create-subscription", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          user: user.id,
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

  useEffect(() => {
    if (clientSecret) {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }, [clientSecret, stripeCustomerId])

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
    }
  };
  const options = {
    clientSecret,
    appearance,
  };

  console.log("DEBUG 3: ", user, stripeCustomerId, loading)

  return (
    <div className="App">
      {loading && (
        <div className="flex justify-center">
          <CheckoutLoadingState />
        </div>
      )}
      <div className={loading ? "hidden" : ""}>
        {clientSecret && stripeCustomerId && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm options={options} stripeCustomerId={stripeCustomerId}/>
          </Elements>
        )}
      </div>
    </div>
  );
}