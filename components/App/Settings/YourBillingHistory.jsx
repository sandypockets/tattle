import Button from "../../Global/Button";
import Card from "../../Global/Card";
import CardTitle from "../../Global/CardTitle";

export default function YourBillingHistory({ billingHistory }) {
  console.log("billingHistory", billingHistory)


  function sortByDateDescending() {
    for (const item in billingHistory) {
      const dateString = billingHistory[item]['created_at']
      // billingHistory[item]['created_at'] = new Date(dateString).getTime()
      console.log("lkj", billingHistory[item]['created_at'])
    }
    return billingHistory.sort(
      function(a, b) {
        if (a['created_at'] > b['created_at']) {
          return -1
        } else if (a['created_at'] < b['created_at']) {
          return 1
        }
        if (a['id'] > b['id']) {
          return -1
        } else if (a['id'] < b['id']) {
          return 1
        }
      }
    ).reverse()
  }

  if (billingHistory && Array.isArray(billingHistory)) {
    return sortByDateDescending()
  }
  if (!Array.isArray(billingHistory)) {
    billingHistory = [billingHistory].flat()
  }

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
                        <a target="_blank" href={bill['stripe_receipt_url']}>
                          View details
                        </a>
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
