import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={utilStyles.mainContainer}>
        <section className={utilStyles.headingMd}>
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
        
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}