import Link from 'next/link'

export default function SearchResults({ searchResults }) {
  return (
    <div className="max-w-4xl border-1 border-black bg-gray-50 shadow-lg rounded-b-lg">
      <ul>
        {searchResults?.map((result, index) => (
          <Link key={index} href={`/app/goals/${result.id}`}>
            <li className="p-6 cursor-pointer hover:bg-gray-200">
              <div className="flex">
                <div className="w-56 truncate">
                  <h3 className="font-semibold">
                    <a>{result.title}</a>
                  </h3>
                </div>
                <p className="w-96 truncate px-8">{result.description}</p>
                <p className="px-12">{result.due_date}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}