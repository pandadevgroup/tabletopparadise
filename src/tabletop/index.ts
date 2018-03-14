import "../styles/index.scss";
import { Player } from "./player";
import Utils from "../util";

export interface TabletopOptions {
	/**
	 * Number of players (1 - 12)
	*/
	players: number;
}

export abstract class Tabletop {
	protected players: Player[];
	protected $center: JQuery<HTMLElement>;

	constructor(
		protected $container: JQuery<HTMLElement>,
		protected opts: TabletopOptions,
		protected PlayerClass: typeof Player
	) {
		this.initializeDom();
		this.initializePlayers();
	}

	protected initializePlayers() {
		this.players = [];
		for (let i = 0; i < this.opts.players; i++) {
			this.players.push(new this.PlayerClass(this.$container, `Player ${i + 1}`));
		}
	}

	protected initializeDom() {
		this.$center = $(`<div class="gameboard__center"></div>`);
		this.$container.append(this.$center);
	}
}

export * from "./player";
