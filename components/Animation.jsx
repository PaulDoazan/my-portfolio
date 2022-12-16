import React, { useRef, useEffect } from 'react';
import Head from 'next/head';
import root from './Animation/modules/root';
import utilStyles from '../styles/utils.module.css'

export default function Animation() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const createjs = window.createjs;
        const stage = new createjs.Stage(canvasRef.current);
        createjs.Touch.enable(stage);

        // start the tick and point it at the window so we can do some work before updating the stage:
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        if(createjs.Ticker.hasEventListener("tick")) return;
        createjs.Ticker.on("tick", tick);

        root(stage);

        function tick() {
            stage.update();
        }
    }, [])

    return (
        <>
            <Head>
                <script src="https://code.createjs.com/1.0.0/createjs.min.js" async />
            </Head>
            <canvas id="canvas" ref={canvasRef} className={utilStyles.canvas} width="600" height="600"></canvas>
        </>
    )
}
