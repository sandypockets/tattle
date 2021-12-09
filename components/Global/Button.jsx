export default function Button({ type, onClickHandler, disabled=false, children }) {
  return (
    <button
      type={type}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-yellow-400 hover:bg-yellow-500 transition duration-150 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      onClick={onClickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  )
}