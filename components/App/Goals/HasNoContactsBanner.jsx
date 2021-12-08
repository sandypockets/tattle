import Link from "next/link";
import Banner from "../Utils/Banner";

export default function HasNoContactsBanner() {
  return (
    <Banner>
      <p className="h-12">Before you can create a goal, you need to{' '}
        <Link href="/app/contacts">
          <a className="text-yellow-200">
            create a contact
          </a>
        </Link>
      </p>
    </Banner>
  )
}