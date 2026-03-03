import { useState } from 'react'

export default function ContactButton() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@lfglabs.dev')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-accent text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
      >
        Get in Touch
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => {
            setOpen(false)
            setCopied(false)
          }}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-sm mx-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-base font-bold text-heading mb-4">
              How would you like to reach us?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-gray-200 hover:border-accent transition-colors text-left"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent flex-shrink-0"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <div>
                  <p className="text-sm font-bold text-heading">
                    {copied ? 'Email copied!' : 'Email'}
                  </p>
                  <p className="text-xs text-muted">contact@lfglabs.dev</p>
                </div>
              </button>
              <a
                href="https://t.me/fricoben"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-gray-200 hover:border-accent transition-colors text-left"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-accent flex-shrink-0"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                <div>
                  <p className="text-sm font-bold text-heading">Telegram</p>
                  <p className="text-xs text-muted">@fricoben</p>
                </div>
              </a>
            </div>
            <button
              onClick={() => {
                setOpen(false)
                setCopied(false)
              }}
              className="mt-4 w-full text-sm text-muted hover:text-primary transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
