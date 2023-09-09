import {WebGLRenderer, Scene, PerspectiveCamera} from 'three';

/**
 * Common game class
 */
export default class Game {
    private readonly renderer: WebGLRenderer;
    private readonly camera: PerspectiveCamera;
    private readonly scene: Scene;

    public constructor() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, innerWidth / innerHeight, .1, 500);
        this.renderer = new WebGLRenderer({antialias: true});
    }

    /**
     * Prepare game engine and game before start
     */
    public prepare(): void {
        const resize = () => {
            this.renderer.setSize(innerWidth, innerHeight);
            this.camera.aspect = innerWidth / innerHeight;
            this.camera.updateProjectionMatrix();
        };

        // Set renderer size and camera aspect ratio
        resize();
        window.addEventListener('resize', resize.bind(this));
    }

    /**
     * Begin render process
     */
    public start(): void {
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Render canvas element accessor
     */
    public get domElement(): HTMLCanvasElement {
        return this.renderer.domElement;
    }
}
