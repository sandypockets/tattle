import Link from 'next/link'

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
  { name: 'How it works', href: '/how-it-works' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Login', href: '/signin' },
  { name: 'Sign up', href: '/signup' },
]

export default function Footer() {
  return (
    <footer className="bg-white pt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {navigation.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link href={item.href}>
                <a className="text-base text-gray-500 hover:text-gray-900">
                  {item.name}
                </a>
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">&copy; {new Date().getFullYear()} Tattle, All rights reserved.</p>
      </div>
    </footer>
  )
}
