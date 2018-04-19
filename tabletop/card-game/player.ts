/**
 * @module CardGame
 */

import { Player } from "../base-game";
import { Card } from "./card";
import { CardUtils } from "./utils";

export class CardGamePlayer extends Player {
	cards: Card[] = [];

	addCards(cards: Card[]) {
		this.cards = [...this.cards, ...cards];
		if (this.isLocal) CardUtils.sortCards(this.cards);

		this.cards.forEach((card, i) => {
			card.index = i;
			card.setVisible(true);
		});
	}

	getCardIDs() {
		return this.cards.map(card => card.id);
	}

	setCards(cards: Card[]) {
		this.cards = [];
		this.addCards(cards);
	}
}
