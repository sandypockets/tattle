import { Fragment, useState } from 'react'
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/router";
import Link from 'next/link'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  UserIcon,
  HomeIcon,
  CheckIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import DesktopLinkNoIcon from "./Sidebar/DesktopLinkNoIcon";
import DesktopLinkWithIcon from "./Sidebar/DesktopLinkWithIcon";
import MobileLinkWithIcon from "./Sidebar/MobileLinkWithIcon";

const navigation = [
  { name: 'Dashboard', href: '/app', icon: HomeIcon },
  { name: 'Goals', href: '/app/goals', icon: CheckIcon },
  { name: 'Contacts', href: '/app/contacts', icon: UsersIcon },
  { name: 'Profile', href: '/app/profile', icon: UserIcon },
  { name: 'Settings', href: '/app/settings', icon: AdjustmentsIcon }
]
const subNavigation = [
  {name: 'New', category: 'goals', href: '/app/goals/new', parentHref: '/app/goals', icon: AdjustmentsIcon},
  {name: 'Upcoming', category: 'goals', href: '/app/goals/upcoming', parentHref: '/app/goals', icon: AdjustmentsIcon},
  {name: 'Completed', category: 'goals', href: '/app/goals/completed', parentHref: '/app/goals', icon: AdjustmentsIcon},
  {name: 'New', category: 'contacts', href: '/app/contacts/new', parentHref: '/app/contacts', icon: AdjustmentsIcon},
  {name: 'Customize', category: 'settings', href: '/app/settings/customize', parentHref: '/app/settings', icon: AdjustmentsIcon}
]
const userNavigation = [
  { name: 'Your Profile', href: '/app/profile' },
  { name: 'Settings', href: '/app/settings' },
  { name: 'Sign out', href: '/' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const currentPage = router.pathname

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-40 flex md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 px-4 flex items-center text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  Tattle
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <MobileLinkWithIcon key={item.href} item={item} currentPage={currentPage} />
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">{/* Dummy element to force sidebar to shrink to fit close icon */}</div>
          </Dialog>
        </Transition.Root>
        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component */}
          <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto">
            <div className="flex-shrink-0 px-4 flex items-center text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Tattle
            </div>
            <div className="flex-grow mt-5 flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item, index) => (
                  <div key={index}>
                    <DesktopLinkWithIcon item={item} currentPage={currentPage} />
                    {subNavigation.map((subItem, subItemIndex) => {
                      if (subItem.parentHref === item.href && currentPage && currentPage.toString().split('/')[2] === subItem.category) {
                        return (
                          <div key={subItemIndex}>
                            <DesktopLinkNoIcon item={subItem} currentPage={currentPage} />
                          </div>
                        )
                      }
                    })}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="md:pl-64">
          <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
            <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 flex justify-between px-4 md:px-0">
                <div className="flex-1 flex">
                  <form className="w-full flex md:ml-0" action="#" method="GET">
                    <label htmlFor="search-field" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <input
                        id="search-field"
                        className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                        placeholder="Search"
                        type="search"
                        name="search"
                      />
                    </div>
                  </form>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link href={item.href}>
                                <a
                                  onClick={() => {
                                    if (item.name === 'Sign out') {
                                      return supabase.auth.signOut()
                                    }
                                  }}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block py-2 px-4 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <main className="flex-1">
              <div className="py-6">
                <div className="px-4 sm:px-6 md:px-0">
                  <main className="py-4">
                    {children}
                  </main>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
