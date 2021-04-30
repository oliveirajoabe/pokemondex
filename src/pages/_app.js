import Hero from '../components/Hero';
import Navbar from '../components/Navbar'
import '../styles/globals.scss'
import styles from '../styles/Home.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Navbar/>
        <Hero/>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp
