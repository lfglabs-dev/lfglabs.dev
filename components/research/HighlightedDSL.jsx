function highlightLine(line) {
  if (line.trim() === '') return '\u00A0'

  const tokens = []
  let rest = line
  let key = 0

  const keywords =
    /^(\s*)(import|namespace|open|private|def|end|intent_spec|intent|const|predicate|when|otherwise|emit|bind|where)\b/
  const match = rest.match(keywords)
  if (match) {
    tokens.push(match[1])
    tokens.push(
      <span key={key++} className="text-[#8B5CF6]">
        {match[2]}
      </span>
    )
    rest = rest.slice(match[0].length)
  }

  while (rest.length > 0) {
    const strMatch = rest.match(/^"([^"]*)"/)
    if (strMatch) {
      tokens.push(
        <span key={key++} className="text-[#059669]">
          &quot;{strMatch[1]}&quot;
        </span>
      )
      rest = rest.slice(strMatch[0].length)
      continue
    }

    const typeMatch = rest.match(
      /^(: )(uint256|address|uint256\[\]|address\[\]|bool|Int|Nat)\b/
    )
    if (typeMatch) {
      tokens.push(typeMatch[1])
      tokens.push(
        <span key={key++} className="text-[#D97706]">
          {typeMatch[2]}
        </span>
      )
      rest = rest.slice(typeMatch[0].length)
      continue
    }

    const opMatch = rest.match(/^(:=|=>|==|\^)/)
    if (opMatch) {
      tokens.push(
        <span key={key++} className="text-muted">
          {opMatch[1]}
        </span>
      )
      rest = rest.slice(opMatch[0].length)
      continue
    }

    const numMatch = rest.match(/^\b(\d+)\b/)
    if (numMatch) {
      tokens.push(
        <span key={key++} className="text-[#2563EB]">
          {numMatch[1]}
        </span>
      )
      rest = rest.slice(numMatch[0].length)
      continue
    }

    tokens.push(rest[0])
    rest = rest.slice(1)
  }

  return <>{tokens}</>
}

export default function HighlightedDSL({ source }) {
  const lines = source.split('\n')
  return (
    <pre className="bg-[#f8f8f8] border border-gray-200 rounded px-5 py-4 text-sm font-mono leading-relaxed overflow-x-auto text-primary">
      {lines.map((line, i) => (
        <div key={i}>{highlightLine(line)}</div>
      ))}
    </pre>
  )
}
