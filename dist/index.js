/*
src/index.ts

The entry point file of the project.
 */
import { ZMath } from './ZMath';
var Wireframe;
(function (Wireframe) {
    var Vector2 = ZMath.Vector2;
    /**
     * The entry point of the project.
     * @returns {void}
     * */
    function main() {
        let x = new Vector2(1, 2);
        let y = new Vector2(1, 2);
        console.log(Vector2.mul(Vector2.add(x, y), -12).toString());
    }
    Wireframe.main = main;
})(Wireframe || (Wireframe = {}));
Wireframe.main();
