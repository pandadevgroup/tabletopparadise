import { Card } from "./card";

export class Deck {
	protected cards: Card[];

	constructor() {
		this.initialize();
	}

	private initialize() {
		this.cards = [];
		for (let i = 0; i < 13; i++) {
			this.cards.push(new Card(i + 1, "club"));
			this.cards.push(new Card(i + 1, "diamond"));
			this.cards.push(new Card(i + 1, "heart"));
			this.cards.push(new Card(i + 1, "spade"));
		}
	}
}
