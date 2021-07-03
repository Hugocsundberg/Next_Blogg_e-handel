import '../styles/globals.css'
// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import Nav from '../components/Nav'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Nav></Nav>
    <Component {...pageProps} />
    </>
    )
}

export default MyApp
