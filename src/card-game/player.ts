import { Card } from "./card";
import { CardGameDomHelper } from "./dom-helper";
import { CardGame } from ".";
import { CardUtils } from "./utils";

export class CardGamePlayer {
	protected cards: Card[] = [];

	constructor(
		protected domHelper: CardGameDomHelper,
		protected game: CardGame,
		protected name: string,
		protected position: "top" | "left" | "right" | "bottom",
		protected hideCards: boolean
	) {}

	resize() {
		this.cards.forEach(card => card.resize());
	}

	getCardPosition(index) {
		const tbl = this.game.tabletop;
		const opts = this.game.layoutOpts;

		let left = Math.round(tbl.width / 2 - opts.cardWidth / 2 - (opts.cardSpacing * (this.cards.length - 1)) / 2);
		let top = Math.round(tbl.height / 2 - opts.cardWidth / 2 - (opts.cardSpacing * (this.cards.length - 1)) / 2);

		if (this.position === "bottom") {
			return {
				translateX: left + opts.cardSpacing * index,
				translateY: tbl.height - opts.cardHeight - opts.playerPadding,
				rotateX: this.hideCards ? 180 : 0,
				zIndex: index
			};
		} else if (this.position === "left") {
			return {
				translateX: Math.round(opts.playerPadding + (opts.cardHeight - opts.cardWidth) / 2),
				translateY: top + opts.cardSpacing * index,
				rotateX: this.hideCards ? 180 : 0,
				rotateZ: 90,
				zIndex: index
			};
		} else if (this.position === "right") {
			return {
				translateX: Math.round(tbl.width - opts.playerPadding - opts.cardWidth - (opts.cardHeight - opts.cardWidth) / 2),
				translateY: top + opts.cardSpacing * index,
				rotateX: this.hideCards ? 180 : 0,
				rotateZ: 90,
				zIndex: index
			};
		} else if (this.position === "top") {
			return {
				translateX: left + opts.cardSpacing * index,
				translateY: opts.playerPadding,
				rotateX: this.hideCards ? 180 : 0,
				zIndex: index
			};
		}
	}

	addCards(cards: Card[]) {
		this.cards = [...this.cards, ...cards];
		CardUtils.sortCards(this.cards);

		this.cards.forEach((card, i) => {
			card.index = i;
			card.setParent(this);
			card.setVisible(true);
		});
	}
}
