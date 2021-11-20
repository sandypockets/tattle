export default function Card({ children }) {
  return (
    <section className="my-4 p-12 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
      {children}
    </section>
  )
}