import * as $ from "jquery";
import "pixi.js";

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

	protected abstract loadResources();
	protected abstract setup();

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
			view: this.$canvas[0],
			antialias: true,
			transparent: true
		});

		this.app.renderer.view.style.position = "absolute";
		this.app.renderer.view.style.display = "block";
		this.app.renderer.autoResize = true;
		this.app.renderer.resize(window.innerWidth, window.innerHeight);
	}
}
