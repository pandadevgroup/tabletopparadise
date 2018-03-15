import { CardGamePlayer } from "./player";
import { Deck } from "./deck";
import { CardGameDomHelper } from "./dom-helper";

export class Card {
	private $card: JQuery<HTMLElement>;

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

		this.domHelper.resizeEl(this.$card, {
			translateX: positionInfo.translateX,
			translateY: positionInfo.translateY,
			rotateX: positionInfo.rotateX
		});

		this.domHelper.setElStyles(this.$card, {
			zIndex: positionInfo.zIndex
		});
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
