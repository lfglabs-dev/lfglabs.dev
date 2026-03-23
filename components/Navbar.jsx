import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import OrangeHighlight from './OrangeHighlight'
import ContactButton from './ContactButton'

function NavLink({ href, active, children }) {
  if (active) {
    return (
      <Link href={href} className="text-base font-bold text-heading">
        <OrangeHighlight>{children}</OrangeHighlight>
      </Link>
    )
  }
  return (
    <Link
      href={href}
      className="text-base font-bold text-heading hover:text-accent transition-colors"
    >
      {children}
    </Link>
  )
}

export default function Navbar() {
  const router = useRouter()

  return (
    <nav className="w-full bg-white py-5 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/lfg_logo.webp"
            alt="LFG Labs"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
        <div className="flex items-center gap-8">
          <NavLink
            href="/projects"
            active={router.pathname.startsWith('/projects')}
          >
            Projects
          </NavLink>
          <NavLink href="/about" active={router.pathname === '/about'}>
            About
          </NavLink>
          <span className="hidden sm:inline-flex">
            <ContactButton />
          </span>
        </div>
      </div>
    </nav>
  )
}
