export default function Card({ children }) {
  return (
    <section className="my-4 sm:my-8 p-6 sm:p-12 rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
      {children}
    </section>
  )
}