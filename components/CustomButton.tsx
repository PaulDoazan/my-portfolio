import { readFileSync } from 'fs';
import Link from 'next/link'
import React, { MutableRefObject, useEffect, useState } from 'react'
import utilStyles from '../styles/utils.module.css'

interface ButtonProps {
    btnContent: string;
    clickHandler: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  }

export default function CustomButton({btnContent, clickHandler} : ButtonProps) {
    const [selected, setSelected] = useState(false);
    const handleClick = (e :  React.MouseEvent<HTMLElement>) => {
        clickHandler(e);
        setSelected(!selected);
    }

  return (
    <>
        <Link  data-id="customBtn" onClick={handleClick} href={`/posts/${btnContent.toLowerCase()}`}>
            <span className={selected ? utilStyles.fullYellowLink : utilStyles.thinYellowLink}>{btnContent}</span>
        </Link>
        
    </>
  )
}
