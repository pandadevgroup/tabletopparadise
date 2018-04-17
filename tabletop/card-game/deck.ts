/**
 * @module CardGame
 */

import { CardGameDomHelper } from "./dom-helper";
import { Card } from "./card";
import { CardGame } from "./card-game";
import { DomElement } from "../tabletop";

import "./styles/deck.scss";

export class Deck implements DomElement {
	protected $deck: JQuery<HTMLElement>;
	protected cards: Card[];
	protected actionable: boolean = false;

	constructor(
		protected domHelper: CardGameDomHelper,
		protected game: CardGame,
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

	setActionable(actionable: boolean) {
		this.actionable = actionable;
		if (this.actionable && this.$deck) this.domHelper.addClass(this.$deck, "actionable");
		else if (this.$deck) this.domHelper.removeClass(this.$deck, "actionable");
	}

	render() {
		if (!this.visible) return;

		this.$deck = this.domHelper.createDeckFrag();
		this.$deck.click(() => this.actionable
			? this.game.onDeckClick()
			: undefined
		);

		this.cards.forEach(card => card.render());
	}
	resize() {
		if (!this.visible) return;
		this.cards.forEach(card => card.resize());
	}
}
