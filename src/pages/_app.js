import Router from 'next/router'
import Head from 'next/head';
import NProgress from 'nprogress';

import Hero from '../components/Hero';
import Navbar from '../components/Navbar'

import '../styles/globals.scss'
import styles from '../styles/Home.module.scss';

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pokemondex</title>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <div className={styles.wrapper}>
        <main>
          <Navbar/>
          <Hero/>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}

export default MyApp
