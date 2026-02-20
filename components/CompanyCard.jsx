export default function CompanyCard({ company }) {
  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-card-bg rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
    >
      <div className="flex items-center gap-3 mb-2">
        <h3 className="font-serif text-[23px] text-primary">
          {company.name}
        </h3>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </div>
      <p className="text-sm text-muted leading-relaxed">
        {company.description}
      </p>
    </a>
  )
}
