import { Card } from "./card";
import Utils from "../util";
import { CardGame } from ".";

export class Deck {
	protected _cards: Card[];
	protected $deck: JQuery<HTMLElement>;
	protected clickListeners: Function[] = [];
	private _actionable: boolean = false;

	get cards() {
		return this._cards;
	}

	constructor(
		private $container: JQuery<HTMLElement>,
		private parent: CardGame
	) {
		this.initialize();
	}

	set actionable(actionable: boolean) {
		this._actionable = actionable;
	}
	get actionable() {
		return this._actionable;
	}

	get(numCards: number): Card[] {
		if (numCards > this.cards.length) throw "Not enough cards in deck";

		return this._cards.splice(0, numCards);
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
		this._cards.forEach(card => card.resize());
	}

	protected initialize() {
		this._cards = [];
		for (let i = 0; i < 13; i++) {
			this._cards.push(new Card(this.$container, this, i + 1, "club"));
			this._cards.push(new Card(this.$container, this, i + 1, "diamond"));
			this._cards.push(new Card(this.$container, this, i + 1, "heart"));
			this._cards.push(new Card(this.$container, this, i + 1, "spade"));
		}
	}
}
