/*
src/Instance/index.ts

Defines the Physical Object Instance abstract class.
 */


import { Instance } from './Instance';
import { CFrame, Vector3 } from "../ZMath";

export abstract class POInstance extends Instance
{
    public Origin: CFrame = new CFrame(Vector3.zero, Vector3.zero);

    public get CFrame(): CFrame
    { return this.Origin; }

    public set CFrame(cFrame: CFrame)
    { this.Origin = cFrame; }

    public get Position(): Vector3
    { return this.CFrame.Position; }

    public set Position(position: Vector3)
    { this.CFrame = new CFrame(position, this.Rotation); }

    public get Rotation(): Vector3
    { return this.CFrame.Rotation; }

    public set Rotation(rotation: Vector3)
    { this.CFrame = new CFrame(this.Position, rotation); }
}
