import Navbar from './Navbar'
import HomeSidebar from './HomeSidebar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-16">
          <aside className="lg:w-[280px] lg:flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              <HomeSidebar />
            </div>
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
