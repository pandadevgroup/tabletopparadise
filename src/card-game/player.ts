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
		return {
			translateX: tbl.width / 2 - opts.cardWidth / 2,
			translateY: tbl.height - opts.cardHeight - opts.playerPadding
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
