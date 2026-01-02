/*
src/index.ts

The entry point file of the project.
 */

import { World, Camera, Cuboid } from "./Instance";
import { Vector3 } from "./ZMath";

/**
 * The entry point of the project.
 * @returns {void}
 * */
function main(): void
{
    const world: World = new World();
    world.Name = "World";

    const camera = new Camera(document.getElementById("canvas") as HTMLCanvasElement);
    camera.Parent = world;
    camera.Name = "Camera";

    const part1: Cuboid = new Cuboid(Vector3.one);
    part1.Parent = world;
}

main();
