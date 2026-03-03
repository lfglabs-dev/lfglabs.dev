import ContactButton from './ContactButton'

export default function Hero() {
  return (
    <section className="mb-16 pt-4 sm:pt-8 text-center">
      <h1 className="font-serif text-[36px] sm:text-[48px] text-heading tracking-tight mb-8 leading-[1.15]">
        We secure web3 with
        <br />
        <span className="text-accent">mathematical proofs.</span>
      </h1>
      <p className="text-lg text-primary leading-relaxed mb-8 max-w-2xl mx-auto">
        We formally verify that your smart contracts do exactly what
        they&apos;re supposed to using Lean 4 and mathematical proofs that cover
        every possible execution path, not just the ones a human reviewer
        thought to check.
      </p>
      <ContactButton />
    </section>
  )
}
