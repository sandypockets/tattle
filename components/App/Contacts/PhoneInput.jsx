export default function PhoneInput({ onChangeHandler, value, setContactCountryCode }) {
  return (
    <div className="px-2 my-2">
      <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <label htmlFor="country" className="sr-only">
            Country
          </label>
          <select
            id="country"
            name="country"
            autoComplete="country"
            className="focus:ring-yellow-400 focus:border-yellow-400 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            onChange={(e) => setContactCountryCode(e.target.value)}
          >
            <option>CA</option>
            <option>EU</option>
            <option>US</option>
          </select>
        </div>
        <input
          type="text"
          name="phone-number"
          id="phone-number"
          className="focus:ring-yellow-400 focus:border-yellow-400 block w-full pl-16 sm:text-sm border-gray-300 rounded-md"
          placeholder="+1 (555) 987-6543"
          value={value}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  )
}
