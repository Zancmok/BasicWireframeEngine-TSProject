import { POInstance } from "./POInstance";
import {Instance} from "./Instance";
import {World} from "./World";
import {Vector3} from "../ZMath";
import {Part} from "./Part";

export class Camera extends POInstance
{
    public FieldOfView: number = 90;
    public canvas: HTMLCanvasElement;
    public canvasContext: CanvasRenderingContext2D;

    public constructor(canvas: HTMLCanvasElement) {
        super();

        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    public Render(): void
    {
        // Clear the screen
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Find the World of this Camera
        let highestParent: Instance = this;
        while (highestParent.Parent !== null)
        { highestParent = highestParent.Parent; }

        // Make sure the World of this Camera actually is a World
        if (!(highestParent instanceof World))
        { throw new Error("Camera is not a descendant of any World!"); }

        // Loop through all descendants of World
        for (let instance of highestParent.GetDescendants())
        {
            // Skip if it's not a Part
            if (!(instance instanceof Part))
            { continue; }


        }
    }
}
