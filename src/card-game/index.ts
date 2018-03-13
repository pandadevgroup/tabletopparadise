import { Tabletop, TabletopOptions, Player } from "../tabletop";
import { OutlineFilter } from '@pixi/filter-outline';
import { Deck } from "./deck";
import { Card } from "./card";

const resources = PIXI.loader.resources,
	loader = PIXI.loader,
	Sprite = PIXI.Sprite;

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
	protected selectedCardSprite: PIXI.Sprite;

	constructor(
		protected $canvas: JQuery<HTMLCanvasElement>,
		protected opts: CardGameOptions
	) {
		super($canvas, opts);
		this.loadCards();
		this.loadResources();
		this.deck = new Deck();
		this.dealInitialCards();

		loader.load(() => {
			this.renderPlayerCards();
			if (this.opts.showDeck) this.renderDeck();
			this.setup();
		});
	}

	protected loadCards() {
		let num;
		for (let i = 1; i <= 13; i++) {
			if (i <= 10) {
				num = i;
			} else if (i == 11) {
				num = "j"
			} else if (i == 12) {
				num = "q"
			} else if (i == 13) {
				num = "k"
			}
			loader.add(`${num}c`, `/assets/cards/clubs/${num}c.svg`);
			loader.add(`${num}d`, `/assets/cards/diamonds/${num}d.svg`);
			loader.add(`${num}h`, `/assets/cards/hearts/${num}h.svg`);
			loader.add(`${num}s`, `/assets/cards/spades/${num}s.svg`);
		}
		loader.add("card_back", "/assets/cards/card_back.png");
	}

	protected dealInitialCards() {
		this.players.forEach(player => player.cards = this.deck.get(this.opts.initialHandSize));
	}

	protected renderPlayerCards() {
		let cards = this.players[0].cards;

		let xOffset = 0;

		cards.forEach(card => {
			let cardSprite = new Sprite(resources[card.getImgName()].texture);

			cardSprite.x = xOffset;
			xOffset += 60;
			cardSprite.y = 600;
			cardSprite.interactive = true;
			cardSprite.buttonMode = true;

			cardSprite.on("pointerdown", () => {
				if (cardSprite.filters && cardSprite.filters.length != 0) {
					cardSprite.filters = [];
					this.selectedCardSprite = null;
				} else {
					cardSprite.filters = [new OutlineFilter(4, 0xFF0000)];
					if (this.selectedCardSprite) this.selectedCardSprite.filters = [];
					this.selectedCardSprite = cardSprite;
				}
			});

			cardSprite.on("mouseover", () => {
				cardSprite.y -= 30;
			});
			cardSprite.on("mouseout", () => {
				cardSprite.y += 30;
			});

			this.app.stage.addChild(cardSprite);
		});
	}

	protected renderDeck() {
		let deckSprite = new Sprite(resources["card_back"].texture);

		deckSprite.x = 50;
		deckSprite.y = 200;
		deckSprite.height = 314;
		deckSprite.width = 225;
		deckSprite.buttonMode = true;
		deckSprite.interactive = true;

		deckSprite.on("pointerdown", () => {
			this.onDeckClick();
		});

		this.app.stage.addChild(deckSprite);
	}

	protected onDeckClick() {}
}
