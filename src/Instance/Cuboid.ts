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
        [0, 1]
    ];
    protected _size: Vector3 = Vector3.one;

    public get Size(): Vector3
    { return this._size; }

    public set Size(size: Vector3)
    {
        this._size = size;

        this.Vertices = [
            new Vector3(-size.x/2, -size.y/2, -size.z/2),
            new Vector3(-size.x/2, -size.y/2, size.z/2),
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
