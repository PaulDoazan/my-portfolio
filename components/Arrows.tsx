import React from 'react'
import utilStyles from '../styles/utils.module.css'
import { selectPostState, setPostState } from "../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

export default function Arrows() {
    const posts : string[] = ['Oasis Coworking', 'Github', 'Linkedin', 'Bixie', 'Alec', 'Portfolio', 'eduMedia', 'Sonesdi', 'MoultPistes', 'wedding DropBox', 'climbing', 'Pelote Basque']
    const postState = useSelector(selectPostState);
    const dispatch = useDispatch();
    const router = useRouter()

    const handleClick = (e :  React.MouseEvent<HTMLElement>) => {
        const isLeft : boolean = e.currentTarget.getAttribute('data-id') === 'left';
        const index : number = posts.findIndex((element) => element === postState);
        let nextIndex : number;
        if(isLeft){
            nextIndex = index === 0 ? posts.length - 1 : index - 1;
        } else {
            nextIndex = index === posts.length - 1 ? 0 : index + 1;
        }
        dispatch(setPostState(posts[nextIndex]));
        router.push(`/posts/${posts[nextIndex].toLowerCase()}`)
    }
  return (
    <div className={utilStyles.arrowsContainer}>
            <div onClick={handleClick} data-id='left'>
                <span className={utilStyles.arrowHtml}>&larr;</span>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg> */}
            </div>
            <h1 className={`${utilStyles.headingXl} ${utilStyles.transparentTitle}`}>{postState}</h1>
            <div onClick={handleClick} data-id='right'>
                <span className={utilStyles.arrowHtml}>&rarr;</span>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg> */}
            </div>
        </div>
  )
}
