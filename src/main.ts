import Game from './game';
import {
    Mesh,
    BoxGeometry,
    MeshBasicMaterial,
    AnimationMixer,
    ColorKeyframeTrack,
    AnimationClip,
    Color,
    InterpolateLinear
} from 'three';
import './style.css';

const root = document.querySelector<HTMLDivElement>('#game');
if (!root) throw new Error('No #game element in DOM');

// Initialize game class
const game = new Game();
game.prepare();

// Add cube
const cubeGeometry = new BoxGeometry(1, 1, 1);
const cubeMaterial = new MeshBasicMaterial({color: 0x00ff00});
const cube = new Mesh(cubeGeometry, cubeMaterial);
game.currentScene.add(cube);
game.onStep(() => {
    cube.rotation.x += .025;
    cube.rotation.z += .025;
});

// Add cube animation
const cubeAnimation = new AnimationMixer(cube);
const frames: Array<{color: Color, time: number}> = [
    {color: new Color(0xff0000), time: 0},
    {color: new Color(0x00ff00), time: 1},
    {color: new Color(0x0000ff), time: 2},
    {color: new Color(0xff0000), time: 3},
];
const colorTrack = new ColorKeyframeTrack(
    '.material.color',
    frames.map((kf) => kf.time),
    frames.flatMap((kf) => [kf.color.r, kf.color.g, kf.color.b]),
    InterpolateLinear
);
const colorClip = new AnimationClip('cubeColorAnim', -1, [colorTrack]);
const cubeAction = cubeAnimation.clipAction(colorClip);
cubeAction.play();
game.onStep((dt) => cubeAnimation.update(dt));

game.start();
root.appendChild(game.domElement);
