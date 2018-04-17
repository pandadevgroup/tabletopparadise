/**
 * @module CardGame
 */

import { CardGameDomHelper } from "./dom-helper";
import { Card } from "./card";
import { DomElement } from "../tabletop";

export class Deck implements DomElement {
	protected $deck: JQuery<HTMLElement>;
	protected cards: Card[];

	constructor(
		protected domHelper: CardGameDomHelper,
		protected visible: boolean
	) {
		this.initializeCards();
	}

	initializeCards() {
		this.cards = [];
		for (let i = 0; i < 13; i++) {
			this.cards.push(new Card(this.domHelper, i + 1, "club", this.cards.length, false, (i+1)+"c"));
			this.cards.push(new Card(this.domHelper, i + 1, "diamond", this.cards.length, false, (i+1)+"d"));
			this.cards.push(new Card(this.domHelper, i + 1, "heart", this.cards.length, false, (i+1)+"h"));
			this.cards.push(new Card(this.domHelper, i + 1, "spade", this.cards.length, false, (i+1)+"s"));
		}
	}

	shuffle(algorithm = function(array: Card[]) {
		// Fisher-yates shuffle
		// based on algorithm (then minified) from: https://bost.ocks.org/mike/shuffle/
		// Web archive: https://web.archive.org/web/20180311033149/https://bost.ocks.org/mike/shuffle/
		for (var t, i, m = array.length; m;) (i = Math.floor(Math.random() * m--)), (t = array[m]), (array[m] = array[i]), (array[i] = t);
		return array;
	}) {
		this.cards = algorithm(this.cards);
	}

	render() {
		console.log(this.cards);
	}
	resize() {}
}
