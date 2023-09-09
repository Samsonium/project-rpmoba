import {WebGLRenderer, Scene, PerspectiveCamera, Clock} from 'three';
// @ts-ignore
import WebGL from 'three/examples/jsm/capabilities/WebGL';

/**
 * Common game class
 */
export default class Game {
    private readonly renderer: WebGLRenderer;
    private readonly camera: PerspectiveCamera;
    private readonly scene: Scene;
    private readonly clock: Clock;
    private readonly stepHandlers: Array<(dt: number) => any>;

    private isRunning: boolean;

    public constructor() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, innerWidth / innerHeight, .1, 500);
        this.renderer = new WebGLRenderer({antialias: true});
        this.isRunning = false;
        this.clock = new Clock();
        this.stepHandlers = [];
    }

    /**
     * Prepare game engine and game before start
     */
    public prepare(): void {
        if (!WebGL.isWebGLAvailable())
            throw new Error('WebGL is not available');

        // Set window resize event handler
        this.handleResize();
        window.addEventListener('resize', this.handleResize.bind(this));

        // Set camera position
        this.camera.position.z = 2;
    }

    /**
     * Add step handler
     * @param fn
     */
    public onStep(fn: (dt: number) => any): void {
        this.stepHandlers.push(fn);
    }

    /**
     * Begin render process
     */
    public start(): void {
        this.isRunning = true;
        this.loopStep();
    }

    // ---------------- [ PRIVATE SCOPE ]

    /**
     * Handle window resize
     * @private
     */
    private handleResize(): void {
        this.renderer.setSize(innerWidth, innerHeight);
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
    }

    /**
     * Game loop step with requesting animation frame
     * @private
     */
    private loopStep(): void {
        if (!this.isRunning) return;
        this.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.loopStep.bind(this));
    }

    /**
     * Logic update
     * @private
     */
    private update(): void {
        const delta = this.clock.getDelta();
        const callStack: Array<Promise<void>> = [];
        for (const fn of this.stepHandlers) {
            callStack.push(new Promise<void>(done => {
                fn(delta); done();
            }))
        }
        Promise.all(callStack).then();
    }

    // ---------------- [ ACCESSORS SCOPE ]

    /**
     * Render canvas element accessor
     */
    public get domElement(): HTMLCanvasElement {
        return this.renderer.domElement;
    }

    /**
     * Using scene accessor
     */
    public get currentScene(): Scene {
        return this.scene;
    }
}
