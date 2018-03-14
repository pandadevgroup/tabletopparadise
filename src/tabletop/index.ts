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

	constructor(
		protected $container: JQuery<HTMLElement>,
		protected opts: TabletopOptions
	) {
		this.initializePlayers();
	}

	private initializePlayers() {
		this.players = [];
		for (let i = 0; i < this.opts.players; i++) {
			this.players.push(new Player(this.$container, `Player ${i + 1}`));
		}
	}
}

export * from "./player";
