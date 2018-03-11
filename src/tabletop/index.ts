import * as $ from "jquery";

export interface TabletopOptions {
	/**
	 * Number of players (1 - 12)
	*/
	players: number;
}

export interface Player {
	name: string;
}

export class Tabletop {
	protected players: Player[];

	constructor(
		protected $canvas: JQuery<HTMLElement>,
		protected opts: TabletopOptions
	) {
		this.initializePlayers();
		this.$canvas.append(`<p>Number of players: ${opts.players}`);
	}

	private initializePlayers() {
		this.players = [];
		for (let i = 0; i < this.opts.players; i++) {
			this.players.push({
				name: `Player ${i + 1}`
			});
		}
	}
}
