import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }) {

  return <>
  <NextNProgress spinner={false} color='#414141'/>
  <Component {...pageProps} />
  </>
}

export default MyApp
