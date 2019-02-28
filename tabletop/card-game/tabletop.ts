/**
 * @module CardGame
 */

import { Tabletop, DomElement } from "../tabletop";
import { Card } from "./card";
import { CardGameDomHelper } from "./dom-helper";

export class CardGameTabletop extends Tabletop implements DomElement {
	cards: Card[] = [];
	numCards: { [position: string]: number } = {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	};

	constructor(
		protected $container: JQuery<HTMLElement>,
		protected domHelper: CardGameDomHelper,
		public showDeck: boolean
	) {
		super($container);
	}

	playCards(position: "top" | "left" | "right" | "bottom", cards: Card[]) {
		let startIndex = this.cards.length;

		this.cards = [...this.cards, ...cards];

		cards.forEach((card, i) => {
			card.index = this.numCards[position]++;
			card.position = position;
			card.setActionable(false);
		});

		this.resize();
	}

	resize() {
		this.cards.forEach(card => card.resize(this.getCardPosition(card)));
	}

	render() {
		this.cards.forEach(card => card.render());
	}

	getCardPosition(card: Card) {
		const index = card.index;
		const opts = this.domHelper.layoutOpts;
		const selected = card.selected;
		const numCards = this.numCards[card.position];
		let deckOffsetTop = 0;
		let deckOffsetLeft = 0;
		if (this.showDeck && card.position == "left" || card.position == "right") {
			deckOffsetTop = opts.cardWidth / 2;
			deckOffsetLeft = opts.cardWidth / 2;
		} else if (this.showDeck) {
			deckOffsetTop = opts.cardHeight / 2;
			deckOffsetLeft = 0;
		}

		if (card.position === "bottom") {
			let top = Math.round(this.height / 2 + deckOffsetTop + 20);
			let left = Math.round(this.width / 2 - opts.cardWidth / 2 - (opts.cardSpacing * (numCards - 1)) / 2);

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
			let left = Math.round(this.width / 2 - opts.cardWidth / 2 - (opts.cardSpacing * (numCards - 1)) / 2);

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
