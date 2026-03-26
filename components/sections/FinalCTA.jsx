import ContactButton from '../ContactButton'

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 border-t border-gray-100 text-center">
      <h2 className="font-serif text-[32px] sm:text-[42px] text-heading tracking-tight leading-[1.15] mb-3">
        Get <span className="text-accent">a Quote</span>
      </h2>
      <p className="text-lg text-muted mb-6 max-w-md mx-auto">
        We take 4 protocols per quarter. Formal verification demands deep focus.
        We&apos;d rather verify fewer contracts well than many poorly.
      </p>
      <ContactButton />
    </section>
  )
}
