/*
src/index.ts

The entry point file of the project.
 */

import { Vector3 } from "./ZMath";
import { Camera, Renderer } from "./Renderer";

/**
 * The entry point of the project.
 * @returns {void}
 * */
function main(): void
{
    const cam: Camera = new Camera(Vector3.zero, Vector3.zero, 90);
    const renderer: Renderer = new Renderer(cam, document.getElementById("canvas") as HTMLCanvasElement);

    renderer.draw();
}

main();
