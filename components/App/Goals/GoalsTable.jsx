const fakeData = [
  { title: 'Learn to cook', description: 'Eating too much pizza', milestones: 'Cooking enjoyable meals 6 nights per week.', dueDate: 'February 1st', tattleContact: 'Dwight' },
  { title: 'Start a business', description: 'Increase my income', milestones: 'Launch online store', dueDate: 'March 12th', tattleContact: 'Michael' },
]

// Debugging - Adjust prop to use real data
export default function GoalsTable({ goals=fakeData }) {
  return (
    <div className="flex flex-col my-6 shadow-sm ring-1 ring-black rounded-md ring-opacity-5">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
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
                  Is complete when
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Due date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tattle contact
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody>
              {goals.map((goal, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{goal.title}</td>
                  <div className="w-52">
                    <td className="px-4 py-4 whitespace-pre-line text-sm text-gray-500">{goal.milestones}</td>
                  </div>
                  <td className="px-4 py-4 whitespace-pre-line text-sm text-gray-500">{goal.description}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{goal.dueDate}</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{goal.tattleContact}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-yellow-500 hover:text-yellow-600">
                      Edit
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
  )
}
