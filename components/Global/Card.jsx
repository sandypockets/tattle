export default function Card({ children }) {
  return (
    <section className="my-1 2xs:my-3 xs:my-4 sm:my-6 p-3 xs:p-6 sm:p-12 rounded-md sm:rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
      {children}
    </section>
  )
}