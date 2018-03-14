import { Card } from "./card";
import Utils from "../util";

export class Deck {
	protected _cards: Card[];
	protected $deck: JQuery<HTMLElement>;
	protected clickListeners: Function[] = [];
	private _actionable: boolean = false;

	get cards() {
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

		let cards = [];
		while (numCards > 0) {
			let index = Utils.random(0, this.cards.length);
			cards.push(this.cards.splice(index, 1)[0]);
			numCards--;
		}
		return cards;
	}

	render() {
		let cardsCode = [];
		this.cards.forEach(card => cardsCode.push(card.getRenderCode()));

		this.$deck = $(`<div class="deck">${cardsCode.join("")}</div>`);
		// Add class "actionable" if actionable is true
		this.actionable = this.actionable;

		this.$deck.click(() => this.handleOnDeckClick());

		this.$container.append(this.$deck);
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
