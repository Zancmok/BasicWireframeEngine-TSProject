/*
src/Renderer/Renderer.ts

Defines the Renderer class.
 */

import { Camera } from "Renderer";

/**
 * A class defining the main renderer
 * */
export class Renderer
{
    private cam: Camera;
    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;

    constructor(cam: Camera, canvas: HTMLCanvasElement)
    {
        this.cam = cam;
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    /**
     * Draws the current frame to the canvas.
     */
    public draw(): void
    {
        this.canvasContext.fillRect(50, 50, 100, 65);
    }
}
