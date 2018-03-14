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
		protected opts: TabletopOptions
	) {
		this.initializePlayers();
		this.initializeDom();
	}

	protected initializePlayers() {
		this.players = [];
		for (let i = 0; i < this.opts.players; i++) {
			this.players.push(new Player(this.$container, `Player ${i + 1}`));
		}
	}

	protected initializeDom() {
		this.$center = $(`<div class="gameboard__center"></div>`);
		this.$container.append(this.$center);
	}
}

export * from "./player";
