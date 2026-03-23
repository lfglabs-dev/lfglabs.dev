export default function SectionHeader({ children, subtitle }) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-serif text-[32px] sm:text-[42px] text-heading tracking-tight leading-[1.15]">
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted mt-4 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
