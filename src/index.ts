/*
src/index.ts

The entry point file of the project.
 */

import { World, Camera, Cuboid } from "./Instance";
import { Vector3 } from "./ZMath";

const keysPressed: { [key: string]: boolean } = {
    "ShiftLeft": false,
    "Space": false,
    "KeyW": false,
    "KeyS": false,
    "KeyD": false,
    "KeyA": false
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

    camera = new Camera(canvas);
    camera.Parent = world;
    camera.Name = "Camera";

    let presetFOV: number = Number(document.cookie.split(';').find(c => c.startsWith("FOV="))?.split("=")[1]);
    if (!Number.isNaN(presetFOV))
    { camera.FieldOfView = presetFOV; }

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
        keysPressed[e.code] = true;
    });

    let formActive: boolean = false;
    window.addEventListener("keyup", (e) => {
        keysPressed[e.code] = false;

        if (e.code == "F8")
        {
            const result: string | null = prompt("New FOV: ");

            if (result === null)
            { return; }

            const newFOV: number = +result;

            if (Number.isNaN(newFOV))
            { return; }

            camera.FieldOfView = newFOV;

            document.cookie = `FOV=${newFOV}`;
        }
        else if (e.code == "F4")
        {
            if (formActive)
            {
                let form: HTMLElement | null = document.getElementById("form");
                if (form !== null)
                { document.getElementById("body")?.removeChild(form); }

                formActive = false;
                return;
            }

            formActive = true;

            let newForm: HTMLFormElement = document.createElement("form");
            newForm.setAttribute("id", "form");
            document.getElementById("body")?.appendChild(newForm);

            let formTitle: HTMLParagraphElement = document.createElement("p");
            formTitle.innerText = "Cube Factory";
            newForm.appendChild(formTitle);

            let positionXLabel: HTMLLabelElement = document.createElement("label");
            positionXLabel.innerText = "PositionX: ";
            newForm.appendChild(positionXLabel);

            let positionInputX: HTMLInputElement = document.createElement("input");
            positionInputX.type = "number";
            newForm.appendChild(positionInputX);

            let positionYLabel: HTMLLabelElement = document.createElement("label");
            positionYLabel.innerText = "PositionY: ";
            newForm.appendChild(positionYLabel);

            let positionInputY: HTMLInputElement = document.createElement("input");
            positionInputY.type = "number";
            newForm.appendChild(positionInputY);

            let positionZLabel: HTMLLabelElement = document.createElement("label");
            positionZLabel.innerText = "PositionZ: ";
            newForm.appendChild(positionZLabel);

            let positionInputZ: HTMLInputElement = document.createElement("input");
            positionInputZ.type = "number";
            newForm.appendChild(positionInputZ);

            let createButton: HTMLButtonElement = document.createElement("button");
            createButton.type = "button";
            createButton.innerText = "Create";
            createButton.addEventListener("click", (e) => {
                let x: number = Number(positionInputX.value);
                let y: number = Number(positionInputY.value);
                let z: number = Number(positionInputZ.value);

                if (Number.isNaN(x) || Number.isNaN(y) || Number.isNaN(z))
                {
                    alert("Invalid position!");
                    return;
                }

                let newCuboid: Cuboid = new Cuboid(Vector3.one);
                newCuboid.Position = new Vector3(x, y, z)
                newCuboid.Parent = world;
            })
            newForm.appendChild(createButton);
        }
    });

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

        let canvasWidth: number = window.innerWidth * 0.95;
        let canvasHeight: number = window.innerHeight * 0.95;

        if (formActive)
        { canvasHeight -= 40 }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;

        camera.Render();

        drawUI(canvas);

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}

