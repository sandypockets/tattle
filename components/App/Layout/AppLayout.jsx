import { Fragment, useEffect, useState } from 'react'
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
  AdjustmentsIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/outline'
import DesktopLinkNoIcon from "./Sidebar/DesktopLinkNoIcon";
import DesktopLinkWithIcon from "./Sidebar/DesktopLinkWithIcon";
import MobileLinkWithIcon from "./Sidebar/MobileLinkWithIcon";
import MobileLinkNoIcon from "./Sidebar/MobileLinkNoIcon";
import AppLoadingState from "../Utils/AppLoadingState";
import Search from "./Search/Search";
import Toggle from "./Toggle";
import LoadingWheelWrapper from "../../Global/Loading/LoadingWheelWrapper";
import LoadingWheel from "../../Global/Loading/LoadingWheel";

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
  {name: 'Customize', category: 'settings', href: '/app/settings/customize', parentHref: '/app/settings', icon: AdjustmentsIcon},
  {name: 'Contact', category: 'settings', href: '/app/settings/contact', parentHref: '/app/settings', icon: AdjustmentsIcon}
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  // State used to manage 'main' behaviour while search results are open. Not currently in use
  const [searchIsOpen, setSearchIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(Boolean)

  const router = useRouter()
  const currentPage = router.pathname
  const user = supabase.auth.user()

  const createdAtUnix = new Date(user?.created_at).getTime()
  const currentTImeUnix = new Date().getTime()
  const trialPeriod = 1219000000

  const userNavigation = [
    { name: 'Dashboard', href: '/app/' },
    { name: 'Profile', href: '/app/profile' },
    { name: 'Settings', href: '/app/settings' },
    { name: 'Submit Feedback', href: '/app/settings/contact' },
    { name: 'Sign out', href: '/' },
    { name:
        <div className="flex mx-auto">
          {!darkMode &&
            <>
              <div className="h-6 w-6">
                <MoonIcon/>
              </div>
              <a className="pl-1">Dark theme</a>
            </>}
          {darkMode &&
            <>
              <div className="h-6 w-6">
                <SunIcon/>
              </div>
              <a className="pl-1">Light theme</a>
            </>}
        </div>,
      href: '#theme' },
  ]

  useEffect(() => {
    if (!user) {
      router.push('/signin')
    } else {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
    }
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      localStorage.theme = 'dark'
      setDarkMode(true)
    } else {
      localStorage.theme = 'light'
      setDarkMode(false)
    }
  }

  if (!user && loading) {
    return (
      <LoadingWheelWrapper>
        <LoadingWheel />
      </LoadingWheelWrapper>
    )
  } else {
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
                <div className="relative max-w-xs w-full bg-black pt-5 pb-4 flex-1 flex flex-col">
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
                  <div className="flex-shrink-0 px-4 flex items-center text-2xl font-extrabold text-yellow-300 sm:text-3xl">
                    Tattle
                  </div>
                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <div key={item.href}>
                          <MobileLinkWithIcon item={item} currentPage={currentPage} />
                          {subNavigation.map((subItem, subItemIndex) => {
                            if (subItem.parentHref === item.href && currentPage && currentPage.toString().split('/')[2] === subItem.category) {
                              return (
                                <div key={subItemIndex}>
                                  <MobileLinkNoIcon item={subItem} currentPage={currentPage} />
                                </div>
                              )
                            }
                          })}
                        </div>
                      ))}
                      <div className="flex mx-auto">
                        {!darkMode &&
                          <button
                            className="flex"
                            onClick={() => toggleTheme()}>
                            <div className="h-6 w-6 text-gray-400">
                              <MoonIcon/>
                            </div>
                            <a className="pl-1 text-gray-400">Dark theme</a>
                          </button>}
                        {darkMode &&
                          <button
                            className="flex"
                            onClick={() => toggleTheme()}>
                            <div className="h-6 w-6 text-gray-400">
                              <SunIcon/>
                            </div>
                            <a className="pl-1 text-gray-400">Light theme</a>
                          </button>}
                      </div>
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
            <div className="border-r border-gray-200 dark:border-r-0 pt-5 flex flex-col flex-grow bg-black overflow-y-auto">
              <div className="flex-shrink-0 px-4 flex items-center text-2xl font-extrabold text-yellow-300 sm:text-3xl">
                Tattle
              </div>
              <div className="flex-grow mt-5 flex flex-col">
                <nav className="flex-1 px-2 pb-4 space-y-1">
                  {navigation.map((item) => (
                    <div key={item.href}>
                      <DesktopLinkWithIcon item={item} currentPage={currentPage} />
                      {subNavigation.map((subItem) => {
                        if (subItem.parentHref === item.href && currentPage && currentPage.toString().split('/')[2] === subItem.category) {
                          return (
                            <div key={subItem.href}>
                              <DesktopLinkNoIcon item={subItem} currentPage={currentPage} />
                            </div>
                          )
                        }
                      })}
                    </div>
                  ))}
                </nav>
              </div>
              <nav className={createdAtUnix + trialPeriod > currentTImeUnix ? "flex justify-between mx-6 mb-14" : "flex justify-between mx-6 mb-6"}>
                <p className="text-gray-300 dark:text-white align-middle">Light / Dark theme</p>
                <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
              </nav>
            </div>
          </div>

          <div className="md:pl-64 bg-gray-50 dark:bg-black">
            <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
              <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-gray-50 dark:bg-black border-b border-gray-200 flex">
                <button
                  type="button"
                  className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400 md:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex-1 flex justify-between px-4 md:px-0">
                  <div className="flex-1 flex w-full">
                    <Search setSearchIsOpen={setSearchIsOpen} />
                  </div>
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1534312527009-56c7016453e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGFic3RyYWN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
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
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-600 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link href={item.href}>
                                  <a
                                    onClick={() => {
                                      if (item.name === 'Sign out') {
                                        return supabase.auth.signOut()
                                      }
                                      if (item.href === '#theme') {
                                        return toggleTheme()
                                      }
                                    }}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block py-2 px-4 text-sm text-gray-700 tracking-wide font-semibold dark:text-gray-200 dark:hover:text-black dark:hover:bg-yellow-500 dark:hover:rounded-md'
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
                  <section
                    className={createdAtUnix + trialPeriod > currentTImeUnix ? "p-3 xs:p-4 sm:py-2 sm:px-6 md:px-0 dark:text-gray-200 min-h-screen mb-14" : "p-3 xs:p-4 sm:py-2 sm:px-6 md:px-0 dark:text-gray-200 min-h-screen"}>
                    {loading && <AppLoadingState />}
                    {!loading && children}
                  </section>
                </div>
              </main>
            </div>
          </div>
        </div>
      </>
    )
  }
}
