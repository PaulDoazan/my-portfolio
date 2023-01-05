import Polygon from './polygon.js';
import ClickArea from './clickArea.js';
import polygonToTriangle from "./polygonToTriangle";
import pelotari from '../json/pelotari.json'
import climbing from '../json/climbing.json'

export default function root(stage) {
    let animations = [pelotari.frames, climbing.frames]
    let frames = animations[1];
    let indexFrame = 0;

    let createjs = window.createjs;
    let container = new createjs.MovieClip();
    stage.addChild(container);

    let polygons = [];
    stage.polygons = polygons;

    convertPolygonToTriangles(frames);

    frames[0].shapes.map((shape) => {
        let polygon = new Polygon(shape, stage);
        polygons.push(polygon);
        container.addChild(polygon);
    })
    stage.update();

    let clickArea = new ClickArea();
    stage.addChild(clickArea);

    // FIX THAT METHOD FOR MULTI STAGES
    stage.on('changeFrame', (e) => {
        changeFrame(e, stage, container);
    })

    function changeFrame(e, stage, container) {
        indexFrame++;
        if (indexFrame >= frames.length) indexFrame = 0;

        let nextFrame = frames[indexFrame];
        console.log(nextFrame);
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