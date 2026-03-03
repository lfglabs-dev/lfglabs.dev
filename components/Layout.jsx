import Navbar from './Navbar'

export default function Layout({ children, footer }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12 flex-1 w-full">
        <main>{children}</main>
      </div>
      {footer}
    </div>
  )
}
