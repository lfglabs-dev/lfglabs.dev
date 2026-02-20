import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import PageLayout from '../components/PageLayout'
import OrangeHighlight from '../components/OrangeHighlight'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | LFG Labs</title>
      </Head>
      <PageLayout>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="font-serif text-[38px] font-bold text-heading text-center mb-10 inline-block w-full">
            <OrangeHighlight>Our story</OrangeHighlight>
          </h1>

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
              We&apos;re Thomas and Ben. We met during our engineering studies in
              France, became friends, and quickly realized we shared the same
              itch: we wanted to build things that matter.
            </p>

            <p>
              It started with blockchain. We were fascinated by the idea of
              open, permissionless systems, so we jumped in and started
              shipping. Our first big project was Starknet ID, a decentralized
              identity protocol that grew to 500K+ domains and 239K paying
              users. Seeing it become the identity layer for an entire
              ecosystem was the moment we knew we were onto something.
            </p>

            <p>
              From there, things moved fast. We built a lot of other products
              alongside great ecosystem partners, from developer tools and
              documentation to on-chain games and cross-chain bridges. You can
              check them all out on our{' '}
              <Link href="/projects" className="text-accent font-bold hover:underline">
                projects page
              </Link>
              .
            </p>

            <p>
              Nine products shipped. Hundreds of thousands of users. A successful
              acquisition. Some of the biggest names in the space as partners
              and clients. We&apos;ve been lucky to work with incredible people.
            </p>

            <p>
              Then AI changed everything. We saw the same energy we&apos;d felt
              with blockchain: a new way to build, faster than ever. So we
              expanded beyond web3 and now help companies experiment at the
              intersection of AI and blockchain.
            </p>

            <p>
              We&apos;re still building. If that sounds interesting to you,
              let&apos;s talk.
            </p>
          </div>

          <div className="border-t border-gray-200 mt-12" />

          <div className="bg-card-bg rounded-xl p-8 mt-12">
            <p className="text-base font-bold text-heading mb-2">
              Get in touch
            </p>
            <p className="text-sm text-muted mb-4">
              Reach out for partnerships, collaborations, or inquiries.
            </p>
            <a
              href="mailto:ben@lfglabs.dev"
              className="text-accent font-bold hover:underline"
            >
              ben@lfglabs.dev
            </a>
          </div>
        </div>
      </PageLayout>
    </>
  )
}
