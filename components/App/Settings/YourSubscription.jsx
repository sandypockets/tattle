import { CheckCircleIcon } from "@heroicons/react/solid";

const includedFeatures = [
  'Create up to 100 goals per month',
  'Set completion dates for goals',
  'Add up to 10 contacts',
  'Tattle via voice',
  'Tattle via SMS',
]

export default function YourSubscription({ subscriptionData }) {
  subscriptionData && console.log("subscriptionData: ", subscriptionData)
    return (
      <div className="my-6 max-w-4xl mx-auto rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden lg:flex">
        <div className="flex-1 bg-white dark:bg-gray-800 px-6 py-8 lg:p-12">
          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-300 sm:text-3xl">Subscription</h3>
            <p className="mt-6 text-base text-gray-500 dark:text-gray-300">
              You're currently on Tattle's <strong>monthly</strong> plan, at <strong>${subscriptionData?.invoice?.total / 100} per month.</strong>
            </p>
          <div className="mt-8">
            <div className="flex items-center">
              <h4 className="flex-shrink-0 pr-4 bg-white dark:bg-gray-800 text-sm tracking-wider font-bold uppercase text-yellow-400 dark:text-yellow-300">
                What's included
              </h4>
              <div className="flex-1 border-t-2 border-gray-700" />
            </div>
            <ul role="list" className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-yellow-400 dark:text-yellow-300" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="py-8 px-6 text-center bg-gray-50 dark:bg-gray-900 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
          <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900 dark:text-gray-300">
            <span>${subscriptionData?.invoice?.total / 100} USD</span>
            <span className="ml-3 text-xl font-medium text-gray-500"> / month</span>
          </div>
        </div>
      </div>
    )
}