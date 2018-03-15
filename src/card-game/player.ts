import { Card } from "./card";
import { CardGameDomHelper } from "./dom-helper";
import { CardGame } from ".";
import { CardUtils } from "./utils";

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

		let left = Math.round(tbl.width / 2 - opts.cardWidth / 2 - (opts.cardSpacing * (this.cards.length - 1)) / 2);
		return {
			translateX: left + opts.cardSpacing * index,
			translateY: tbl.height - opts.cardHeight - opts.playerPadding,
			rotateX: 0,
			zIndex: index
		};
	}

	addCards(cards: Card[]) {
		this.cards = [...this.cards, ...cards];
		CardUtils.sort(this.cards);

		this.cards.forEach((card, i) => {
			card.index = i;
			card.setParent(this);
			card.setVisible(true);
		});
	}
}
