import { Tabletop, TabletopOptions } from "../tabletop";
import { CardGamePlayer } from "./player";
import { Deck } from "./deck";
import { Card } from "./card";
import Utils from "../util";
import "../styles/cards/index.scss";
import { CardGameDomHelper } from "./dom-helper";

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
}

export abstract class CardGame {
	protected players: CardGamePlayer[];
	protected deck: Deck;
	protected domHelper: CardGameDomHelper;
	tabletop: Tabletop;
	layoutOpts = {
		cardWidth: 125,
		cardHeight: 175,
		playerPadding: 20,
		cardSpacing: 30
	};

	constructor(
		protected $container: JQuery<HTMLElement>,
		protected opts: CardGameOptions
	) {
		this.domHelper = new CardGameDomHelper(this.$container);
		this.tabletop = new Tabletop($container, {
			players: opts.players
		}, this.domHelper);

		this.initializeDom();
		this.initializePlayers();
		this.initializeDeck();

		this.resize();
		this.domHelper.renderFrag();

		this.startGame();
	}

	protected initializeDom() {
		let debounce;
		$(window).resize(() => {
			clearTimeout(debounce);
			debounce = setTimeout(() => this.resize(), 200);
		});
	}

	protected initializeDeck() {
		this.deck = new Deck(this.domHelper, this, this.opts.showDeck);
		if (this.opts.shuffle !== false) this.deck.shuffle(
			typeof this.opts.shuffle === "boolean" ? undefined : this.opts.shuffle
		);
		this.dealInitialCards();
		if (this.opts.showDeck) this.deck.actionable = true;
		this.deck.onClick(() => this.onDeckClick());
	}

	protected resize() {
		this.tabletop.resize();
		if (this.opts.showDeck) this.deck.resize();
		this.players.forEach(player => player.resize());
	}

	protected dealInitialCards() {
		this.players.forEach(player => player.addCards(this.deck.get(this.opts.initialHandSize)));
	}

	protected initializePlayers() {
		this.players = [];
		for (let i = 0; i < this.opts.players; i++) {
			this.players.push(new CardGamePlayer(this.domHelper, this, `Player ${i + 1}`));
		}
	}

	protected onDeckClick() {}
	protected abstract startGame();
}

export * from "./card";
export * from "./deck";
export * from "./player";
