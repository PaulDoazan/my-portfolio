import React, { useRef, useEffect } from 'react';
import Head from 'next/head';
import root from './Animation/modules/root';
import utilStyles from '../styles/utils.module.css'
import Script from 'next/script'

export default function Animation() {
    const canvasRef = useRef(null);

    const onScriptLoaded = () => {
        const createjs = window.createjs;
        const stage = new createjs.Stage(canvasRef.current);
        createjs.Touch.enable(stage);

        // start the tick and point it at the window so we can do some work before updating the stage:
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        if(!createjs.Ticker.hasEventListener("tick")) createjs.Ticker.on("tick", tick);
        
        root(stage);

        function tick() {
            stage.update();
        }
    }

    useEffect(() => {
        if(window.createjs === undefined) return;
        const createjs = window.createjs;
        let stage = new createjs.Stage(canvasRef.current);
        let tickHandler;
        createjs.Touch.enable(stage);

        // start the tick and point it at the window so we can do some work before updating the stage:
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        if(!createjs.Ticker.hasEventListener("tick")) tickHandler = createjs.Ticker.addEventListener("tick", tick);
        
        root(stage);

        function tick() {
            if(stage !== null) stage.update();
        }

        return function cleanup() {
            createjs.Ticker.removeAllEventListeners()
            stage = null;
          };
    }, [])

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
