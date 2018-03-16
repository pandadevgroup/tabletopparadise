import { Tabletop, TabletopOptions } from "../tabletop";
import { Card, CardParent } from "./card";
import { CardGame } from ".";
import { CardGameDomHelper } from "./dom-helper";

export class CardGameTabletop extends Tabletop implements CardParent {
	cards: Card[] = [];
	numCards: { [position: string]: number } = {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	};

	constructor(
		protected $container: JQuery<HTMLElement>,
		public opts: TabletopOptions,
		protected domHelper: CardGameDomHelper,
		protected game: CardGame
	) {
		super($container, opts, domHelper);
	}

	playCards(position: "top" | "left" | "right" | "bottom", cards: Card[]) {
		let startIndex = this.cards.length;

		this.cards = [...this.cards, ...cards];

		cards.forEach((card, i) => {
			card.index = i + startIndex;
			card.position = position;
			card.parent = this;
			card.actionable = false;
		});

		this.numCards[position] += cards.length;

		this.resize();
	}

	resize() {
		super.resize();
		this.cards.forEach(card => card.resize());
	}

	getCardPosition(index: number) {
		const card = this.cards[index];
		const opts = this.game.layoutOpts;
		const selected = this.cards[index].selected;
		const numCards = this.numCards[card.position];
		let deckOffsetTop = 0;
		let deckOffsetLeft = 0;
		if (this.game.opts.showDeck && card.position == "left" || card.position == "right") {
			deckOffsetTop = opts.cardWidth / 2;
			deckOffsetLeft = opts.cardWidth / 2;
		} else if (this.game.opts.showDeck) {
			deckOffsetTop = opts.cardHeight / 2;
			deckOffsetLeft = opts.cardWidth / 2;
		}

		if (card.position === "bottom") {
			let top = Math.round(this.height / 2 + deckOffsetTop + 20);
			let left = Math.round(this.width / 2 - deckOffsetLeft - (opts.cardSpacing * (numCards - 1)) / 2);

			return {
				x: left + opts.cardSpacing * index,
				y: top,
				rotateX: 0,
				zIndex: index
			};
		} else if (card.position === "left") {
			let top = Math.round(this.height / 2 - deckOffsetTop - (opts.cardHeight - opts.cardWidth) / 2 - (opts.cardSpacing * (numCards - 1)) / 2);
			let left = Math.round(this.width / 2 - 20 - deckOffsetLeft - opts.cardHeight + (opts.cardHeight - opts.cardWidth) / 2);

			return {
				x: left,
				y: top + opts.cardSpacing * index,
				rotateX: 0,
				rotateZ: 90,
				zIndex: index
			};
		} else if (card.position === "right") {
			let top = Math.round(this.height / 2 - deckOffsetTop - (opts.cardHeight - opts.cardWidth) / 2 - (opts.cardSpacing * (numCards - 1)) / 2);
			let left = Math.round(this.width / 2 + 20 + deckOffsetLeft + (opts.cardHeight - opts.cardWidth) / 2);

			return {
				x: left,
				y: top + opts.cardSpacing * index,
				rotateX: 0,
				rotateZ: -90,
				zIndex: index
			};
		} else if (card.position === "top") {
			let top = Math.round(this.height / 2 - deckOffsetTop - 20 - opts.cardHeight);
			let left = Math.round(this.width / 2 - deckOffsetLeft - (opts.cardSpacing * (numCards - 1)) / 2);

			return {
				x: left + opts.cardSpacing * index,
				y: top,
				rotateX: 0,
				rotateZ: 180,
				zIndex: index
			};
		}

		return {
			x: 0,
			y: 0,
			rotateX: 0,
			zIndex: index
		};
	}
}
