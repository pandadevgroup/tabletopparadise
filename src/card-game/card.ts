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

	toString() {
		return `${this.number} of ${this.suit}s`;
	}
}
