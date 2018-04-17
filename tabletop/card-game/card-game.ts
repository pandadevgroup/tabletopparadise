/**
 * @module CardGame
 */
import { BaseGame } from "../base-game";
import { Card } from "./card";
import { Deck } from "./deck";

export interface CardGameOptions {
	/**
	 * Number of cards to deal to each player in the beginning of the game.
	 *
	 * @example 13 (Bridge)
	 * @type {number} initialHandSize
	 */
	initialHandSize: number;
	/**
	 * If true, render a deck of cards.
	 * Override CardGame.onDeckClick() to add handler when deck is clicked.
	 *
	 * @type {boolean} showDeck
	 */
	showDeck: boolean;

	/**
	 * If true or omitted, or if a shuffle function is provided, shuffle the deck before dealing.
	 * Otherwise deal without shuffling (defualt deck is AofClubs, AofDiamonds, AofHearts, AofSpades, 2OfClubs...KofSpades)
	 *
	 * @type {((cards: Card[]) => Card[]) | boolean} [shuffle=true]
	 */
	shuffle?: ((cards: Card[]) => Card[]) | boolean;
}

export class CardGame extends BaseGame {
	protected deck: Deck;

	constructor(
		protected $container: JQuery<HTMLElement>,
		public opts: CardGameOptions
	) {
		super($container);
	}

	async initialize() {
		this.deck = new Deck(this.domHelper, this.opts.showDeck);
	}

	runHostSetup() {
		if (this.opts.shuffle !== false) this.deck.shuffle(
			typeof this.opts.shuffle === "boolean" ? undefined : this.opts.shuffle
		);
	}
}
