import { Player } from "../tabletop";
import { Card } from "./card";

export class CardGamePlayer extends Player {
	protected cards: Card[] = [];

	resize() {}

	addCards(cards: Card[]) {
		this.cards = [...this.cards, ...cards];
	}
}
