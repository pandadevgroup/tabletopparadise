import { Player } from "../tabletop";
import { Card } from "./card";

export class CardGamePlayer extends Player {
	protected cards: Card[] = [];

	generatePlayerCode() {
		return this.getCardsCode(this.cards);
	}

	addCards(cards: Card[]) {
		this.cards = [...this.cards, ...cards];
		let $cards = $(this.getCardsCode(cards));
		this.$player.append($cards);

	}
	addCard(card: Card) {

	}

	getCardsCode(cards: Card[]): string {
		let cardsCode = [];
		cards.forEach(card => {
			cardsCode.push(card.getRenderCode());
		});
		return cardsCode.join("");
	}
}
