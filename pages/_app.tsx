import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
