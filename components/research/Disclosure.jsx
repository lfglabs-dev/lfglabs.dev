export default function Disclosure({
  title,
  children,
  className = '',
  defaultOpen = false
}) {
  return (
    <details
      open={defaultOpen || undefined}
      className={`border border-gray-200 rounded text-sm leading-relaxed group/disc ${className}`}
    >
      <summary className="px-6 py-4 font-medium cursor-pointer select-none list-none flex items-center justify-between [&::-webkit-details-marker]:hidden text-primary">
        {title}
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-muted transition-transform group-open/disc:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <div className="px-6 pb-5">{children}</div>
    </details>
  )
}
