import SectionHeader from '../ui/SectionHeader'
import Quote from '../ui/Quote'

const testimonials = [
  {
    text: 'LFG Labs brought a level of rigor to our smart contract verification that traditional audits simply cannot match. Their formal verification gave us confidence that our code is correct by construction.',
    name: 'Eli Ben-Sasson',
    title: 'Co-Founder & CEO',
    company: 'StarkWare',
    image: '/images/people/eli.jpg',
    href: 'https://x.com/EliBenSasson',
  },
  {
    text: 'Working with LFG Labs on formal verification was a game-changer for how we think about smart contract security. Mathematical proofs are the future of this industry.',
    name: 'Nicolas Bacca',
    title: 'CTO',
    company: 'Ledger',
    image: '/images/people/nicolas-bacca.jpg',
    href: 'https://x.com/AmusementClub',
  },
  {
    text: 'The Verity framework and the team behind it represent exactly the kind of rigorous approach the Ethereum ecosystem needs. Their work on formal verification of Solidity is pushing the entire field forward.',
    name: 'Nicolas Liochon',
    title: 'Researcher',
    company: 'Ethereum Foundation',
    image: '/images/people/nicolas-liochon.jpg',
    href: 'https://x.com/music_music_77',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 border-t border-gray-100">
      <SectionHeader>
        What they say <span className="text-accent">about us</span>
      </SectionHeader>
      <div className="grid gap-4">
        {testimonials.map((t) => (
          <Quote key={t.name} {...t} />
        ))}
      </div>
    </section>
  )
}
