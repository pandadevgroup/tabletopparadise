import { Card } from "./card";
import Utils from "../util";

export class Deck {
	protected _cards: Card[];
	protected $deck: JQuery<HTMLElement>;
	protected clickListeners: Function[] = [];
	private _actionable: boolean = false;

	get cards() {
		if (this._cards.length === 0) {
			$(".deck").addClass("empty");
		};
		return this._cards;
	}

	constructor(private $container: JQuery<HTMLElement>) {
		this.initialize();
	}

	set actionable(actionable: boolean) {
		this._actionable = actionable;
		if (this.$deck) {
			if (actionable) this.$deck.addClass("actionable");
			else this.$deck.removeClass("actionable");
		}
	}
	get actionable() {
		return this._actionable;
	}

	get(numCards: number): Card[] {
		if (numCards > this.cards.length) throw "Not enough cards in deck";
		let spliced : Card[] = this._cards.splice(0, numCards);
		if (this._cards.length === 0) {
			$(".deck").addClass("empty");
		};
		return spliced;
	}

	shuffle(algorithm = function (array: Card[]) {
		//Fisher-yates shuffle
		//based on algorithm(them minified) from: https://bost.ocks.org/mike/shuffle/ | https://web.archive.org/web/20180311033149/https://bost.ocks.org/mike/shuffle/

		for (var t, i, m = array.length; m;)i = Math.floor(Math.random() * m--), t = array[m], array[m] = array[i], array[i] = t; return array;
	}) {

		this._cards = algorithm(this._cards);
	}

	render() {
		let cardsCode = [];
		this.cards.forEach(card =>
			cardsCode.push(card.getRenderCode())
		);

		this.$deck = $(`<div class="deck">${cardsCode.join("")}</div>`);


		// Add class "actionable" if actionable is true
		this.actionable = this.actionable;

		this.$deck.click(() => this.handleOnDeckClick());

		this.$container.append(this.$deck);

		this.cards.forEach(card =>
			$("#" + card.getID()).addClass("hidden")
		);
	}

	onClick(callback: Function) {
		this.clickListeners.push(callback);
	}

	protected initialize() {
		this._cards = [];
		for (let i = 0; i < 13; i++) {
			this._cards.push(new Card(i + 1, "club"));
			this._cards.push(new Card(i + 1, "diamond"));
			this._cards.push(new Card(i + 1, "heart"));
			this._cards.push(new Card(i + 1, "spade"));
		}
	}

	protected handleOnDeckClick() {
		if (this.actionable) this.clickListeners.forEach(listener => listener());
	}
}