function drawUI(canvas: HTMLCanvasElement): void
{
    const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvasContext.font = "16px monospace";
    canvasContext.fillStyle = "black";

    canvasContext.textAlign = "left";
    canvasContext.textBaseline = "bottom";

    const elementPadding: number = 20;
    let elementsPasted: number = 1;

    canvasContext.fillText(
        "Wireframe Renderer v1.0.0",
        0,
        canvas.height - elementPadding * elementsPasted
    );
    elementsPasted++;

    canvasContext.fillText(
        new Date().toString(),
        0,
        canvas.height - elementPadding * elementsPasted
    );
    elementsPasted++;

    canvasContext.fillText(
        "F8 - Change FOV Current FOV: ".concat(camera.FieldOfView.toString()),
        0,
        canvas.height - elementPadding * elementsPasted
    );
    elementsPasted++;

    canvasContext.fillText(
        "F4 - Open/Close Cube Factory",
        0,
        canvas.height - elementPadding * elementsPasted
    );
    elementsPasted++;

    canvasContext.fillText(
        "Mouse - Rotations",
        0,
        canvas.height - elementPadding * elementsPasted
    );
    elementsPasted++;

    canvasContext.fillText(
        "Space - upwards Shift - downwards",
        0,
        canvas.height - elementPadding * elementsPasted
    );
    elementsPasted++;

    canvasContext.fillText(
        "A - left D - right W - forward S - backwards",
        0,
        canvas.height - elementPadding * elementsPasted
    );
    elementsPasted++;

    canvasContext.fillText(
        "Controls:",
        0,
        canvas.height - elementPadding * elementsPasted
    );
    elementsPasted++;
}

let lock: boolean = false;
function loop(timeDelta: number): void {
    const speed: number = 0.05;
    const mouseSensitivity: number = 0.03;

    // Horizontal Movement
    camera.Position = Vector3.add(
        camera.Position,
        new Vector3(
            Math.sin(camera.Rotation.y * Math.PI / 180) * speed * ((+keysPressed["KeyW"]) - (+keysPressed["KeyS"])),
            0,
            Math.cos(camera.Rotation.y * Math.PI / 180) * speed * ((+keysPressed["KeyW"]) - (+keysPressed["KeyS"]))
        )
    );

    // Horizontal Movement
    camera.Position = Vector3.add(
        camera.Position,
        new Vector3(
            Math.cos(camera.Rotation.y * Math.PI / 180) * speed * ((+keysPressed["KeyD"]) - (+keysPressed["KeyA"])),
            0,
            -Math.sin(camera.Rotation.y * Math.PI / 180) * speed * ((+keysPressed["KeyD"]) - (+keysPressed["KeyA"]))
        )
    );

    // Vertical Movement
    camera.Position = Vector3.add(
        camera.Position,
        new Vector3(
            0,
            speed * ((+keysPressed["Space"]) - (+keysPressed["ShiftLeft"])),
            0
        )
    )

    // Camera Rotation
    camera.Rotation = new Vector3(
        Math.max(Math.min(camera.Rotation.x + mouseDeltaY * mouseSensitivity, 90), -90),
        camera.Rotation.y + mouseDeltaX * mouseSensitivity,
        0
    );

    mouseDeltaX = 0;
    mouseDeltaY = 0;

    const cubeSpeed = 0.2;

    part1.Rotation = Vector3.add(
        part1.Rotation,
        new Vector3(0, timeDelta * cubeSpeed, 0),
    );
    part2.Rotation = Vector3.add(
        part2.Rotation,
        new Vector3(0, -timeDelta * cubeSpeed, 0),
    );
    part3.Rotation = Vector3.add(
        part3.Rotation,
        new Vector3(0, -timeDelta * cubeSpeed, 0),
    );

    let movement: number;
    if ((part1.Position.y >= 1 && lock) || (part1.Position.y <= -1 && !lock))
    { lock = !lock; }

    if (lock)
    { movement = 1; }
    else
    { movement = -1; }

    part1.Position = Vector3.add(
        part1.Position,
        new Vector3(0, timeDelta * cubeSpeed * 0.005 * movement, 0)
    );
    part2.Position = Vector3.add(
        part2.Position,
        new Vector3(0, timeDelta * cubeSpeed * 0.005 * movement, 0)
    );
    part3.Position = Vector3.add(
        part3.Position,
        new Vector3(0, timeDelta * cubeSpeed * 0.005 * movement, 0)
    );
    part1.Size = Vector3.add(
        part1.Size,
        new Vector3(movement * cubeSpeed * 0.05, 0, movement * cubeSpeed * 0.05)
    );
}

main();
