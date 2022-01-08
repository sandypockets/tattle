import Link from "next/link";
import SignUpNow from "./SignUpNow";

export default function SignUpFooter() {
  return (
    <section className="flex justify-around bg-gray-100 pb-16 rounded-lg shadow-md">
      <div className="flex flex-col justify-center">
        <h3 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-4xl">Start your 14 day free trial today</h3>
        <p className="mt-6 text-lg font-light">
          Still have questions? Check out our{' '}
          <Link href="faq">
            <a className="text-blue-600">Frequently Asked Questions page</a>
          </Link>
          .
        </p>
      </div>
      <SignUpNow />
    </section>
  )
}