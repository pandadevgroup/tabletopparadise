import { CardGamePlayer } from "./player";
import { Deck } from "./deck";
import { CardGameDomHelper } from "./dom-helper";
import { CardGameTabletop } from "./tabletop";

export interface CardParent {
	getCardPosition(index?: number): any;
}

export class Card {
	private $card: JQuery<HTMLElement>;
	private _actionable: boolean = false;
	selected = false;
	/**
	 * Used by CardGameTabletop. Represents which player played the card.
	 */
	position: "left" | "right" | "top" | "bottom";

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

	get actionable() {
		return this._actionable;
	}
	set actionable(actionable: boolean) {
		this._actionable = actionable;
		if (actionable) this.$card.addClass("actionable");
		else this.$card.removeClass("actionable");
	}

	constructor(
		private domHelper: CardGameDomHelper,
		public parent: CardParent,
		public number: number,
		public suit: "club" | "diamond" | "heart" | "spade",
		public index: number,
		private visible: boolean = true
	) {
		this.$card = domHelper.createCardFrag(this.getImgName(), visible);
		this.$card.click(() => {
			if (this.actionable) {
				this.selected = !this.selected;
				if (this.parent instanceof CardGamePlayer) this.parent.handleCardClick(this.index);
			}
		});
	}

	resize() {
		const positionInfo = this.parent.getCardPosition(this.index);

		this.domHelper.updateEl(this.$card, positionInfo);
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
