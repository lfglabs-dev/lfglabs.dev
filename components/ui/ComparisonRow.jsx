export default function ComparisonRow({ audit, proof }) {
  return (
    <div className="grid grid-cols-2 gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-2">
        <span className="text-muted mt-0.5 flex-shrink-0">&#x2715;</span>
        <span className="text-base text-primary">{audit}</span>
      </div>
      <div className="flex items-start gap-2">
        <span className="text-accent mt-0.5 flex-shrink-0">&#x2713;</span>
        <span className="text-base text-primary">{proof}</span>
      </div>
    </div>
  )
}
