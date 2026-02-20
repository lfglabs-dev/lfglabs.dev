import Head from 'next/head'
import { useRouter } from 'next/router'
import LegalLayout from '../components/LegalLayout'
import '../styles/main.css'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const isLegalPage =
    router.pathname.startsWith('/privacy') ||
    router.pathname.startsWith('/terms') ||
    router.pathname === '/support'

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      {isLegalPage ? (
        <LegalLayout>
          <Component {...pageProps} />
        </LegalLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}
