export default function PhoneInput({ onChangeHandler, value, setContactCountryCode }) {
  return (
    <div className="px-2 my-2">
      <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Phone Number
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name="phone-number"
          id="phone-number"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
          placeholder="+1 (555) 987-6543"
          value={value}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  )
}
