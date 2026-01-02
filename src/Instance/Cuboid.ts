/*
src/Instance/Cuboid.ts

Defines the Cuboid class, a 3d cuboid object.
 */

import { Part } from "./Part";
import {Vector3} from "../ZMath";

export class Cuboid extends Part
{
    protected Vertices: Vector3[] = [];
    protected Connections: Array<[number, number]> = [
        // Bottom Layer
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 3],
        // Top Layer
        [4, 5],
        [4, 6],
        [5, 7],
        [6, 7],
        // Interconnections
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7]
    ];
    protected _size: Vector3 = Vector3.one;

    public get Size(): Vector3
    { return this._size; }

    public set Size(size: Vector3)
    {
        this._size = size;

        this.Vertices = [
            new Vector3(-size.x/2, -size.y/2, -size.z/2), // left,  bottom, front
            new Vector3(-size.x/2, -size.y/2, size.z/2),  // left,  bottom, back
            new Vector3(size.x/2, -size.y/2, -size.z/2),  // right, bottom, front
            new Vector3(size.x/2, -size.y/2, size.z/2),   // right, bottom, back
            new Vector3(-size.x/2, size.y/2, -size.z/2),  // left,  top,    front
            new Vector3(-size.x/2, size.y/2, size.z/2),   // left,  top,    back
            new Vector3(size.x/2, size.y/2, -size.z/2),   // right, top,    front
            new Vector3(size.x/2, size.y/2, size.z/2),    // right, top,    back
        ];
    }

    public constructor(size: Vector3 | null)
    {
        super();

        if (size === null)
        { size = Vector3.one; }

        this.Size = size;
    }
}
