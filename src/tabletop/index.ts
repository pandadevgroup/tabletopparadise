import * as $ from "jquery";
import * as PIXI from "pixi.js";

export interface TabletopOptions {
	/**
	 * Number of players (1 - 12)
	*/
	players: number;
}

export interface Player {
	name: string;
}

export abstract class Tabletop {
	protected players: Player[];
	protected app: PIXI.Application;

	constructor(
		protected $canvas: JQuery<HTMLCanvasElement>,
		protected opts: TabletopOptions
	) {
		this.initializePlayers();
		this.initializePixi();
	}

	private initializePlayers() {
		this.players = [];
		for (let i = 0; i < this.opts.players; i++) {
			this.players.push({
				name: `Player ${i + 1}`
			});
		}
	}

	private initializePixi() {
		let type = "WebGL"
		if(!PIXI.utils.isWebGLSupported()){
			type = "canvas";
		}
		PIXI.utils.sayHello(type);

		this.app = new PIXI.Application({
			width: 1800,
			height: 700,
			view: this.$canvas[0],
			antialias: true
		});
	}
}
