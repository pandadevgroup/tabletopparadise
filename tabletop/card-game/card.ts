/**
 * @module CardGame
 */
import { DomElement } from "../tabletop";
import { CardGameDomHelper } from "./dom-helper";
import "./styles/card.scss";

export class Card implements DomElement {
	private $card: JQuery<HTMLElement>;
	selected = false;
	actionable = false;
	onClick: Function = null;

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
		this.$card.click(() => {
			if (this.actionable) {
				this.selected = !this.selected;
				if (this.onClick) this.onClick(this);
			}
		});
	}

	resize(positionInfo) {
		this.domHelper.updateEl(this.$card, positionInfo);
		this.setActionable(this.actionable);
	}

	setVisible(visible: boolean) {
		this.visible = visible;

		if (this.visible) this.domHelper.addClass(this.$card, "card--visible");
		else this.domHelper.removeClass(this.$card, "card--visible");
	}

	setActionable(actionable: boolean) {
		this.actionable = actionable;

		if (actionable) this.domHelper.addClass(this.$card, "actionable");
		else this.domHelper.removeClass(this.$card, "actionable")
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
