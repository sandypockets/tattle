import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MobileLinkNoIcon({ item, currentPage }) {
  return (
    <Link href={item.href}>
      <a
        key={item.href}
        className={classNames(
          item.href === currentPage
            ? 'bg-gray-900 text-yellow-400'
            : 'text-gray-500 hover:bg-gray-900 hover:text-yellow-400',
          'group rounded-md py-2 px-2 pl-11 flex items-center text-sm'
        )}
      >
        {item.name}
      </a>
    </Link>
  )
}