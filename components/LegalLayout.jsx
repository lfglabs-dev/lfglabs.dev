import Link from 'next/link'
import Navbar from './Navbar'
import Footer from './Footer'

export default function LegalLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="max-w-[680px] mx-auto px-6 py-12 flex-1">
        <nav className="mb-8">
          <Link
            href="/"
            className="text-sm text-muted hover:text-primary transition-colors"
          >
            &larr; Back to LFG Labs
          </Link>
        </nav>
        <article className="prose prose-gray max-w-none prose-headings:tracking-tight prose-headings:text-heading prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
          {children}
        </article>
      </div>
      <Footer />
    </div>
  )
}
