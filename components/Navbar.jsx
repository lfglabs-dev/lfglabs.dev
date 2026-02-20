import Link from 'next/link'
import { useRouter } from 'next/router'
import OrangeHighlight from './OrangeHighlight'

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
        <Link href="/" className="font-serif text-2xl text-heading">
          LFG Labs
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
        </div>
      </div>
    </nav>
  )
}
