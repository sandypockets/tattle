import CardTitle from "../../Global/CardTitle";
import Card from "../../Global/Card";

const bills = [
  { id: '1', title: 'Tattle Monthly', billDate: 'September 1, 2021', amount: '$3 USD' },
  { id: '2', title: 'Tattle Monthly', billDate: 'October 1, 2021', amount: '$3 USD' },
  { id: '23', title: 'Tattle Monthly', billDate: 'November 1, 2021', amount: '$3 USD' },
  { id: '32', title: 'Tattle Monthly', billDate: 'December 1, 2021', amount: '$3 USD' },
  { id: '45', title: 'Tattle Monthly', billDate: 'January 1, 2022', amount: '$3 USD' },
]

export default function YourBillingHistory() {
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
                  Title
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
              {bills.map((bill, index) => (
                <tr key={bill.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bill.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.billDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                      View details
                    </a>
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
