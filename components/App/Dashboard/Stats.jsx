export default function Stats({ statProps }) {
  const {
    statOne, statOneText,
    statTwo, statTwoText,
    statThree, statThreeText
  } = statProps

  console.log("STAT THREE: ", statThree)
  return (
    <div>
      <div className="mt-10 pb-12 sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{statOneText}</dt>
                  <dd className="order-1 text-5xl font-extrabold text-yellow-400">{statOne}</dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{statTwoText}</dt>
                  <dd className="order-1 text-5xl font-extrabold text-yellow-400">{statTwo}</dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{statThreeText}</dt>
                  <dd className="order-1 text-5xl font-extrabold text-yellow-400">{statThree}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}