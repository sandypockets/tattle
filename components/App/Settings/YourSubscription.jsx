import { CheckCircleIcon } from "@heroicons/react/solid";
import {useEffect, useState} from "react";
import { supabase } from "../../../lib/supabaseClient";
import getSubscriptionData from "../../../helpers/getSubscriptionData";

const includedFeatures = [
  'Create up to 100 goals per month',
  'Set completion dates for goals',
  'Add up to 10 contacts',
  'Tattle via voice',
  'Tattle via SMS',
]

export default function YourSubscription() {
  const [subscriptionData, setSubscriptionData] = useState()

  useEffect(() => {
    const user = supabase.auth.user()
    getSubscriptionData(user.id, setSubscriptionData)
  }, [])

  subscriptionData && console.log(subscriptionData)


  return (
    <div className="my-6 max-w-lg mx-auto rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden lg:max-w-none lg:flex">
      <div className="flex-1 bg-white px-6 py-8 lg:p-12">
        <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Subscription</h3>
      {subscriptionData && (
        <p className="mt-6 text-base text-gray-500">
          You're currently on Tattle's <strong>{subscriptionData['plan_billing_frequency']}</strong> plan, at <strong>${subscriptionData['plan_amount_cents'] / 1000} {subscriptionData['plan_billing_frequency'] === 'monthly' ? 'per month' : 'annually'}.</strong>
        </p>
      )}
        <div className="mt-8">
          <div className="flex items-center">
            <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-bold uppercase text-yellow-400">
              What's included
            </h4>
            <div className="flex-1 border-t-2 border-gray-200" />
          </div>
          <ul role="list" className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
            {includedFeatures.map((feature) => (
              <li key={feature} className="flex items-start lg:col-span-1">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <p className="ml-3 text-sm text-gray-700">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
        {subscriptionData && (
          <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
            <span>${subscriptionData['plan_amount_cents'] / 1000} USD</span>
            <span className="ml-3 text-xl font-medium text-gray-500"> / {subscriptionData['plan_billing_frequency'] === 'monthly' ? 'month' : 'year'}</span>
          </div>
        )}



      </div>
    </div>
  )
}