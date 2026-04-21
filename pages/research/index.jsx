import Head from 'next/head'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import SectionHeader from '../../components/ui/SectionHeader'
import { getSortedResearch } from '../../lib/getSortedResearch'

const categoryOrder = ['Publication', 'Case study', 'Experimentation', 'Explainer']
const categoryLabels = {
  'Case study': 'Case Studies',
  'Publication': 'Publications',
  'Experimentation': 'Explorations',
  'Explainer': 'Explainers'
}
const caseStudyOrder = [
  'safe-owner-reachability',
  'lido-vault-solvency',
  'nexus-mutual-book-value',
  'stream-recovery-claim'
]

export default function ResearchPage() {
  const research = getSortedResearch()

  const grouped = categoryOrder
    .map((tag) => {
      const items = research.filter((item) => item.tag === tag)
      if (tag === 'Case study') {
        items.sort((a, b) => {
          const ai = caseStudyOrder.indexOf(a.slug)
          const bi = caseStudyOrder.indexOf(b.slug)
          return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi)
        })
      }
      return { tag, label: categoryLabels[tag], items }
    })
    .filter((group) => group.items.length > 0)

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
          <SectionHeader subtitle="We are making formal verification practical and accessible to smart contract developers. Here's what we've published so far.">
            Our <span className="text-accent">Research</span>
          </SectionHeader>

          <div className="flex flex-col gap-12">
            {grouped.map((group) => (
              <section key={group.tag}>
                <h3 className="font-serif text-xl text-muted mb-4">{group.label}</h3>
                <div className="flex flex-col gap-4">
                  {group.items.map((item) => (
                    <ResearchCard key={item.slug} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  )
}
