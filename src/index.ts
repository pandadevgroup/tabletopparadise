import * as $ from "jquery";
import { Tabletop, TabletopOptions } from "./tabletop";

const tabletop = new Tabletop(
	$("#game") as JQuery<HTMLCanvasElement>,
	{
		players: 4
	}
);

console.log(tabletop);
