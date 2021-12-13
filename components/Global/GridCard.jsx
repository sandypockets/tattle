export default function GridCard({ children }) {
  return (
    <section className="p-4 xs:p-5 sm:p-6 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      {children}
    </section>
  )
}