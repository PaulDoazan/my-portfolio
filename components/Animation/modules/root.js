import Polygon from './polygon.js';
import ClickArea from './clickArea.js';
import polygonToTriangle from "./polygonToTriangle";
import pelotari from '../json/pelotebasque.json'
import climbing from '../json/climbing.json'

export default function root(stage) {
    let postStates = ['climbing', 'pelotebasque'];
    let animations = [climbing.frames, pelotari.frames]
    let frames = [];
    let indexFrame = 0;

    let createjs = window.createjs;
    let container = new createjs.MovieClip();
    stage.addChild(container);

    let polygons = [];
    stage.polygons = polygons;
    stage.update();

    let clickArea = new ClickArea();
    stage.addChild(clickArea);

    // FIX THAT METHOD FOR MULTI STAGES
    stage.on('changeFrame', (e) => {
        changeFrame(e);
    })

    stage.on('changePostAnimation', (e) => {
        changePostAnimation(e);
    })

    function changeFrame(e) {
        if(frames.length === 0) return;
        if(e.newAnimation){
            indexFrame = 0
        } else {
            indexFrame++;
        } 
        if (indexFrame >= frames.length) indexFrame = 0;

        let nextFrame = frames[indexFrame];
        stage.polygons.map((polygon, index) => {
            if (index >= nextFrame.shapes.length) return;
            polygon.coords = polygon.projectedCoords = nextFrame.shapes[index].coords;
            polygon.color = nextFrame.shapes[index].color;
        })

        if (stage.polygons.length > nextFrame.shapes.length) {
            for (let i = nextFrame.shapes.length; i <= stage.polygons.length; i++) {
                let polygon = stage.polygons[i];
                container.removeChild(polygon);
            }
            stage.polygons.splice(nextFrame.shapes.length);
        } else if (stage.polygons.length < nextFrame.shapes.length) {
            for (let i = stage.polygons.length; i < nextFrame.shapes.length; i++) {
                let polygon = new Polygon(nextFrame.shapes[i], stage, true);
                stage.polygons.push(polygon);
                container.addChild(polygon);
            }
        }
    }

    function changePostAnimation(e) {
        if(e.postState === null) return;
        let indexPost = postStates.findIndex((element) => element === e.postState.toLowerCase().replace(/\s/g, ''))
        if(indexPost !== -1){
            frames = animations[indexPost];
            convertPolygonToTriangles(frames);
            let event = new createjs.Event("changeFrame");
            event.newAnimation = true;
            stage.dispatchEvent(event);
            stage.dispatchEvent(new createjs.Event("targetUp"));
        }
    }

    function convertPolygonToTriangles (frames) {
        frames.map((frame)=>{
            let triangulatedShapes = [];
            frame.shapes.map((shape)=>{
                let triangles = polygonToTriangle.triangulate(shape.coords);
                triangles.map((triangle)=>{
                    let convertedCoords = [];
                    triangle.map((corner) => {
                        if (corner && corner.length) convertedCoords.push({ x: corner[0], y: corner[1] })
                    })
                    triangulatedShapes.push({coords: convertedCoords, color: shape.color, locked: shape.locked})
                })
            })
            frame.shapes = triangulatedShapes;
        })
    }
}