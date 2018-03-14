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

	resize() {}

	getCardPosition() {
		return {};
	}

	addCards(cards: Card[]) {
		this.cards = [...this.cards, ...cards];
	}
}
