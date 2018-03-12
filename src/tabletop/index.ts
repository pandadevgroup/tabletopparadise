import * as $ from "jquery";

declare const Phaser: any;

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

	constructor(
		protected $canvas: JQuery<HTMLElement>,
		protected opts: TabletopOptions
	) {
		this.initializePlayers();
		this.initializeGame();
	}

	private initializePlayers() {
		this.players = [];
		for (let i = 0; i < this.opts.players; i++) {
			this.players.push({
				name: `Player ${i + 1}`
			});
		}
	}

	private initializeGame() {
		let config = {
			type: Phaser.AUTO,
			width: 1900,
			height: 700,
			canvas: this.$canvas[0],
			scene: {
				preload: preload,
				create: create
			}
		};

		let game = new Phaser.Game(config);

		let _this = this;

		function preload() {
			this.load.setBaseURL('/assets');
			_this.preload.call(this);
		}

		function create() {
			_this.initialize.call(this);
		}
	}

	protected abstract preload();
	protected abstract initialize();
}
