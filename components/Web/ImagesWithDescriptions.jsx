import { InboxIcon, SparklesIcon } from '@heroicons/react/outline'

export default function ImagesWithDescriptions() {
  return (
    <div className="bg-white pt-16 pb-32 overflow-hidden">
      <div className="lg:pl-16">
        <div className="lg:mx-auto lg:max-w-none lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto lg:py-16 lg:max-w-4xl lg:mx-0 lg:mt-16 lg:px-0 lg:pl-10">
            <div>
              <div>
                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-yellow-400">
                  <InboxIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  <span>Low effort.{' '}</span>
                  <span className="block">High accountability.</span>
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Add a contact, set a goal. If you don't mark the goal as completed before the due date, we'll send a voice or SMS message to your specified contact, and tattle on you.
                </p>
                <div className="mt-6">
                  <a
                    href="#"
                    className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-400 hover:bg-yellow-500"
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 w-full lg:w-320">
            <div className="static flex justify-center lg:px-0 lg:m-0 lg:relative">
              <img
                className="static w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl rounded-xl lg:absolute lg:left-0 transition ease-in-out delay-150 duration-700 lg:hover:-translate-x-32"
                src="/goals-screenshot.png"
                alt="Index page interface"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24 lg:mt-48">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="z-10 px-4 max-w-xl mx-auto lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:mt-12 lg:col-start-2">
            <div>
              <div>
                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-yellow-400">
                  <SparklesIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-6 md:mr-12">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Eat your own dog food, they say.
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Tattle might sound like a silly concept, but it's an effective way to stay accountable.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  We built Tattle to help manage our own goals, in a fun, outside the box sort of way. We hope it's as helpful for you as it has been for us.
                </p>
                <div className="mt-6">
                  <a
                    href="#"
                    className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-400 hover:bg-yellow-500"
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:block mt-12 sm:mt-16 w-full lg:w-320">
            <div className="lg:px-0 lg:m-0 static flex justify-center lg:block">
              <img
                className="static w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl rounded-xl lg:absolute md:right-72 lg:right-150 xl:right-200 transition ease-in-out delay-150 duration-700 lg:hover:translate-x-10 xl:hover:translate-x-32"
                src="/goals-screenshot.png"
                alt="Index page interface"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
