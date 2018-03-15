import { Card } from "./card";
import Utils from "../util";
import { CardGame } from ".";
import { CardGameDomHelper } from "./dom-helper";

export class Deck {
	protected _cards: Card[];
	protected $deck: JQuery<HTMLElement>;
	protected clickListeners: Function[] = [];
	private _actionable: boolean = false;

	get cards() {
		return this._cards;
	}

	constructor(
		private domHelper: CardGameDomHelper,
		private game: CardGame,
		private visible: boolean
	) {
		this.initialize();
	}

	set actionable(actionable: boolean) {
		this._actionable = actionable;
		if (actionable && this.$deck) this.$deck.addClass("actionable");
		else if (this.$deck) this.$deck.removeClass("actionable");
	}
	get actionable() {
		return this._actionable;
	}

	get(numCards: number): Card[] {
		if (numCards > this.cards.length) throw "Not enough cards in deck";

		return this._cards.splice(0, numCards);
	}

	getCardPosition(index?) {
		return {
			translateX: this.game.tabletop.width / 2 - this.game.layoutOpts.cardWidth / 2,
			translateY: this.game.tabletop.height / 2 - this.game.layoutOpts.cardHeight / 2,
			rotateX: 180,
			zIndex: undefined
		};
	}

	shuffle(algorithm = function(array: Card[]) {
		// Fisher-yates shuffle
		// based on algorithm(them minified) from: https://bost.ocks.org/mike/shuffle/ | https://web.archive.org/web/20180311033149/https://bost.ocks.org/mike/shuffle/
		for (var t, i, m = array.length; m; ) (i = Math.floor(Math.random() * m--)), (t = array[m]), (array[m] = array[i]), (array[i] = t);
		return array;
	}) {
		this._cards = algorithm(this._cards);
	}

	resize() {
		this.domHelper.resizeEl(this.$deck, this.getCardPosition());
		this._cards.forEach(card => card.resize());
	}

	onClick(callback: Function) {
		this.clickListeners.push(callback);
	}

	protected initialize() {
		this._cards = [];
		for (let i = 0; i < 13; i++) {
			this._cards.push(new Card(this.domHelper, this, i + 1, "club", this._cards.length, false));
			this._cards.push(new Card(this.domHelper, this, i + 1, "diamond", this._cards.length, false));
			this._cards.push(new Card(this.domHelper, this, i + 1, "heart", this._cards.length, false));
			this._cards.push(new Card(this.domHelper, this, i + 1, "spade", this._cards.length, false));
		}

		if (this.visible) {
			this.$deck = this.domHelper.createDeckFrag();
			this.$deck.click(() => this.actionable
				? this.clickListeners.forEach(listener => listener())
				: undefined
			);
		}
	}
}
