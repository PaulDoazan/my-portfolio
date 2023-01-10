import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import { selectPostState, setPostState } from "../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import { useEffect, useRef, createElement  } from 'react';
import explosionStyles from '../styles/explosion.module.css'

interface ButtonProps {
    btnContent: string;
  }

export default function CustomButton({btnContent} : ButtonProps) {
    const postState = useSelector(selectPostState);
    const dispatch = useDispatch();
    const router = useRouter()
    const handleClick = (e :  React.MouseEvent<HTMLElement>) => {
          dispatch(setPostState(btnContent));
    }

    // useEffect(() => {
    //   postState === btnContent ? explode() : null;
    // }, [postState])
    

    // const containerRef = useRef(null);

    // const explode = () => {
    //   let particles = 15;

    //   for (var i = 0; i < particles; i++) {
    //       let p = document.createElement('div');
    //       p.className = 'particle';
    //       p.style.left = `${rand(0, 100)}%`;
    //       p.style.top = '50%';
    //       if(containerRef.current) containerRef.current.appendChild(p);

    //       p.addEventListener('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
    //         console.log('end');
            
    //         if(containerRef.current) containerRef.current.removeChild(p); // remove this explosion container when animation ended
    //       });
              
    //     }
    // }
    
    // get random number between min and max value
    function rand(min : number, max : number) {
      return Math.floor(Math.random() * (max + 1)) + min;
    }

  return (
    <>
        <Link data-id="customBtn" className={`${explosionStyles.linkContainer}`} onClick={handleClick} href={`/posts/${btnContent.toLowerCase()}`}>
            {/* <span ref={containerRef} className={`${explosionStyles.explosion}`}></span> */}
            <span className={postState === btnContent ? utilStyles.fullYellowLink : utilStyles.thinYellowLink}>{btnContent}</span>
        </Link>
    </>
  )
}
