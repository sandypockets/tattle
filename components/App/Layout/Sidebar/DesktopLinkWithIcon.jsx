import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DesktopLinkWithIcon({ item, currentPage }) {
  return (
    <Link href={item.href}>
      <a
        key={item.href}
        data-cy={`nav-${item.href}-${item.category}`}
        className={classNames(
          item.href === currentPage
            ? 'bg-gray-900 text-yellow-300' : 'text-gray-400 hover:bg-gray-900 hover:text-yellow-300',
          'group rounded-md py-2 px-2 flex items-center text-sm font-medium'
        )}
      >
        <item.icon
          className={classNames(
            item.href === currentPage ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
            'mr-3 flex-shrink-0 h-6 w-6'
          )}
          aria-hidden="true"
        />
        {item.name}
      </a>
    </Link>
  )
}