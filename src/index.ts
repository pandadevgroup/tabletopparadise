import * as $ from "jquery";
import Tabletop from "./tabletop";

const tabletop = new Tabletop($("#game") as JQuery<HTMLCanvasElement>);

console.log(tabletop);
