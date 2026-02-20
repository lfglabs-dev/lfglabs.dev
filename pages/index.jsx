import Head from 'next/head'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import SocialProof from '../components/SocialProof'
import ProjectCard from '../components/ProjectCard'
import CompanyCard from '../components/CompanyCard'
import Footer from '../components/Footer'
import { projects } from '../data/projects'
import { companies } from '../data/companies'

export default function Home() {
  return (
    <>
      <Head>
        <title>LFG Labs | Web3 infrastructure, built AI-first</title>
      </Head>
      <Layout>
        <Hero />

        <SocialProof />

        <section className="mb-16">
          <h2 className="text-base font-bold text-heading mb-6">
            What we&apos;ve built
          </h2>
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-base font-bold text-heading mb-6">
            Companies we run
          </h2>
          <div className="flex flex-col gap-4">
            {companies.map((company) => (
              <CompanyCard key={company.name} company={company} />
            ))}
          </div>
        </section>

        <Footer />
      </Layout>
    </>
  )
}
