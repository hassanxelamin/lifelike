import '../styles/globals.css'
import { EmailProvider } from '../context/EmailContext'
import ShopProvider from '../context/shopContext'
import { useRouter } from 'next/router'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <ShopProvider>
      <EmailProvider>    
        <Component {...pageProps} key={router.asPath} />
        <Script 
          strategy="afterInteractive" 
          src="https://www.googletagmanager.com/gtag/js?id=G-C4KWESBCPP" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C4KWESBCPP')
          `}
        </Script>
      </EmailProvider>
    </ShopProvider>
  )
}

export default MyApp