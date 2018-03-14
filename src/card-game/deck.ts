import { Card } from "./card";
import Utils from "../util";

export class Deck {
	protected cards: Card[];

	constructor(private $container: JQuery<HTMLElement>) {
		this.initialize();
	}

	get(numCards: number): Card[] {
		if (numCards > this.cards.length) throw "Not enough cards in deck";

		let cards = [];
		while (numCards > 0) {
			let index = Utils.random(0, this.cards.length);
			cards.push(this.cards.splice(index, 1)[0]);
			numCards--;
		}
		return cards;
	}

	render() {
		this.$container.append(`<div class="deck"></div>`);;
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
