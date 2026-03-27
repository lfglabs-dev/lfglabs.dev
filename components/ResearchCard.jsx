import Link from 'next/link'

function Tag({ children }) {
  return (
    <span className="text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full flex-shrink-0">
      {children}
    </span>
  )
}

export default function ResearchCard({ item, compact }) {
  if (compact) {
    return (
      <Link
        href={`/research/${item.slug}`}
        className="block bg-card-bg rounded-xl p-5 hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-lg text-primary mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {item.subtitle}
            </p>
          </div>
          <Tag>{item.tag}</Tag>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/research/${item.slug}`}
      className="block rounded-xl p-6 transition-colors duration-200 bg-card-bg hover:bg-gray-100"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-serif text-[23px] text-primary mb-2">
            {item.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {item.subtitle}
          </p>
        </div>
        <Tag>{item.tag}</Tag>
      </div>
    </Link>
  )
}
