import { Card } from "./card";
import { CardGameDomHelper } from "./dom-helper";
import { CardGame } from ".";

export class CardGamePlayer {
	protected cards: Card[] = [];

	constructor(
		protected domHelper: CardGameDomHelper,
		protected game: CardGame,
		protected name: string
	) {}

	resize() {
		this.cards.forEach(card => card.resize());
	}

	getCardPosition(index) {
		const tbl = this.game.tabletop;
		const opts = this.game.layoutOpts;

		let left = tbl.width / 2 - opts.cardWidth / 2 - (opts.cardSpacing * this.cards.length) / 2;
		return {
			translateX: left + opts.cardSpacing * index,
			translateY: tbl.height - opts.cardHeight - opts.playerPadding,
			rotateY: 0,
			zIndex: index
		};
	}

	addCards(cards: Card[]) {
		let numPrevCards = this.cards.length;

		this.cards = [...this.cards, ...cards];

		cards.forEach((card, i) => {
			card.index = numPrevCards + i;
			card.setParent(this);
		});
	}
}
