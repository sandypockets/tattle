export default function GridCard({ children }) {
  return (
    <article className="p-4 xs:p-5 sm:p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
      {children}
    </article>
  )
}