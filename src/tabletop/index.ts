import "../styles/index.scss";
import { Player } from "./player";
import Utils from "../util";
import { DomHelper } from "./dom-helper";

export abstract class TabletopOptions {
	/**
	 * Number of players (1 - 12)
	*/
	abstract players: number;
}

export class Tabletop {
	protected players: Player[] = [];
	protected layout: {
		width: number,
		height: number
	} = {
		width: 1080,
		height: 720
	};
	protected domHelper: DomHelper;

	constructor(
		protected $container: JQuery<HTMLElement>,
		protected opts: TabletopOptions,
		protected PlayerClass: typeof Player
	) {
		this.domHelper = new DomHelper();
		this.initializePlayers();
	}

	protected resize() {
		this.layout = {
			width: this.$container.width(),
			height: this.$container.height()
		};
		this.players.forEach(player => player.resize());
	}

	protected initializePlayers() {
		this.players = [];
		for (let i = 0; i < this.opts.players; i++) {
			this.players.push(new this.PlayerClass(this.domHelper, this, `Player ${i + 1}`));
		}
	}
}

export * from "./player";
