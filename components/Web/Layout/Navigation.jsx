import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'

const navItems = [
    {
    name: 'Tattle',
    href: '/',
  },
  {
    name: 'FAQ',
    href: '/faq',
  },
  {
    name: 'Pricing',
    href: '/pricing',
  },
]

export default function Navigation({ currentUrl }) {
  return (
    <nav>
      <Disclosure as="nav" className="bg-white shadow fixed w-screen top-0 z-20">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex justify-between w-full">

                  <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    {navItems.map((item, index) => (
                      <div key={index} className={"hidden sm:ml-6 sm:flex sm:space-x-8"}>
                        <Link href={item.href}>
                          <a
                            className={currentUrl === item.href ? "border-yellow-400 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}
                          >
                            {item.name}
                          </a>
                        </Link>
                      </div>
                    ))}
                  </div>

                  <nav className="mt-4">
                    <button className="bg-yellow-300 hover:bg-yellow-400 rounded-lg h-min py-1 px-2 mr-2">
                      <Link href="/signup">
                        <a
                          className="inline-flex items-center text-sm font-medium pb-1"
                        >
                          Sign up
                        </a>
                      </Link>
                    </button>

                    <button className="bg-yellow-300 hover:bg-yellow-400 rounded-lg h-min py-1 px-2">
                      <Link href="/signin">
                        <a
                          className="inline-flex items-center text-sm font-medium pb-1"
                        >
                          Sign in
                        </a>
                      </Link>
                    </button>
                  </nav>

                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              {navItems.map((item, index) => (
                <div key={index} className="pt-2 pb-4 space-y-1">
                  <Link href={item.href}>
                    <a
                      className={currentUrl === item.href ? "bg-yellow-50 border-yellow-400 text-yellow-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"}
                    >
                      {item.name}
                    </a>
                  </Link>
                </div>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </nav>
  )
}
