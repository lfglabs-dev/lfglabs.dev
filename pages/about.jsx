import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import PageLayout from '../components/PageLayout'
import SectionHeader from '../components/ui/SectionHeader'
import FinalCTA from '../components/sections/FinalCTA'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | LFG Labs</title>
      </Head>
      <PageLayout>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <SectionHeader>
            Why we chose <span className="text-accent">formal.</span>
          </SectionHeader>

          <div className="text-center mb-10">
            <Image
              src="/images/founders.png"
              alt="Ben and Thomas, Founders of LFG Labs"
              width={480}
              height={320}
              className="rounded-xl mx-auto"
            />
            <p className="text-sm text-muted mt-4">
              Ben &amp; Thomas, co-founders
            </p>
          </div>

          <div className="space-y-6 text-base text-primary leading-relaxed">
            <p>
              We&apos;re Thomas and Ben. We met studying engineering in France,
              where we got to work with researchers on formal verification.
              Proving software correct with math felt powerful, but the tools
              weren&apos;t there yet.
            </p>

            <p>
              We got into crypto, shipped nine products on Starknet (starting
              with{' '}
              <Link href="/projects" className="text-accent font-bold hover:underline">
                Starknet ID
              </Link>
              , 500K+ domains, 239K paying users), and got audited many times
              by top firms. Always clean. But the process never sat right with
              us: slow, expensive, and at the end of the day just someone&apos;s
              opinion.
            </p>

            <p>
              Now AI is changing everything. What used to be impossibly hard is
              becoming practical: full formal verification of smart contracts.
              Not checking a few test cases, actually proving correctness for
              every possible input.
            </p>

            <p>
              So that&apos;s what we&apos;re building. Check out{' '}
              <a
                href="https://github.com/lfglabs-dev/verity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-bold hover:underline"
              >
                Verity
              </a>
              , our formally verified smart contract compiler in Lean. We&apos;re
              betting that AI agents will make full formal verification
              practical.
            </p>
          </div>
        </div>

        <FinalCTA />
      </PageLayout>
    </>
  )
}
