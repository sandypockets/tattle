import Link from 'next/link'

export default function HeroSection() {
  return (
    <div>
      <main className="lg:relative bg-white">
        <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl">
              <div>
                <span className="block inline">Achieve your</span>{' '}
                <span className="block underline decoration-yellow-300 inline">goals</span><span>.</span>
              </div>
              <div>
                <span className="block inline">Or we'll</span>{' '}
                <span className="block underline decoration-yellow-300 inline">tattle</span>{' '}
                <span className="block inline">on you.</span>
              </div>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              If you don't achieve your goal, we'll send an SMS message to your mom to let her know.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link href="/signup">
                  <a
                    id="landing-sign-up"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 md:py-4 md:text-lg md:px-10"
                  >
                    Sign up
                  </a>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/#how-it-works">
                  <a
                    id="landing-learn-more"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 md:py-4 md:text-lg md:px-10"
                  >
                    Learn more
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1564510714747-69c3bc1fab41?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
            alt=""
          />
        </div>
      </main>
    </div>
  )
}