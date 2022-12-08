import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name: string = 'Paul Doazan'
export const siteTitle: string = 'Paul Doazan'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <div className={`${utilStyles.sectionContainer}`}>
        <section className={`${utilStyles.headingMd} ${utilStyles.widthThird}`}>
            <h1 className={utilStyles.heading2Xl}>Hello.</h1>
            <h2 className={utilStyles.headingXl}>My name is Paul Doazan.</h2>
            <p>
              I am an independent software developer currently based in Bordeaux.
            </p>
            <p>
              You can follow me on Twitter, Github.
            </p>
            <p>
              Outside of programming, spending time with my wife and taking care of our two kids, I love Comics,
              I practice climbing, and I enjoy playing Pelote Basque with friends. 
            </p>
        </section>
        <section className={`${utilStyles.widthThird}`}>{children}</section>
      </div>
      {/* {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )} */}
    </div>
  )
}