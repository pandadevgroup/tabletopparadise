export class Card {
	/**
	 * 1 - 13, Ace is 1, King is 13
	 */
	number: number;

	suit: "club" | "diamond" | "heart" | "spade";

	constructor(number: number, suit: "club" | "diamond" | "heart" | "spade") {
		this.number = number;
		this.suit = suit;
	}

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
