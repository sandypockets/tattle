import Link from "next/link";
import SignUpNow from "./SignUpNow";

export default function SignUpFooter() {
  return (
    <section className="flex flex-col lg:flex-row justify-around bg-gray-100 pb-6 md:pb-16 rounded-lg shadow-md mt-24 lg:mt-0">
      <div className="flex flex-col justify-center px-0 sm:px-6 mx-auto">
        <h3 className="text-xl tracking-tight font-extrabold text-gray-900 sm:text-4xl py-6 lg:py-0 mx-2 mb-2">Start your 14 day free trial today</h3>
        <p className="text-sm lg:text-md max-w-sm md:max-w-lg mx-auto lg:mx-2 mb-2 font-light tracking-wide ">Monthly billing starts after 14 day trial. Cancel without penalty, anytime.</p>
        <div className="mt-12 lg:mt-6 text-lg lg:text-xl tracking-wide hidden lg:block mx-2">
          <p>Still undecided?</p>
          <p className="text-sm lg:text-md font-light">
            Check out our{' '}
            <Link href="faq">
              <a className="text-blue-600">Frequently Asked Questions</a>
            </Link>
            {' '}page.
          </p>
        </div>
      </div>
      <div className="mx-auto lg:pr-2">
        <SignUpNow />
      </div>
      <div className="mt-12 lg:mt-6 text-lg tracking-wide block lg:hidden mx-auto">
        <p>Still undecided?</p>
        <p className="text-sm font-light">
          Check out our{' '}
          <Link href="faq">
            <a className="text-blue-600">Frequently Asked Questions</a>
          </Link>
          {' '}page.
        </p>
      </div>
    </section>
  )
}