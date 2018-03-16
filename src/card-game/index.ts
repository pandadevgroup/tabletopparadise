import { Tabletop, TabletopOptions } from "../tabletop";
import { CardGamePlayer } from "./player";
import { Deck } from "./deck";
import { Card } from "./card";
import Utils from "../util";
import "../styles/cards/index.scss";
import { CardGameDomHelper } from "./dom-helper";
import { CardGameTabletop } from "./tabletop";

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
	protected player: CardGamePlayer;
	protected deck: Deck;
	protected domHelper: CardGameDomHelper;
	protected $playButton: JQuery<HTMLElement>;
	private _showPlayButton = false;
	tabletop: CardGameTabletop;
	layoutOpts = {
		cardWidth: 125,
		cardHeight: 175,
		playerPadding: 20,
		cardSpacing: 30,
		cardShift: 20
	};

	constructor(
		protected $container: JQuery<HTMLElement>,
		public opts: CardGameOptions
	) {
		this.domHelper = new CardGameDomHelper(this.$container);
		this.tabletop = new CardGameTabletop($container, {
			players: opts.players
		}, this.domHelper, this);

		this.initializeDom();
		this.initializePlayers();
		this.initializeDeck();

		this.render();
		this.startGame();
	}

	get showPlayButton() {
		return this._showPlayButton;
	}
	set showPlayButton(show: boolean) {
		if (show !== this._showPlayButton) {
			if (show) {
				this.domHelper.showPlayButton(this.$playButton);
			} else {
				this.domHelper.hidePlayButton(this.$playButton);
			}
		}
		this._showPlayButton = show;
	}

	protected initializeDom() {
		this.$playButton = this.domHelper.createPlayButtonFrag();
		this.$playButton.click(() => this.onPlayBtnClick());

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
		if (this.opts.showDeck) this.deck.setAcitonable(true);
	}

	protected resize() {
		this.resizeLayout();
		this.tabletop.resize();

		if (this.opts.showDeck) this.deck.resize();
		this.players.forEach(player => player.resize());
	}

	protected resizeLayout() {
		this.tabletop.layoutResize();

		if (this.tabletop.height <= 1000) {
			this.layoutOpts.cardWidth = 100;
			this.layoutOpts.cardHeight = 140;
		} else {
			this.layoutOpts.cardWidth = 125;
			this.layoutOpts.cardHeight = 175;
		}
	}

	protected render() {
		this.resizeLayout();
		if (this.opts.showDeck) this.deck.render();
		this.players.forEach(player => player.render());
		this.tabletop.render();

		this.domHelper.renderFrag();
	}

	protected dealInitialCards() {
		this.players.forEach(player => player.addCards(this.deck.get(this.opts.initialHandSize)));
	}

	protected initializePlayers() {
		this.players = [];

		let playerPositions;
		if (this.opts.players === 3) playerPositions = ["bottom", "left", "right"];
		else playerPositions = ["bottom", "left", "top", "right"];

		for (let i = 0; i < this.opts.players; i++) {
			this.players.push(new CardGamePlayer(
				this.domHelper,
				this,
				`Player ${i + 1}`,
				playerPositions[i],
				i !== 0,
				i === 0
			));
		}

		this.player = this.players[0];
	}

	protected playSelectedCards() {
		this.playCards(this.player, this.player.selectedCards);
		this.player.clearSelectedCards();
		this.onSelectedCardsChange(this.player.selectedCards);
	}

	protected playCards(player: CardGamePlayer, cards: Card[]) {
		player.removeCards(cards);
		this.tabletop.playCards(player.position, cards);
		player.resize();
	}

	protected drawCard() {
		let cards = this.deck.get(1);
		this.player.addCards(cards);
		if (this.deck.cards.length === 0) this.deck.setAcitonable(false);
		this.player.resize();
		return cards[0];
	}

	onCardClick(player: CardGamePlayer, cardIndex: number, selectedCards: Card[]) {
		if (player.isLocal) {
			this.onSelectedCardsChange(selectedCards);
		}
	}

	onDeckClick() {}
	abstract onSelectedCardsChange(selectedCards: Card[]);
	abstract onPlayBtnClick();
	protected abstract startGame();
}

export * from "./card";
export * from "./deck";
export * from "./player";
