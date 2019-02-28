/**
 * @module CardGame
 */
import { BaseGame } from "../base-game";
import { Card } from "./card";
import { Deck } from "./deck";
import { CardGameDomHelper } from "./dom-helper";
import { CardGamePlayer } from "./player";
import * as actions from "./actions";
import { CardGameTabletop } from "./tabletop";
import { ServerConnection } from "../server";
import { CardUtils } from "./utils";

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

	/**
	 * How to sort player's hands.
	 */
	sortMethod?: any;
}

export class CardGame<
	DomHelperType extends CardGameDomHelper = CardGameDomHelper,
	PlayerType extends CardGamePlayer = CardGamePlayer,
	TabletopType extends CardGameTabletop = CardGameTabletop,
	ServerConnectionType extends ServerConnection = ServerConnection,
	DeckType extends Deck = Deck,
> extends BaseGame<CardGameDomHelper, CardGamePlayer, CardGameTabletop> {
	protected domHelper: DomHelperType;
	protected server: ServerConnectionType;
	protected players: { [id: string]: PlayerType };
	protected player: PlayerType;
	protected tabletop: TabletopType;
	protected opts: CardGameOptions = {
		showDeck: false,
		initialHandSize: 13,
		sortMethod: CardUtils.COMPARE_BY_VALUE
	};

	protected deck: DeckType;
	protected deckSynced = false;

	constructor(
		protected $container: JQuery<HTMLElement>,
		protected DomHelperClass: any = CardGameDomHelper,
		protected PlayerClass: any = CardGamePlayer,
		protected TabletopClass: any = CardGameTabletop,
		protected ServerConnectionClass: any = ServerConnection,
		protected DeckClass: any = Deck
	) {
		super($container, DomHelperClass, PlayerClass, TabletopClass, ServerConnectionClass);
		this.initOpts();
	}

	/**
	 * Override this method to customize game options.
	 */
	initOpts() {}

	async initialize() {
		this.deck = new this.DeckClass(this.domHelper, this.tabletop, this.opts.showDeck, this);
		this.tabletop.showDeck = this.opts.showDeck;
	}

	initializeTabletop() {
		// Since this.opts is not initialized yet, default showDeck to false.
		// showDeck will be set in the async initialize() function that is called
		// after this.opts is initialized.
		this.tabletop = new this.TabletopClass(this.$container, this.domHelper, false);
	}

	initializeLayoutOpts() {
		this.domHelper.layoutOpts = {
			cardWidth: 125,
			cardHeight: 175,
			playerPadding: 20,
			cardSpacing: 30,
			cardShift: 20,
			playerWidth: 140,
			playerHeight: 40
		};
	}

	initializeListeners() {
		this.server.on(actions.DECK_SYNC_ACTION, action => {
			if (this.deckSynced) return;

			this.deckSynced = true;

			let hands = action.payload.hands;
			hands.forEach(hand => {
				const cards = this.deck.getCardsFromIds(hand.cardIds);
				this.players[hand.playerId].setCards(cards);
			});

			let deck = action.payload.deck;
			this.deck.setDeckOrder(deck);
		});
	}

	runHostSetup() {
		if (!this.deckSynced) {
			this.deckSynced = true;

			if (this.opts.shuffle !== false) this.deck.shuffle(
				typeof this.opts.shuffle === "boolean" ? undefined : this.opts.shuffle
			);
			this.dealInitialCards(this.opts.initialHandSize);
			this.server.dispatch(
				new actions.DeckSyncAction({
					deck: this.deck.getCardIds(),
					hands: Object.values(this.players).map(player => ({
						playerId: player.id,
						cardIds: player.getCardIDs()
					}))
				})
			);
		}
	}

	async initializePlayers() {
		let players = await this.server.getAllPlayers();
		let localPlayerId = this.server.getLocalPlayerId();

		let localPlayerPosition = -1;
		this.players = {};
		players.map((playerInfo, i) => {
			if (playerInfo.id === localPlayerId) localPlayerPosition = i;
			this.players[playerInfo.id] = new this.PlayerClass(
				playerInfo.id,
				playerInfo.username,
				playerInfo.isHost,
				playerInfo.id === localPlayerId,
				null,
				i,
				playerInfo.id !== localPlayerId,
				this.opts.sortMethod,
				this.domHelper,
				this.tabletop,
				this
			);
		});
		this.player = this.players[localPlayerId];

		let playerPositions;
		if (players.length === 2) playerPositions = ["bottom", "top"];
		else if (players.length === 3) playerPositions = ["bottom", "left", "right"];
		else playerPositions = ["bottom", "left", "top", "right"];

		Object.values(this.players).map((player, i) => {
			player.position = playerPositions[Math.abs(localPlayerPosition - i)]
		});
	}

	protected drawCard(player: CardGamePlayer = this.player) {
		let cards = this.deck.get(1);
		player.addCards(cards);
		if (this.deck.cards.length === 0) this.deck.setActionable(false);
		player.resize();
		return cards[0];
	}

	protected dealInitialCards(numOfCards) {
		Object.values(this.players).forEach(player => player.addCards(this.deck.get(numOfCards)));
	}

	protected playCards(player: CardGamePlayer, cards: Card[]) {
		player.removeCards(cards);
		cards.forEach(card => card.playedBy = player.id);
		this.tabletop.playCards(player.position, cards);
		player.resize();
	}

	protected getPlayerWithNumber(playerNumber: number) {
		return Object.values(this.players).find(player => player.playerNumber === playerNumber);
	}

	protected getPlayerWithId(playerId: string) {
		return Object.values(this.players).find(player => player.id === playerId);
	}

	updateLayoutOpts() {
		if (this.tabletop.height <= 1000) {
			this.domHelper.layoutOpts.cardWidth = 100;
			this.domHelper.layoutOpts.cardHeight = 140;
		} else {
			this.domHelper.layoutOpts.cardWidth = 125;
			this.domHelper.layoutOpts.cardHeight = 175;
		}
	}

	onDeckClick() {}

	/**
	 * Called when the local player's selected cards changes.
	 *
	 * This is typically due to the player selecting a card.
	 */
	onSelectedCardsChange(selectedCards: Card[]) {}

	render() {
		super.render();
		this.deck.render();
		this.deck.setActionable(true);
	}

	resize() {
		super.resize();
		this.deck.resize();
	}
}
