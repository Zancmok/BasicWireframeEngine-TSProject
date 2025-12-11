/*
src/index.ts

The entry point file of the project.
 */

import { ZMath } from './ZMath';

namespace Wireframe
{
    import Vector2 = ZMath.Vector2;

    /**
     * The entry point of the project.
     * @returns {void}
     * */
    export function main(): void
    {
        let x: Vector2 = new Vector2(1, 2);
        let y: Vector2 = new Vector2(1, 2);

        console.log(Vector2.mul(Vector2.add(x, y), -12).toString());
    }
}

Wireframe.main();
