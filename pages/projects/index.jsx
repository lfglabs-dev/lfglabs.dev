import Head from 'next/head'
import PageLayout from '../../components/PageLayout'
import ProjectCard from '../../components/ProjectCard'
import SocialProof from '../../components/SocialProof'
import SectionHeader from '../../components/ui/SectionHeader'
import { projects } from '../../data/projects'

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projects | LFG Labs</title>
      </Head>
      <PageLayout>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <SectionHeader
            subtitle="A selection of what we've built over the years for the web3 ecosystem, from identity protocols to developer tools."
          >
            Our <span className="text-accent">Projects</span>
          </SectionHeader>

          <SocialProof />

          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  )
}
