import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Post({
  postData
}: {
  postData: {
    title: string
    dates: string[]
    contentHtml: string
    skills: string[]
    link: { text: string, url: string } | null
  }
}) {
  return (
    <Layout>
      <Head>
        <title>Project : {postData.title}</title>
        <meta
          name="description"
          content="Paul Doazan project."
          key="desc"
        />
      </Head>
      <article>
        <div className={`${utilStyles.articleTitleContainer}`}>
          <h1 className={`${utilStyles.headingXl}`}>{postData.title}</h1>
        </div>
        <div className={utilStyles.lightText}>
          {postData.dates.map((d, ind, arr) => {
            const differentYears = d.substring(0, 4) !== arr[arr.length - 1].substring(0, 4);
            return <Date key={ind} dateString={d} fullDate={ind === arr.length - 1 || differentYears} withHyphen={ind < arr.length - 1} />
          })}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <p>
          {postData.link &&
            <a href={postData.link.url} target="_blank" rel="noopener noreferrer">&#8680; <i>{postData.link.text}</i></a>
          }
        </p>
        <p>
          {postData.skills.map((s, ind) => {
            return <span className={`${utilStyles.skillLabel}`} key={ind}>{s}</span>
          })}
        </p>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string)
  return {
    props: {
      postData
    }
  }
}