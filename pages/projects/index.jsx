import Head from 'next/head'
import PageLayout from '../../components/PageLayout'
import ProjectCard from '../../components/ProjectCard'
import OrangeHighlight from '../../components/OrangeHighlight'
import { projects } from '../../data/projects'

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projects | LFG Labs</title>
      </Head>
      <PageLayout>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="font-serif text-[38px] font-bold text-heading inline-block">
              <OrangeHighlight>Projects</OrangeHighlight>
            </h1>
          </div>

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
