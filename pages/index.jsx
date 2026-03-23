import Head from 'next/head'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Benefits from '../components/sections/Benefits'
import HowItWorks from '../components/sections/HowItWorks'
// import Testimonials from '../components/sections/Testimonials'
import FAQ from '../components/sections/FAQ'
import FinalCTA from '../components/sections/FinalCTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>LFG Labs | We secure smart contracts with formal verification</title>
      </Head>
      <Layout footer={<Footer />}>
        <Hero />
        <Benefits />
        <HowItWorks />
        {/* <Testimonials /> */}
        <FAQ />
        <FinalCTA />
      </Layout>
    </>
  )
}
