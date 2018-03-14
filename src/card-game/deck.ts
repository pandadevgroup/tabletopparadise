import { Card } from "./card";
import Utils from "../util";

export class Deck {
	protected cards: Card[];
	protected $deck: JQuery<HTMLElement>;
	private _actionable: boolean = false;

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
		this.$deck = $(`<div class="deck"></div>`);
		// Add class "actionable" if actionable is true
		this.actionable = this.actionable;
		this.$container.append(this.$deck);
	}

	protected initialize() {
		this.cards = [];
		for (let i = 0; i < 13; i++) {
			this.cards.push(new Card(i + 1, "club"));
			this.cards.push(new Card(i + 1, "diamond"));
			this.cards.push(new Card(i + 1, "heart"));
			this.cards.push(new Card(i + 1, "spade"));
		}
	}
}
