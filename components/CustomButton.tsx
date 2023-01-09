import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import { selectPostState, setPostState } from "../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react';
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

    useEffect(() => {
      postState === btnContent ? explode() : null;
    }, [postState])
    

    const explosionContainer = useRef(null);

    const explode = () => {
      let particles = 15;
      console.log(explosionContainer.current);
      
      // explosion container and its reference to be able to delete it on animation end
      // explosion = $('<div class="explosion"></div>');
    
      // position the container to be centered on click
      // explosion.css('left', x - explosion.width() / 2);
      // explosion.css('top', y - explosion.height() / 2);
    
      // for (var i = 0; i < particles; i++) {
      //   // positioning x,y of the particle on the circle (little randomized radius)
      //   var x = (explosion.width() / 2) + rand(80, 150) * Math.cos(2 * Math.PI * i / rand(particles - 10, particles + 10)),
      //     y = (explosion.height() / 2) + rand(80, 150) * Math.sin(2 * Math.PI * i / rand(particles - 10, particles + 10)),
      //     color = rand(0, 255) + ', ' + rand(0, 255) + ', ' + rand(0, 255), // randomize the color rgb
      //       // particle element creation (could be anything other than div)
      //     elm = $('<div class="particle" style="' +
      //       'background-color: rgb(' + color + ') ;' +
      //       'top: ' + y + 'px; ' +
      //       'left: ' + x + 'px"></div>');
    
      //   if (i == 0) { // no need to add the listener on all generated elements
      //     // css3 animation end detection
      //     elm.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
      //       explosion.remove(); // remove this explosion container when animation ended
      //     });
      //   }
      //   explosion.append(elm);
      // }
    }
    
    // get random number between min and max value
    function rand(min : number, max : number) {
      return Math.floor(Math.random() * (max + 1)) + min;
    }

  return (
    <>
        <Link data-id="customBtn" className={`${explosionStyles.linkContainer}`} onClick={handleClick} href={`/posts/${btnContent.toLowerCase()}`}>
            <span ref={explosionContainer} className={`${explosionStyles.explosion}`}></span>
            <span className={postState === btnContent ? utilStyles.fullYellowLink : utilStyles.thinYellowLink}>{btnContent}</span>
        </Link>
    </>
  )
}
