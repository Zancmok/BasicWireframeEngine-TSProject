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
            let vertice1: Vector3 = Vector3.add(this.Vertices[connection[0]], this.Position);
            let vertice2: Vector3 = Vector3.add(this.Vertices[connection[1]], this.Position);

            let rotation: Vector3 = Vector3.Hadamard(
                new Vector3(1, Math.sin(this.Rotation.x), Math.cos(this.Rotation.x)),
                new Vector3(Math.cos(this.Rotation.y), 1, Math.sin(this.Rotation.y)),
                new Vector3(Math.sin(this.Rotation.z), Math.cos(this.Rotation.z), 1)
            );

            output.push([
                Vector3.Hadamard(vertice1, rotation),
                Vector3.Hadamard(vertice2, rotation)
            ]);
        }

        return output;
    }
}
