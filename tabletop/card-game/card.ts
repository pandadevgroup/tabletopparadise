/**
 * @module CardGame
 */
import { DomElement } from "../tabletop";
import { CardGameDomHelper } from "./dom-helper";
import "./styles/card.scss";

export class Card implements DomElement {
	private $card: JQuery<HTMLElement>;

	constructor(
		private domHelper: CardGameDomHelper,
		public number: number,
		public suit: "club" | "diamond" | "heart" | "spade",
		public index: number,
		public visible: boolean = true,
		public id: string
	) {}

	render() {
		this.$card = this.domHelper.createCardFrag(this.getImgName(), this.visible);
	}

	resize(positionInfo) {
		this.domHelper.updateEl(this.$card, positionInfo);
	}

	setVisible(visible: boolean) {
		this.visible = visible;

		if (this.visible) this.domHelper.addClass(this.$card, "card--visible");
		else this.domHelper.removeClass(this.$card, "card--visible");
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
