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
	 * @type {number} initialHandSize
	 * @memberof CardGameOptions
	 */
	initialHandSize: number;
	/**
	 * If true, render a deck of cards.
	 * Override CardGame.onDeckClick() to add handler when deck is clicked.
	 *
	 * @type {boolean} showDeck
	 * @memberof CardGameOptions
	 */
	showDeck: boolean;

	/**
	 * If true or omitted, or if a shuffle function is provided, shuffle the deck before dealing.
	 * Otherwise deal without shuffling(defualt deck is AofClubs, AofDiamonds, AofHearts, AofSpades, 2OfClubs...KofSpades)
	 *
	 *
	 * @type {((cards: Card[]) => Card[]) | boolean} [shuffle=true]
	 * @memberof CardGameOptions
	 */
	shuffle? : ((cards: Card[]) => Card[]) | boolean;
	//or undefined
}

export abstract class CardGame extends Tabletop {
	protected players: CardGamePlayer[];
	protected deck: Deck;

	constructor(
		protected $container: JQuery<HTMLElement>,
		protected opts: CardGameOptions
	) {
		super($container, opts, CardGamePlayer);
		this.renderPlayers();

		this.deck = new Deck(this.$center);
		if (this.opts.shuffle !== false) this.deck.shuffle(
			typeof this.opts.shuffle === "boolean" ? undefined : this.opts.shuffle
		);
		this.dealInitialCards();
		if (this.opts.showDeck) this.renderDeck();

		this.startGame();
	}

	protected dealInitialCards() {
		this.players.forEach(player => player.addCards(this.deck.get(this.opts.initialHandSize)));
	}

	protected renderDeck() {
		this.deck.render();
	}

	protected renderPlayers() {
		const numPlayers = this.opts.players;
		this.players.forEach((player, i) => player.renderPlayer(i + 1, numPlayers));
	}

	protected onDeckClick() {}
	protected abstract startGame();
}

export * from "./card";
export * from "./deck";
export * from "./player";
