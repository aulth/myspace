import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }) {

  return <>
  <NextNProgress spinner={false} color='#60A5FA'/>
  <Component {...pageProps} />
  </>
}

export default MyApp
