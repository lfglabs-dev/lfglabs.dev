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
        <title>Our Work | LFG Labs</title>
      </Head>
      <PageLayout>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <SectionHeader
            subtitle="Production work for clients: developer infrastructure, protocols, and machine-checked proofs."
          >
            Our <span className="text-accent">Work</span>
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
