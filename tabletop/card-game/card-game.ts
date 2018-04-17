/**
 * @module CardGame
 */
import { BaseGame } from "../base-game";
import { Card } from "./card";
import { Deck } from "./deck";
import { CardGameDomHelper } from "./dom-helper";
import { CardGamePlayer } from "./player";
import * as actions from "./actions";

export interface CardGameOptions {
	/**
	 * Number of cards to deal to each player in the beginning of the game.
	 *
	 * @example 13 (Bridge)
	 * @type {number} initialHandSize
	 */
	initialHandSize?: number;
	/**
	 * If true, render a deck of cards.
	 * Override CardGame.onDeckClick() to add handler when deck is clicked.
	 *
	 * @type {boolean} showDeck
	 */
	showDeck?: boolean;

	/**
	 * If true or omitted, or if a shuffle function is provided, shuffle the deck before dealing.
	 * Otherwise deal without shuffling (defualt deck is AofClubs, AofDiamonds, AofHearts, AofSpades, 2OfClubs...KofSpades)
	 *
	 * @type {((cards: Card[]) => Card[]) | boolean} [shuffle=true]
	 */
	shuffle?: ((cards: Card[]) => Card[]) | boolean;
}

export class CardGame extends BaseGame<CardGameDomHelper, CardGamePlayer> {
	protected deck: Deck;
	protected deckSynced = false;

	constructor(
		protected $container: JQuery<HTMLElement>,
		public opts: CardGameOptions = {}
	) {
		super($container, CardGameDomHelper, CardGamePlayer);
		opts.showDeck = opts.showDeck || false;
		opts.initialHandSize = opts.initialHandSize || 13;
	}

	async initialize() {
		this.deck = new Deck(this.domHelper, this.tabletop, this.opts.showDeck, this);
	}

	initializeListeners() {
		this.server.on(actions.DECK_SYNC, action => {
			this.deckSynced = true;

			let deck = action.payload.deck;
			this.deck.setDeckOrder(deck);
		});
	}

	runHostSetup() {
		if (!this.deckSynced) {
			if (this.opts.shuffle !== false) this.deck.shuffle(
				typeof this.opts.shuffle === "boolean" ? undefined : this.opts.shuffle
			);
			this.server.dispatch(
				new actions.DeckSync({
					deck: this.deck.getCardIds()
				})
			);
		}
	}

	onDeckClick() {
		console.log("Deck clicked");
	}

	render() {
		this.deck.render();
		this.deck.setActionable(true);
	}

	resize() {
		super.resize();
		this.deck.resize();
	}
}
