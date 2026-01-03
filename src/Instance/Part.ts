/*
src/Instance/Part.ts

Defines the Part class, the basic building block element.
 */

import { Vector3 } from "../ZMath";
import { POInstance } from "./POInstance";

export abstract class Part extends POInstance
{
    protected abstract Vertices: Vector3[];
    protected abstract Connections: Array<[number, number]>;

    public GetLines(): Array<[Vector3, Vector3]>
    {
        let output: Array<[Vector3, Vector3]> = [];

        for (let connection of this.Connections)
        {
            let vertice1: Vector3 = this.Vertices[connection[0]];
            let vertice2: Vector3 = this.Vertices[connection[1]];

            // Apply the Rotation
            vertice1 = Vector3.rotateEuler(vertice1, this.Rotation);
            vertice2 = Vector3.rotateEuler(vertice2, this.Rotation);

            // Add Origin
            vertice1 = Vector3.add(vertice1, this.Position);
            vertice2 = Vector3.add(vertice2, this.Position);

            output.push([vertice1, vertice2]);
        }

        return output;
    }
}
