import { CardGamePlayer } from "./player";
import { Deck } from "./deck";

export class Card {

	constructor(
		private $container: JQuery<HTMLElement>,
		private parent: CardGamePlayer | Deck,
		private number: number,
		private suit: "club" | "diamond" | "heart" | "spade"
	) {}

	resize() {}

	getImgName() {
		if (this.number <= 10) {
			return `${this.suit}s/${this.number}${this.suit[0]}`;
		} else {
			let names = ["j", "q", "k"];
			return `${this.suit}s/${names[this.number - 11]}${this.suit[0]}`;
		}
	}

	getRenderCode() {
		return `
			<div class="card"id="card__${this.number}${this.suit}">
				<img class="card__img" src="/assets/cards/${this.getImgName()}.svg" id="card__${this.number}${this.suit}_img">
			</div>
		`;
	}

	toString() {
		return `${this.number} of ${this.suit}s`;
	}
}
