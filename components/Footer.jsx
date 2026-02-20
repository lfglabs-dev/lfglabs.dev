import Link from 'next/link'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-base font-bold text-heading mb-4">
          Find and follow us over here
        </p>
        <SocialLinks />
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted">
          <span>&copy;{year} LFG Labs</span>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/support"
              className="hover:text-primary transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
