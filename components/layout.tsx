import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'

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
        <section className={`${utilStyles.headingMd} ${utilStyles.width40} ${utilStyles.firstSection}`}>
            <h1 className={utilStyles.heading2Xl}>Hello.</h1>
            <h2 className={utilStyles.headingXl}>My name is Paul Doazan.</h2>
            <p>
              I am an independent software developer currently based in Bordeaux.
            </p>
            <p>
              You can follow me on <Link href={`/posts/first`}>Twitter</Link>, <Link href={`/posts/second`}>Github</Link>.
            </p>
            <p>
              Outside of programming, spending time with my wife and taking care of our two kids, I love Comics,
              I practice climbing, and I enjoy playing Pelote Basque with friends. 
            </p>
        </section>
        <section className={`${utilStyles.width30} ${utilStyles.secondSection}`}>
          {!home && (
              <div className={styles.backToHome}>
                <Link href="/">←</Link>
              </div>
          )}
          {children}  
        </section>
      </div>
    </div>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }