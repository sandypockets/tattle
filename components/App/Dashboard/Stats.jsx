export default function Stats({ statProps }) {
  const {
    statOne, statOneText,
    statTwo, statTwoText,
    statThree, statThreeText,
    statFour, statFourText
  } = statProps
  return (
    <div>
      <div className="sm:mt-10 pb-12 sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2" />
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-lg bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 dark:shadow-sm xs:grid xs:grid-cols-2 md:grid-cols-4">

                <div className="flex flex-col border-b border-gray-100 dark:border-gray-700 p-6 text-center sm:border-0 sm:border-r xs:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500 dark:text-gray-200">{statOneText}</dt>
                  <dd className="order-1 text-5xl font-extrabold text-yellow-300 dark:text-yellow-300">{statOne}</dd>
                </div>

                <div className="flex flex-col border-b border-gray-100 dark:border-gray-700 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500 dark:text-gray-200">{statFourText}</dt>
                  <dd className="order-1 text-5xl font-extrabold text-yellow-300 dark:text-yellow-300">{statFour}</dd>
                </div>

                <div className="flex flex-col border-t border-b border-gray-100 dark:border-gray-700 p-6 text-center sm:border-0 sm:border-l sm:border-r xs:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500 dark:text-gray-200">{statTwoText}</dt>
                  <dd className="order-1 text-5xl font-extrabold text-yellow-300 dark:text-yellow-300">{statTwo}</dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 dark:border-gray-700 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500 dark:text-gray-200">{statThreeText}</dt>
                  <dd className="order-1 text-5xl font-extrabold text-yellow-300 dark:text-yellow-300">{statThree}</dd>
                </div>

              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
