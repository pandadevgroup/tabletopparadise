import { Tabletop, TabletopOptions, Player } from "../tabletop";
import { Deck } from "./deck";
import { Card } from "./card";

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

export abstract class CardGame extends Tabletop {
	protected players: CardGamePlayer[];
	protected deck: Deck;

	constructor(
		protected canvas: JQuery<HTMLElement>,
		protected opts: CardGameOptions
	) {
		super(canvas, opts);
		this.deck = new Deck();
		this.dealInitialCards();

		this.players.forEach(player => this.canvas.append(
			`
				<p>${ player.name }</p>
				<p>${ player.cards.join(", ") }</p>
			`
		));
	}

	protected dealInitialCards() {
		this.players.forEach(player => player.cards = this.deck.get(this.opts.initialHandSize));
	}
}
