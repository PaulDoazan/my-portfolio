import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import { selectPostState, setPostState } from "../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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

  return (
    <>
        <Link  data-id="customBtn" onClick={handleClick} href={`/posts/${btnContent.toLowerCase()}`}>
            <span className={postState === btnContent ? utilStyles.fullYellowLink : utilStyles.thinYellowLink}>{btnContent}</span>
        </Link>
    </>
  )
}
