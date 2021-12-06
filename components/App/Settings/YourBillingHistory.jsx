import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Button from "../../Global/Button";
import Card from "../../Global/Card";
import CardTitle from "../../Global/CardTitle";
import getBillingHistory from "../../../helpers/getBillingHistory";

export default function YourBillingHistory() {
  const [billingHistory, setBillingHistory] = useState()

  useEffect(() => {
    const user = supabase.auth.user()
    getBillingHistory(user.id, setBillingHistory)
  }, [])

  return (
    <Card>
      <CardTitle>Billing history</CardTitle>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Bill type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Bill date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody>
                {billingHistory && billingHistory.map((bill, index) => (
                  <tr key={bill.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bill.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill['subscription_type'].charAt(0).toUpperCase() + bill['subscription_type'].slice(1).split('_').join(' ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(bill['created_at']).toLocaleDateString('en-CA')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${bill['amount_cents'] / 100} USD</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="max-w-min">
                        <Button>
                          View details
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
