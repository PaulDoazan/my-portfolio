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
import Script from 'next/script'

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

  const onScriptLoaded = () => {
    // console.log('loaded');
}

  return (
    <div className={styles.container}>
      <Script
                src="https://code.createjs.com/1.0.0/createjs.min.js"
                onLoad={onScriptLoaded}
            />
      <div className={`${utilStyles.sectionContainer}`}>
        <section className={`${utilStyles.headingMd} ${utilStyles.width40} ${utilStyles.firstSection}`}>
            <h1 className={utilStyles.heading2Xl}>Hello.</h1>
            <h2 className={utilStyles.headingXl}>My name is Paul Doazan.</h2>
            <p>
              I am currently an independent web developer based in Bordeaux. You&apos;ll find me at <CustomButton btnContent={'Oasis Coworking'}/>.<br />
              You can check my portfolio and the missions I&apos;ve accomplished on my <CustomButton btnContent={'Github'} /> and my <CustomButton btnContent={'Linkedin'}/>.
            </p>
            <p>
              Here are my most recent works : <CustomButton btnContent={'Bixie'} />, <CustomButton btnContent={'Alec'} />, <CustomButton btnContent={'Portfolio'} />.<br />
              For some projects like <CustomButton btnContent={'eduMedia'}/>, <CustomButton btnContent={'Sonesdi'}/>, 
              I spent a great time with the team and some others like <CustomButton btnContent={'MoultPistes'}/>, <CustomButton btnContent={'wedding DropBox'}/>, 
              I worked on them independently.
            </p>
            <p>
              Outside of the world of programming, 
              I practice <CustomButton btnContent={'climbing'}/> and I play <CustomButton btnContent={'Pelote Basque'}/> with friends.
            </p>
            <p>
              <br />  
              <a href="mailto:paul.doazan@gmail.com"><i>paul.doazan@gmail.com</i></a>
            </p>
        </section>
        <section className={`${utilStyles.width30} ${utilStyles.secondSection} ${home && utilStyles.displayNone}`}>
          {!home && ( 
              <Nav />
          )}
          {children}
        </section>
      </div>
    </div>
  )
}