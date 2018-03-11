import { Tabletop, TabletopOptions, Player } from "../tabletop";

export interface Card {
	/**
	 * 1 - 13, Ace is 1, King is 13
	 */
	number: number;
}

export interface CardGamePlayer extends Player {
	cards: Card[];
}

export interface CardGameOptions extends TabletopOptions {
	/**
	 * Number of cards to deal to each player in the beginning of the game.
	 * @example 13 (Bridge)
	 */
	initialHandSize: number;
}

export class CardGame extends Tabletop {
	protected players: CardGamePlayer[];

	constructor(
		protected canvas: JQuery<HTMLElement>,
		protected opts: TabletopOptions
	) {
		super(canvas, opts);
		this.dealInitialCards();
	}

	protected dealInitialCards() {
		this.players.forEach(player => {
			player.cards = [];
		});
	}
}
