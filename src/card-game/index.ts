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
	 * @example 13 (Bridge)
	 */
	initialHandSize: number;
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
			loader.add(`${num}c`, `/assets/cards/clubs/${i}c.svg`);
			loader.add(`${num}d`, `/assets/cards/diamonds/${i}d.svg`);
			loader.add(`${num}h`, `/assets/cards/hearts/${i}h.svg`);
			loader.add(`${num}s`, `/assets/cards/spades/${i}s.svg`);
		}

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
			cardSprite.y = 200;
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
}
