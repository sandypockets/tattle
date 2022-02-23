export default function TextInput({ label, type, onChangeHandler, required=false, value="", useDark=true, placeholder='' }) {
  return (
    <div className="pt-2 px-2 w-full">
      <label htmlFor={type} className={useDark ? "block text-sm font-medium text-gray-700 dark:text-gray-300" : "block text-sm font-medium text-gray-700"}>
        {label}
      </label>
      <div className="mt-1">
        <input
          id={`input-id--${type}--${label}`}
          name={type}
          type={type}
          autoComplete={type}
          required={required}
          className={
            useDark ?
              "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              :
              "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm"
            }
          onChange={onChangeHandler}
          value={value}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}