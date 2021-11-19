export default function Button({ type, onClickHandler, children }) {
  return (
    <button
      type={type}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      onClick={onClickHandler}
    >
      {children}
    </button>
  )
}