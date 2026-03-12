import Head from 'next/head'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import SocialProof from '../components/SocialProof'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>LFG Labs | We secure smart contracts with mathematical proofs</title>
      </Head>
      <Layout footer={<Footer />}>
        <Hero />
        <SocialProof />
      </Layout>
    </>
  )
}
