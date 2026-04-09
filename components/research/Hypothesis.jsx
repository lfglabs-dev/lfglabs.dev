export default function Hypothesis({
  name,
  constraint,
  source,
  children,
  border = true
}) {
  return (
    <li
      className={`list-none ${border ? 'border-b border-gray-200/50' : ''}`}
    >
      <details className="group/hyp">
        <summary className="px-5 py-3 cursor-pointer select-none list-none flex items-center gap-3 [&::-webkit-details-marker]:hidden">
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 text-muted/50 transition-transform group-open/hyp:rotate-90 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
          <code className="font-mono text-[12px] font-medium">{name}</code>
          <span className="text-muted text-[13px]">{constraint}</span>
        </summary>
        <div className="px-5 pb-3 pl-12 text-[13px] text-muted leading-relaxed">
          <p className="mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted/60">
              {source}
            </span>
          </p>
          <p>{children}</p>
        </div>
      </details>
    </li>
  )
}
