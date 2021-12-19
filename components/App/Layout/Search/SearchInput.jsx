import { SearchIcon } from "@heroicons/react/solid";

export default function SearchInput({ searchText, setSearchText }) {
  return (
    <form className="w-full flex md:ml-0" action="#" method="GET">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
          <SearchIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="search-field"
          className="block h-full w-full bg-gray-50 border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
          placeholder="Search for a goal"
          type="search"
          name="search"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </form>
  )
}