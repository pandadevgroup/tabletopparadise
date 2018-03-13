import { Tabletop, TabletopOptions, Player } from "../tabletop";
import { Deck } from "./deck";
import { Card } from "./card";

export interface CardGamePlayer extends Player {
	cards: Card[];
}

export interface CardGameOptions extends TabletopOptions {
	/**
	 * Number of cards to deal to each player in the beginning of the game.
	 *
	 * @example 13 (Bridge)
	 * @type {number}
	 * @memberof CardGameOptions
	 */
	initialHandSize: number;
	/**
	 * If true, render a deck of cards.
	 * Override CardGame.onDeckClick() to add handler when deck is clicked.
	 *
	 * @type {boolean}
	 * @memberof CardGameOptions
	 */
	showDeck: boolean;
}

export abstract class CardGame extends Tabletop {
	protected players: CardGamePlayer[];
	protected deck: Deck;

	constructor(
		protected $container: JQuery<HTMLElement>,
		protected opts: CardGameOptions
	) {
		super($container, opts);
		this.deck = new Deck();
		this.dealInitialCards();

		if (this.opts.showDeck) this.renderDeck();
	}

	protected dealInitialCards() {
		this.players.forEach(player => player.cards = this.deck.get(this.opts.initialHandSize));
	}

	protected renderDeck() {
		let $deck = this.$container.append("<div class='deck'>Deck</div>");
		$deck[0].velocity({ "color": "red" });
	}

	protected onDeckClick() {}
}
