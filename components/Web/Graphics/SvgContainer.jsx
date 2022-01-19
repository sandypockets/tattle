export default function SvgContainer({ children }) {
  return (
    <div className="max-w-sm h-48 sm:w-96 sm:h-96 center flex justify-center">
      {children}
    </div>
  )
}