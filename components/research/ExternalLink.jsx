export function ExternalLinkIcon({ className = 'w-[13px] h-[13px]' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`inline ${className} ml-0.5`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export default function ExternalLink({ href, children, className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline underline-offset-3 hover:text-accent transition-colors ${className}`}
    >
      {children}
      <ExternalLinkIcon />
    </a>
  )
}
