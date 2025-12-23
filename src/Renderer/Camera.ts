/*
src/Renderer/Camera.ts

Defines the Camera class.
 */

import { Vector3 } from "ZMath";

/**
 * A class defining the world camera
 * */
export class Camera
{
    public position: Vector3;
    public rotation: Vector3;
    public FOV: number;

    constructor(position: Vector3, rotation: Vector3, FOV: number)
    {
        this.position = position;
        this.rotation = rotation;
        this.FOV = FOV;
    }
}
