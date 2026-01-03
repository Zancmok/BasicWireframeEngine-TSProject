/*
src/ZMath/Vector3.ts

Defines a Vector3 class.
 */

/**
 * A class representing 3dimensional vector
 * */
export class Vector3
{
    public readonly x: number;
    public readonly y: number;
    public readonly z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Returns a Vector3(0, 0, 0)
     * @returns {Vector3}
     * */
    static get zero(): Vector3
    { return new Vector3(0, 0, 0); }

    /**
     * Returns a Vector3(1, 1, 1)
     * @returns {Vector3}
     * */
    static get one(): Vector3
    { return new Vector3(1, 1, 1); }

    toString(): string
    { return `Vector3(${this.x}, ${this.y}, ${this.z})`; }

    /**
     * A getter returning an absolute value of the Vector3.
     * @returns {number}
     * */
    abs(): number
    { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }

    /**
     * A static method adding 2 vectors together.
     * @returns {Vector3}
     * */
    static add(v1: Vector3, v2: Vector3): Vector3
    { return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z); }

    /**
     * A static method subtracting 2 vectors together.
     * @returns {Vector3}
     * */
    static sub(v1: Vector3, v2: Vector3): Vector3
    { return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z); }

    /**
     * A static method multiplying a vector by a scalar.
     * @returns {Vector3}
     * */
    static mul(vector: Vector3, scalar: number): Vector3
    { return new Vector3(vector.x * scalar, vector.y * scalar, vector.z * scalar); }

    /**
     * A static method dividing a vector by a scalar.
     * @returns {Vector3}
     * */
    static div(vector: Vector3, scalar: number): Vector3
    { return new Vector3(vector.x / scalar, vector.y / scalar, vector.z / scalar); }

    /**
     * A static method calculating dot product between 2 vectors.
     * @returns {number}
     */
    static dot(v1: Vector3, v2: Vector3): number
    { return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z; }

    static rotateEuler(vector: Vector3, rotationVector: Vector3): Vector3
    {
        // Convert degrees to radians
        const rotationX: number = rotationVector.x * Math.PI / 180;
        const rotationY: number = rotationVector.y * Math.PI / 180;
        const rotationZ: number = rotationVector.z * Math.PI / 180;

        let x = vector.x;
        let y = vector.y;
        let z = vector.z;

        // Rotate around Y
        [x, z] = [
            x * Math.cos(rotationY) + z * Math.sin(rotationY),
            -x * Math.sin(rotationY) + z * Math.cos(rotationY)
        ];

        // Rotate around X
        [y, z] = [
            y * Math.cos(rotationX) - z * Math.sin(rotationX),
            y * Math.sin(rotationX) + z * Math.cos(rotationX)
        ];

        // Rotate around Z
        [x, y] = [
            x * Math.cos(rotationZ) - y * Math.sin(rotationZ),
            x * Math.sin(rotationZ) + y * Math.cos(rotationZ)
        ];

        return new Vector3(x, y, z);
    }
}
