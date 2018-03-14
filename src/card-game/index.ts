import { Tabletop, TabletopOptions, Player } from "../tabletop";
import { CardGamePlayer } from "./player";
import { Deck } from "./deck";
import { Card } from "./card";
import Utils from "../util";
import "../styles/cards/index.scss";

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
		super($container, opts, CardGamePlayer);
		this.deck = new Deck(this.$center);
		this.dealInitialCards();

		if (this.opts.showDeck) this.renderDeck();
		this.renderPlayers();

		this.startGame();
	}

	protected dealInitialCards() {
		this.players.forEach(player => player.cards = this.deck.get(this.opts.initialHandSize));
	}

	protected renderDeck() {
		this.deck.render();
	}

	protected renderPlayers() {
		const numPlayers = this.opts.players;
		this.players.forEach((player, i) => player.renderContainer(i + 1, numPlayers));
	}

	protected onDeckClick() {}
	protected abstract startGame();
}

export * from "./card";
export * from "./deck";
export * from "./player";
