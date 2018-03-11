import * as $ from "jquery";

export interface TabletopOptions {
	/**
	 * Number of players (1 - 12)
	*/
	players: number;
}

export class Tabletop {
	constructor(
		private canvas: JQuery<HTMLCanvasElement>,
		private opts: TabletopOptions
	) {
		console.log(canvas);
	}
}
