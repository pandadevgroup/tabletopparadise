/**
 * @module CardGame
 */

import { CardGameDomHelper } from "./dom-helper";
import { Card } from "./card";
import { CardGame } from "./card-game";
import { DomElement, Tabletop } from "../tabletop";

import "./styles/deck.scss";

export class Deck implements DomElement {
	protected $deck: JQuery<HTMLElement>;
	cards: Card[];
	actionable: boolean = false;

	constructor(
		protected domHelper: CardGameDomHelper,
		protected tabletop: Tabletop,
		protected visible: boolean,
		protected game: CardGame
	) {
		this.initializeCards();
	}

	protected initializeCards() {
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

	getCardIds() {
		return this.cards.map(card => card.id);
	}

	setDeckOrder(cardIds: string[]) {
		let i = 0;
		let order = cardIds.reduce((acc, cur) => ({ ...acc, [cur]: i++ }), {});
		let newArray = [];

		this.cards.forEach(card => newArray[order[card.id]] = card);

		this.cards = newArray;
	}

	getCardsFromIds(cardIds: string[]): Card[] {
		let set = new Set(cardIds);
		let selectedCards = this.cards.filter(card => set.has(card.id));
		this.cards = this.cards.filter(card => !set.has(card.id));
		return selectedCards;
	}

	get(numCards: number): Card[] {
		if (numCards > this.cards.length) throw "Not enough cards in deck";

		return this.cards.splice(0, numCards);
	}

	render() {
		if (!this.visible) return;

		this.$deck = this.domHelper.createDeckFrag();
		this.$deck.click(() => this.onDeckClick());

		this.cards.forEach(card => card.render());
	}

	resize() {
		if (!this.visible) return;
		this.domHelper.updateEl(this.$deck, this.getCardPosition());
		this.cards.forEach(card => card.resize(this.getCardPosition(card)));
	}

	protected getCardPosition(card?: Card) {
		return {
			x: Math.round(this.tabletop.width / 2 - this.domHelper.layoutOpts.cardWidth / 2),
			y: Math.round(this.tabletop.height / 2 - this.domHelper.layoutOpts.cardHeight / 2),
			rotateX: card === undefined ? 0 : 180
		};
	}

	protected onDeckClick() {
		if (this.actionable) this.game.onDeckClick();
	}
}