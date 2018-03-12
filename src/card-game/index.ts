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
		for (let i = 1; i <= 10; i++) {
			loader.add(`${i}c`, `/assets/cards/clubs/${i}c.svg`);
			loader.add(`${i}d`, `/assets/cards/diamonds/${i}d.svg`);
			loader.add(`${i}h`, `/assets/cards/hearts/${i}h.svg`);
			loader.add(`${i}s`, `/assets/cards/spades/${i}s.svg`);
		}
		loader.add("jc", "/assets/cards/clubs/jc.svg");
		loader.add("qc", "/assets/cards/clubs/qc.svg");
		loader.add("kc", "/assets/cards/clubs/kc.svg");
		loader.add("jd", "/assets/cards/diamonds/jd.svg");
		loader.add("qd", "/assets/cards/diamonds/qd.svg");
		loader.add("kd", "/assets/cards/diamonds/kd.svg");
		loader.add("jh", "/assets/cards/hearts/jh.svg");
		loader.add("qh", "/assets/cards/hearts/qh.svg");
		loader.add("kh", "/assets/cards/hearts/kh.svg");
		loader.add("js", "/assets/cards/spades/js.svg");
		loader.add("qs", "/assets/cards/spades/qs.svg");
		loader.add("ks", "/assets/cards/spades/ks.svg");
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
			xOffset += 130;
			cardSprite.y = 200;
			cardSprite.width = 120;
			cardSprite.height = 167;
			cardSprite.interactive = true;
			cardSprite.buttonMode = true;

			cardSprite.on("pointerdown", () => {
				if (cardSprite.filters && cardSprite.filters.length != 0)
					cardSprite.filters = [];
				else cardSprite.filters = [new OutlineFilter(4, 0xFF0000)];
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
