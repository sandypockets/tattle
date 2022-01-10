export default function PhoneInput({ onChangeHandler, value, setContactCountryCode, error }) {
  return (
    <div className="px-2 my-2">
      <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Phone Number
      </label>
      <div className="mt-1 flex relative rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-white text-sm">
          +1
        </span>
        <input
          type="text"
          name="phone-number"
          id="phone-number"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
          placeholder="555-987-6543"
          value={value}
          onChange={onChangeHandler}
        />
      </div>
      {error && <span className="text-red-500">Please enter a valid phone number</span>}
    </div>
  )
}
