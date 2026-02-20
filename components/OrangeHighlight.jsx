export default function OrangeHighlight({ children }) {
  return (
    <span className="relative inline-block">
      <span
        className="absolute bottom-1 left-[-4px] right-[-4px] h-3 rounded-sm"
        style={{ backgroundColor: 'rgba(45, 212, 191, 0.3)', zIndex: 0 }}
      />
      <span className="relative" style={{ zIndex: 1 }}>
        {children}
      </span>
    </span>
  )
}
