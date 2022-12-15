import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'
import CustomButton from './CustomButton'
import { useEffect, useRef, useState } from 'react'
import { selectPostState, setPostState } from "../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Nav from './Nav'

const name: string = 'Paul Doazan'
export const siteTitle: string = 'Paul Doazan'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setPostState(null));
  }
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
              You can see the missions I realized on my <CustomButton btnContent={'Github'} /> and my <CustomButton btnContent={'Linkedin'}/>.
              </p><p>
              I present here my most recent works (<CustomButton btnContent={'Bixie'} />, <CustomButton btnContent={'Alec'} />, <CustomButton btnContent={'My portfolio'} />), 
              the ones I spent such a great time with the team (<CustomButton btnContent={'eduMedia'} />, <CustomButton btnContent={'Sonesdi'} />)
               and some others that I particularly like 
              (<CustomButton btnContent={'MoultPistes'} />, <CustomButton btnContent={'s+a wedding'} />).
            </p>
            <p>
              Outside of programming, spending time with my wife and taking care of our two kids,
              I practice <Link className={utilStyles.yellowLink} href="/">climbing</Link> and I enjoy playing <Link className={utilStyles.yellowLink} href="/">Pelote Basque</Link> with friends. 
            </p>
        </section>
        <section className={`${utilStyles.width30} ${utilStyles.secondSection}`}>
          {!home && ( 
            <Nav /> 
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