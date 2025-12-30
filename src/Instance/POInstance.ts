/*
src/Instance/index.ts

Defines the Physical Object Instance abstract class.
 */


import { Instance } from './Instance';
import { CFrame, Vector3 } from "../ZMath";

export abstract class POInstance extends Instance
{
    public Origin: CFrame = new CFrame(Vector3.zero, Vector3.zero);

    public get Position(): Vector3
    { return this.Origin.Position; }

    public set Position(position: Vector3)
    { this.Origin = new CFrame(position, this.Rotation); }

    public get Rotation(): Vector3
    { return this.Origin.Rotation; }

    public set Rotation(rotation: Vector3)
    { this.Origin = new CFrame(this.Position, rotation); }
}
