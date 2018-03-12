export class Card {
	/**
	 * 1 - 13, Ace is 1, King is 13
	 */
	number: number;

	/** */
	suit: "club" | "diamond" | "heart" | "spade";

	constructor(number: number, suit: "club" | "diamond" | "heart" | "spade") {
		this.number = number;
		this.suit = suit;
	}

	getImgName() {
		if (this.number <= 10) {
			return `${this.number}${this.suit[0]}`;
		} else {
			let names = ["j", "q", "k"];
			return `${names[this.number - 11]}${this.suit[0]}`;
		}
	}

	toString() {
		return `${this.number} of ${this.suit}s`;
	}
}
