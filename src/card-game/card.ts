import { CardGamePlayer } from "./player";
import { Deck } from "./deck";
import { CardGameDomHelper } from "./dom-helper";

export class Card {
	private $card: JQuery<HTMLElement>;

	//constants for better readibility
	static ACE: number = 1;
	static JACK: number = 11;
	static QUEEN: number = 12;
	static KING: number = 13;
	static faceCards: number[] = [Card.JACK, Card.QUEEN, Card.KING];

	static CLUB: String = "club";
	static DIAMOND: String = "diamond";
	static HEART: String = "heart";
	static SPADE: String = "spade";
	static suits: String[] = [Card.CLUB, Card.DIAMOND, Card.HEART, Card.SPADE];

	constructor(
		private domHelper: CardGameDomHelper,
		private parent: CardGamePlayer | Deck,
		public number: number,
		public suit: "club" | "diamond" | "heart" | "spade",
		public index: number,
		private visible: boolean = true
	) {
		this.$card = domHelper.createCardFrag(this.getImgName(), visible);
	}

	resize() {
		const positionInfo = this.parent.getCardPosition(this.index);

		this.domHelper.updateEl(this.$card, positionInfo);
	}

	setParent(parent: CardGamePlayer | Deck) {
		this.parent = parent;
	}

	setVisible(visible: boolean) {
		this.visible = visible;
		if (this.visible) this.$card.removeClass("card--hidden");
		else this.$card.addClass("card--hidden");
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
