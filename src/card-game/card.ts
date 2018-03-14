export class Card {
	/**
	 * 1 - 13, Ace is 1, King is 13
	 */
	number: number;

	/** */
	suit: "club" | "diamond" | "heart" | "spade";

	//constants for better readibility
	static ACE : number = 1;
	static JACK : number = 11;
	static QUEEN : number = 12;
	static KING : number = 13;
	static faceCards :number[] = [Card.JACK, Card.QUEEN, Card.KING];

	static CLUB : String = "club";
	static DIAMOND : String = "diamond";
	static HEART : String = "heart";
	static SPADE : String = "spade";
	static suits : String[] = [Card.CLUB, Card.DIAMOND, Card.HEART, Card.SPADE];

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

	toString() {
		return `${this.number} of ${this.suit}s`;
	}
}
