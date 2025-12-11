/*
src/ZMath/Vector2.ts

Defines a Vector2 class.
 */
export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    /**
     * Returns a Vector2(0, 0)
     * @returns {Vector2}
     * */
    static get zero() { return new Vector2(0, 0); }
    /**
     * Returns a Vector2(1, 1)
     * @returns {Vector2}
     * */
    static get one() { return new Vector2(1, 1); }
    toString() { return `Vector2(${this.x}, ${this.y})`; }
    /**
     * A getter returning an absolute value of the Vector2.
     * @returns {number}
     * */
    abs() { return Math.sqrt(this.x * this.x + this.y * this.y); }
    /**
     * A static method adding 2 vectors together.
     * @returns {Vector2}
     * */
    static add(v1, v2) { return new Vector2(v1.x + v2.x, v1.y + v2.y); }
    /**
     * A static method subtracting 2 vectors together.
     * @returns {Vector2}
     * */
    static sub(v1, v2) { return new Vector2(v1.x - v2.x, v1.y - v2.y); }
    /**
     * A static method multiplying a vector by a scalar.
     * @returns {Vector2}
     * */
    static mul(vector, scalar) { return new Vector2(vector.x * scalar, vector.y * scalar); }
    /**
     * A static method dividing a vector by a scalar.
     * @returns {Vector2}
     * */
    static div(vector, scalar) { return new Vector2(vector.x / scalar, vector.y / scalar); }
}
