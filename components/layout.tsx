import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'
import CustomButton from './CustomButton'
import { useEffect, useRef, useState } from 'react'

const name: string = 'Paul Doazan'
export const siteTitle: string = 'Paul Doazan'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  const [customBtns, setCustomBtns] = useState([])
  const handleClick = () => {
    console.log('click');
  }

  const handleButtonClick = (e : React.MouseEvent<HTMLElement>) => {
    const elements = document.querySelectorAll('[data-id*="customBtn"');
    elements.forEach((el)=>{
      //el.classList.remove('yellowTest');
    })
    
    //e.currentTarget.classList.add('yellowTest');
  }

  const refs = useRef([])
  
  return (
    <div className={styles.container}>
      <div className={`${utilStyles.sectionContainer}`}>
        <section className={`${utilStyles.headingMd} ${utilStyles.width40} ${utilStyles.firstSection}`}>
            <h1 className={utilStyles.heading2Xl}>Hello.</h1>
            <h2 className={utilStyles.headingXl}>My name is Paul Doazan.</h2>
            <p>
              I am an independent web developer currently based in Bordeaux.
            </p>
            <p>
              You can see the missions I realized on my <CustomButton btnContent={'Github'} clickHandler={handleButtonClick} /> and my <CustomButton btnContent={'Linkedin'} clickHandler={handleButtonClick}/>.
              </p><p>
              I present here my most recent works (<Link className={utilStyles.yellowLink} href={`/posts/bixie`}>Bixie</Link>, <Link className={utilStyles.yellowLink} href={`/posts/alec`}>Alec</Link>, <Link className={utilStyles.yellowLink} href={`/posts/first`}>this portfolio</Link>), 
              the ones I shared such a great time with the team (<Link className={utilStyles.yellowLink} href={`/posts/edumedia`}>eduMedia</Link>, <Link className={utilStyles.yellowLink} href={`/posts/sonesdi`}>Sonesdi</Link>)
               and some others that I particularly like 
              (<Link className={utilStyles.yellowLink} href={`/posts/first`}>MoultPistes</Link>, <Link className={utilStyles.yellowLink} href={`/posts/first`}>Sophie-Ayoub</Link>).
            </p>
            <p>
              Outside of programming, spending time with my wife and taking care of our two kids,
              I practice <Link className={utilStyles.yellowLink} onClick={handleClick} href="/">climbing</Link> and I enjoy playing <Link className={utilStyles.yellowLink} onClick={handleClick} href="/">Pelote Basque</Link> with friends. 
            </p>
        </section>
        <section className={`${utilStyles.width30} ${utilStyles.secondSection}`}>
          {!home && (
              <div className={styles.backToHome}>
                <div className={utilStyles.crossBtnContainer}>
                <Link href="/" onClick={handleClick}>
                  <div className={utilStyles.crossBtn}>
                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
                    </svg>
                  </div>             
                </Link>
                </div>
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