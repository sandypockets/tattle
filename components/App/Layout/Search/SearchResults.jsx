import Link from 'next/link'

export default function SearchResults({ searchResults }) {
  return (
    <div className="max-w-4xl xl:max-w-4xl border-1 border-black bg-gray-50 dark:bg-gray-600 shadow-lg rounded-b-lg">
      <ul>
        {searchResults?.goalData?.length > 0 && <h2 className="px-6 pt-3 text-xl font-bold text-gray-400 dark:text-gray-200">Goals</h2>}
        {searchResults?.goalData?.map((result, index) => (
          <Link key={index} href={`/app/goals/${result.id}`}>
            <li className="p-6 cursor-pointer hover:bg-gray-200">
              <div className="flex">
                <div className="w-36 xs:w-56 truncate">
                  <h3 className="font-semibold">
                    <a className="truncate dark:text-gray-300">{result.title}</a>
                  </h3>
                </div>
                <p className="hidden xs:block md:w-56 lg:w-64 xl:w-96 truncate px-8 dark:text-gray-300">{result.description}</p>
                <p className="px-12 hidden lg:block dark:text-gray-300">{result.due_date}</p>
              </div>
            </li>
          </Link>
        ))}
        {searchResults?.contactData?.length > 0 && <h2 className="px-6 pt-3 text-xl font-bold text-gray-400 dark:text-gray-200">Contacts</h2>}
        {searchResults?.contactData?.map((result, index) => (
          <Link key={index} href={`/app/contacts/${result.id}`}>
            <li className="p-6 cursor-pointer hover:bg-gray-200">
              <div className="flex">
                <div className="w-56 truncate">
                  <h3 className="font-semibold dark:text-gray-300">
                    <a>{result.name}</a>
                  </h3>
                </div>
                <p className="hidden xs:block md:w-56 lg:w-64 xl:w-96 truncate px-8 dark:text-gray-300">{result.phone}</p>
                <p className="px-12 hidden lg:block dark:text-gray-300">{new Date(result.created_at).toLocaleDateString('en-UK')}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}