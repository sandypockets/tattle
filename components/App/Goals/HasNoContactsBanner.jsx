import Link from "next/link";
import Banner from "../Utils/Banner";

export default function HasNoContactsBanner() {
  return (
    <Banner>
      <p className="">
        <div>
          <span className="mr-1">Before you can create a goal, you need to{' '}</span>
          <button className="bg-gray-900 py-1 px-2 rounded-lg shadow-lg">
            <Link href="/app/contacts">
              <a className="text-yellow-300 hover:text-white font-light">
                create a contact
              </a>
            </Link>
          </button>
        </div>
      </p>
    </Banner>
  )
}