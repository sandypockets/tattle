export default function CardTitle({ children, dataCy }) {
  return (
    <h2 data-cy={dataCy} className="cardTitle text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-3xl mb-4 sm:mb-6">{children}</h2>
  )
}