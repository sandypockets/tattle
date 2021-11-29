import Button from "../../Global/Button";

export default function ContactsTable({ contacts, setOpen, setSelectedContact }) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow-md overflow-hidden ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created at
                </th>
                <th scope="col" className="relative px-2 py-3">
                  <span className="sr-only">Assign</span>
                </th>
                <th scope="col" className="relative px-2 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody>
              {contacts && contacts.map((contact) => (
                <tr key={contact.id} className='bg-white'>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact['created_at']}</td>
                  <td className="pl-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="max-w-min mx-4">
                      <Button>
                        Assign
                      </Button>
                    </div>
                  </td>
                  <td className="pr-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="max-w-min">
                      <Button onClickHandler={() => {
                        setSelectedContact(contact)
                        setOpen(true)
                      }}>
                        Edit
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
  )
}
