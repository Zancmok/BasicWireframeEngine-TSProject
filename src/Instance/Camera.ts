import { POInstance } from "./POInstance";
import {Instance} from "./Instance";
import {World} from "./World";
import {Vector2, Vector3} from "../ZMath";
import {Part} from "./Part";

export class Camera extends POInstance
{
    public FieldOfView: number = 90;
    protected canvas: HTMLCanvasElement;
    protected canvasContext: CanvasRenderingContext2D;

    public constructor(canvas: HTMLCanvasElement) {
        super();

        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;

        this.canvasContext.fillStyle = "black";
    }

    private projectPoint(point: Vector3): Vector2
    {
        return new Vector2(
            this.canvas.width / 2 + this.FieldOfView * point.x / point.z,
            this.canvas.height / 2 - this.FieldOfView * point.y / point.z
        );
    }

    private drawLine(start: Vector3, end: Vector3): void
    {
        start = Vector3.rotateEuler(Vector3.sub(start, this.Position), Vector3.mul(this.Rotation, -1));
        end = Vector3.rotateEuler(Vector3.sub(end, this.Position), Vector3.mul(this.Rotation, -1));

        // If behind the camera
        if (start.z <= 0 || end.z <= 0)
        { return; }

        let projectedStart: Vector2 = this.projectPoint(start);
        let projectedEnd: Vector2 = this.projectPoint(end);

        this.canvasContext.beginPath();
        this.canvasContext.moveTo(Math.round(projectedStart.x) + 0.5, Math.round(projectedStart.y) + 0.5);
        this.canvasContext.lineTo(Math.round(projectedEnd.x) + 0.5, Math.round(projectedEnd.y) + 0.5);
        this.canvasContext.stroke();
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

            // Draw the individual line
            for (let line of instance.GetLines())
            { this.drawLine(line[0], line[1]); }
        }
    }
}
