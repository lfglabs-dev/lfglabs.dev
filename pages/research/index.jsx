import Head from 'next/head'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import SectionHeader from '../../components/ui/SectionHeader'
import { getSortedResearch } from '../../lib/getSortedResearch'

export default function ResearchPage() {
  const research = getSortedResearch()

  return (
    <>
      <Head>
        <title>Research | LFG Labs</title>
        <meta
          name="description"
          content="Publications and articles from LFG Labs on formal verification for smart contracts."
        />
      </Head>
      <PageLayout>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <SectionHeader subtitle="We're working to make formal verification practical and accessible for smart contract developers. Here's what we've published so far.">
            Our <span className="text-accent">Research</span>
          </SectionHeader>

          <div className="flex flex-col gap-4">
            {research.map((item) => (
              <ResearchCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  )
}
