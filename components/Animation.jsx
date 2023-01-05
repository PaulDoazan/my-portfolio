import React, { useRef, useEffect } from 'react';
import Head from 'next/head';
import root from './Animation/modules/root';
import utilStyles from '../styles/utils.module.css'
import Script from 'next/script'
import { selectPostState } from "../store/postSlice";
import { useSelector } from "react-redux";

export default function Animation() {
    const canvasRef = useRef(null);
    const postState = useSelector(selectPostState);
    const refStage = useRef(null);

    const onScriptLoaded = () => {
        if(refStage.current !== null) return;
        const createjs = window.createjs;
        refStage.current = new createjs.Stage(canvasRef.current);
        createjs.Touch.enable(refStage.current);

        // start the tick and point it at the window so we can do some work before updating the stage:
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        if(!createjs.Ticker.hasEventListener("tick")) createjs.Ticker.on("tick", tick);
        
        root(refStage.current);

        function tick() {
            refStage.current.update();
        }
    }

    useEffect(() => {
        if(window.createjs === undefined || refStage.current !== null) return;
        const createjs = window.createjs;
        refStage.current = new createjs.Stage(canvasRef.current);
        let tickHandler;
        createjs.Touch.enable(refStage.current);

        // start the tick and point it at the window so we can do some work before updating the stage:
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        if(!createjs.Ticker.hasEventListener("tick")) tickHandler = createjs.Ticker.addEventListener("tick", tick);
        
        root(refStage.current);

        function tick() {
            if(refStage.current !== null) refStage.current.update();
        }

        return function cleanup() {
            createjs.Ticker.removeAllEventListeners()
            refStage.current = null;
          };
    }, [])

    useEffect(()=>{
        let e = new createjs.Event("changePostAnimation");
        e.postState = postState;
        refStage.current.dispatchEvent(e);
    }, [postState])

    return (
        <>
        <Head>
            <script src="https://code.createjs.com/1.0.0/createjs.min.js" async></script>
        </Head>
        <Script
                src="https://code.createjs.com/1.0.0/createjs.min.js"
                onLoad={onScriptLoaded}
            />
            <canvas id="canvas" ref={canvasRef} className={utilStyles.canvas} width="600" height="600"></canvas>
        </>
    )
}
