/*
src/ZMath/CFrame.ts

Defines a CFrame class.
 */


import { Vector3 } from "../ZMath";

export class CFrame
{
    public readonly Position: Vector3;
    public readonly Orientation: Vector3;

    constructor(position: Vector3, orientation: Vector3)
    {
        this.Position = position;
        this.Orientation = orientation;
    }

    public get X(): number
    { return this.Position.x; }

    public get Y(): number
    { return this.Position.y; }

    public get Z(): number
    { return this.Position.z; }
}
