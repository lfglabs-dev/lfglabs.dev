import { useState } from 'react'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 text-muted/50 hover:text-muted cursor-pointer"
      title="Copy to clipboard"
    >
      <span className="relative block w-4 h-4">
        <svg
          viewBox="0 0 24 24"
          className={`absolute inset-0 w-4 h-4 transition-all duration-200 ${copied ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className={`absolute inset-0 w-4 h-4 text-accent transition-all duration-200 ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    </button>
  )
}

export default function CodeBlock({ children }) {
  return (
    <div className="relative">
      <pre className="bg-[#f8f8f8] border border-gray-200 rounded px-5 py-4 pr-12 text-sm font-mono leading-relaxed overflow-x-auto text-primary">
        {children}
      </pre>
      <CopyButton text={children} />
    </div>
  )
}
