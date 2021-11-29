import Button from '../../Global/Button'
import { useRouter } from "next/router";

export default function GoalsTable({ goals, setSelectedGoal, setOpen }) {
  const router = useRouter()

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
                  <span className="sr-only">View</span>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody>
              {goals.map((goal, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="w-36 px-4 py-4 whitespace-pre-line text-sm font-medium text-gray-900">{goal.title}</td>
                  <td className="w-48 px-4 py-4 whitespace-pre-line text-sm text-gray-500">{goal.outcome}</td>
                  <td className="w-80 px-4 py-4 whitespace-pre-line text-sm text-gray-500">{goal.description}</td>
                  <td className="px-4 py-4 whitespace-pre-line text-sm text-gray-500">{goal['due_date']}</td>
                  <td className="w-24 px-8 py-4 whitespace-pre-line text-sm text-gray-500">Tattle contact Id: {goal['contact_id']}</td>
                  <td className="px-2 py-4 whitespace-pre-line text-right text-sm font-medium">
                    <Button onClickHandler={() => {
                      setSelectedGoal(goal)
                      router.push({
                        pathname: '/app/goals/[id]',
                        query: { id: goal.id },
                      })
                    }}>
                      View
                    </Button>
                  </td>
                  <td className="pr-4 py-4 whitespace-pre-line text-right text-sm font-medium">
                    <Button onClickHandler={() => {
                      setSelectedGoal(goal)
                      setOpen(true)
                      console.log("GOAL", goal)
                    }}>
                      Edit
                    </Button>
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
