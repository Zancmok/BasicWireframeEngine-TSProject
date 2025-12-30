/*
src/Instance/index.ts

Defines the Physical Object Instance abstract class.
 */


import { Instance } from './Instance';
import { CFrame, Vector3 } from "../ZMath";

export abstract class POInstance extends Instance
{
    public Origin: CFrame = new CFrame(Vector3.zero, Vector3.zero);
}
