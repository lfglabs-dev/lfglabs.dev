import SectionHeader from '../ui/SectionHeader'
import Accordion from '../ui/Accordion'

const faqs = [
  {
    question: 'How is formal verification different from an audit?',
    answer:
      'An audit is a human reviewer checking code for known vulnerability patterns. They sample inputs and give opinions. Formal verification produces a mathematical proof that your contract behaves correctly across every possible input, every edge case, every execution path. It\u2019s the difference between spot-checking and certainty.',
  },
  {
    question: 'What is Lean 4?',
    answer:
      'Lean 4 is a theorem prover and programming language developed at Microsoft Research. It lets us write mathematical specifications of your contract\u2019s behavior and then prove those specifications hold. The proofs are machine-checkable, so anyone can independently verify them without trusting us.',
  },
  {
    question: 'Do we still need an audit?',
    answer:
      'Formal verification gives stronger guarantees on code correctness, but it won\u2019t catch access control misconfigurations or economic design flaws. In that sense, an audit can be complementary. That said, having formal verification drastically reduces the scope of any audit you\u2019d need.',
  },
  {
    question: 'How long does it take?',
    answer:
      'It depends on the complexity and scope of your contracts. Get in touch and we\u2019ll assess the job and give you a clear timeline.',
  },
  {
    question: 'What happens when our code changes?',
    answer:
      'Every engagement includes 3 months of verification maintenance. If you ship a contract change during that period, we re-verify equivalence at no extra cost. You can extend to 12 months for longer coverage.',
  },
  {
    question: 'What if you find a bug during verification?',
    answer:
      'It happens, and that\u2019s the point. If we can\u2019t prove a property holds, it means either the spec or the code has a gap. We work with your team to identify and fix it before it reaches production.',
  },
  {
    question: 'What chains do you support?',
    answer:
      'We verify Solidity contracts targeting the EVM. This covers Ethereum mainnet, L2s (Arbitrum, Optimism, Base), and any EVM-compatible chain.',
  },
]

export default function FAQ() {
  return (
    <section className="py-20 sm:py-28 border-t border-gray-100">
      <SectionHeader>
        Frequently asked <span className="text-accent">questions</span>
      </SectionHeader>
      <div className="max-w-xl mx-auto">
        <Accordion items={faqs} />
      </div>
    </section>
  )
}
