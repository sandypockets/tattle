import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DesktopLinkWithIcon({ item, currentPage }) {
  return (
    <Link href={item.href}>
      <a
        key={item.href}
        className={classNames(
          item.href === currentPage ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
          'group rounded-md py-2 px-2 flex items-center text-sm font-medium'
        )}
      >
        <item.icon
          className={classNames(
            item.href === currentPage ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
            'mr-3 flex-shrink-0 h-6 w-6'
          )}
          aria-hidden="true"
        />
        {item.name}
      </a>
    </Link>
  )
}