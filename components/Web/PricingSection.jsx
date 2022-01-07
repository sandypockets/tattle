import { CheckCircleIcon } from '@heroicons/react/solid'
import Link from 'next/link'

const includedFeatures = [
  'Create up to 100 goals per month',
  'Set completion dates for goals',
  'Add up to 10 contacts',
  'Tattle via voice',
  'Tattle via SMS',
]

export default function PricingSection() {
  return (
    <div>
      <div className="mt-12 bg-white pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
              <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                <h3 className="text-2xl font-extrabold text-gray-900 sm:text-2xl">Monthly</h3>
                <p className="mt-6 text-base text-gray-500">
                  Tattle offers a monthly subscription, which you can cancel or start back up anytime.

                </p>
                <div className="mt-8">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-bold uppercase text-yellow-300">
                      What's included
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200" />
                  </div>
                  <ul role="list" className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                    {includedFeatures.map((feature) => (
                      <li key={feature} className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0">
                          <CheckCircleIcon className="h-5 w-5 text-yellow-300" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                <p className="text-lg leading-6 font-medium text-gray-900">Subscription</p>
                <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
                  <span>$3 USD</span>
                  <span className="ml-3 text-xl font-medium text-gray-500"> / month</span>
                </div>
                <p className="mt-4 text-sm">
                  <a href="#" className="font-medium text-gray-500 underline">
                    Learn more about Tattle
                  </a>
                </p>
                <div className="mt-6">
                  <div className="rounded-md shadow">
                    <Link href="/signup">
                      <a
                        className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400"
                      >
                        Subscribe
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
