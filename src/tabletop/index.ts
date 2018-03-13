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

export abstract class Tabletop {
	protected players: Player[];

	constructor(
		protected container: JQuery<HTMLElement>,
		protected opts: TabletopOptions
	) {
		this.initializePlayers();
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
