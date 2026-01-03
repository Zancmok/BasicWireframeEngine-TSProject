/*
src/index.ts

The entry point file of the project.
 */

import { World, Camera, Cuboid } from "./Instance";
import { Vector3 } from "./ZMath";

const keysPressed: { [key: string]: boolean } = {
    "w": false,
    "a": false,
    "s": false,
    "d": false
};

let mouseDeltaX: number = 0;
let mouseDeltaY: number = 0;

let world: World;
let camera: Camera;
let part1: Cuboid;
let part2: Cuboid;
let part3: Cuboid;

/**
 * The entry point of the project.
 * @returns {void}
 * */
function main(): void
{
    world = new World();
    world.Name = "World";

    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Controls magic here
    canvas.addEventListener("click", () => {
        canvas.requestPointerLock();
    });

    document.addEventListener("mousemove", (e) => {
        if (document.pointerLockElement === canvas) {
            mouseDeltaX += e.movementX;
            mouseDeltaY += e.movementY;
        }
    });

    window.addEventListener("keydown", (e) => {
        keysPressed[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
        keysPressed[e.key] = false;
    });

    camera = new Camera(canvas);
    camera.Parent = world;
    camera.Name = "Camera";

    part1 = new Cuboid(Vector3.one);
    part1.Parent = world;
    part1.Position = new Vector3(0, 0, 5);

    part2 = new Cuboid(new Vector3(3, 1, 3));
    part2.Position = new Vector3(0, -1, 5);
    part2.Parent = world;

    part3 = new Cuboid(new Vector3(3, 1, 3));
    part3.Parent = world;
    part3.Position = new Vector3(0, 1, 5);

    let lastTime: number = 0;
    function gameLoop(currTime: number): void
    {
        let timeDelta: number = currTime - lastTime;
        lastTime = currTime;

        loop(timeDelta);

        camera.Render();
        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}

function loop(timeDelta: number): void {
    const speed: number = 0.05;
    const mouseSensitivity: number = 0.03;

    // Vertical Movement
    camera.Position = Vector3.add(
        camera.Position,
        new Vector3(
            Math.sin(camera.Rotation.y * Math.PI / 180) * speed * ((+keysPressed["w"]) - (+keysPressed["s"])),
            0,
            Math.cos(camera.Rotation.y * Math.PI / 180) * speed * ((+keysPressed["w"]) - (+keysPressed["s"]))
        )
    );

    // Horizontal Movement
    camera.Position = Vector3.add(
        camera.Position,
        new Vector3(
            Math.cos(camera.Rotation.y * Math.PI / 180) * speed * ((+keysPressed["d"]) - (+keysPressed["a"])),
            0,
            -Math.sin(camera.Rotation.y * Math.PI / 180) * speed * ((+keysPressed["d"]) - (+keysPressed["a"]))
        )
    );

    // Camera Rotation
    camera.Rotation = new Vector3(
        0,
        camera.Rotation.y + mouseDeltaX * mouseSensitivity,
        0
    );

    mouseDeltaX = 0;
    mouseDeltaY = 0;
}

main();
