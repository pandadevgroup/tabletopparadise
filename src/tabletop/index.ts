import "../styles/index.scss";
import { Player } from "./player";
import Utils from "../util";

export abstract class TabletopOptions {
	/**
	 * Number of players (1 - 12)
	*/
	abstract players: number;
}

export abstract class Tabletop {
	protected players: Player[] = [];
	protected layout: {
		width: number,
		height: number
	} = {
		width: 1080,
		height: 720
	};

	constructor(
		protected $container: JQuery<HTMLElement>,
		protected opts: TabletopOptions,
		protected PlayerClass: typeof Player
	) {
		this.initializeDom();
		this.initializePlayers();
	}

	protected initializeDom() {
		$(window).resize(() => {
			this.resize();
			this.players.forEach(player => player.resize());
		});
	}

	protected resize() {
		this.layout = {
			width: this.$container.width(),
			height: this.$container.height()
		};
	}

	protected initializePlayers() {
		this.players = [];
		for (let i = 0; i < this.opts.players; i++) {
			this.players.push(new this.PlayerClass(this.$container, this, `Player ${i + 1}`));
		}
	}
}

export * from "./player";
