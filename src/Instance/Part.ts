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
}
