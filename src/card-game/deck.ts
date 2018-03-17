import { Card, CardParent } from "./card";
import Utils from "../util";
import { CardGame } from ".";
import { CardGameDomHelper } from "./dom-helper";

export class Deck implements CardParent {
	public cards: Card[];
	protected $deck: JQuery<HTMLElement>;
	public actionable: boolean = false;

	constructor(
		private domHelper: CardGameDomHelper,
		private game: CardGame,
		private visible: boolean,
		cards? :Card[]
	) {
		this.initialize();
		if (cards) {
			this.cards = cards;
		}
	}

	getCardIDs() {
		return this.cards.map(card => card.id);
	}

	get(numCards: number): Card[] {
		if (numCards > this.cards.length) throw "Not enough cards in deck";

		return this.cards.splice(0, numCards);
	}

	setCardOrder(cardIds: number[]) {

	}

	getCardsFromIds(cardIds: number[]): Card[] {
		return [];
	}

	getCardPosition(index?) {
		return {
			x: Math.round(this.game.tabletop.width / 2 - this.game.layoutOpts.cardWidth / 2),
			y: Math.round(this.game.tabletop.height / 2 - this.game.layoutOpts.cardHeight / 2),
			rotateX: index === -1 ? 0 : 180
		};
	}

	shuffle(algorithm = function (array: Card[]) {
		// Fisher-yates shuffle
		// based on algorithm(them minified) from: https://bost.ocks.org/mike/shuffle/ | https://web.archive.org/web/20180311033149/https://bost.ocks.org/mike/shuffle/
		for (var t, i, m = array.length; m;) (i = Math.floor(Math.random() * m--)), (t = array[m]), (array[m] = array[i]), (array[i] = t);
		return array;
	}) {
		this.cards = algorithm(this.cards);
		return this;
	}

	resize() {
		this.domHelper.updateEl(this.$deck, this.getCardPosition(-1));
		this.cards.forEach(card => card.resize());
	}

	render() {
		this.domHelper.updateEl(this.$deck, this.getCardPosition(-1));
		this.cards.forEach(card => card.render());

		this.setActionable(this.actionable);
	}

	setActionable(actionable: boolean) {
		this.actionable = actionable;
		if (this.actionable && this.$deck) this.domHelper.addClass(this.$deck, "actionable");
		else if (this.$deck) this.domHelper.removeClass(this.$deck, "actionable");
	}

	protected initialize() {
		this.cards = [];
		for (let i = 0; i < 13; i++) {
			this.cards.push(new Card(this.domHelper, this, i + 1, "club", this.cards.length, false, (i+1)+"c"));
			this.cards.push(new Card(this.domHelper, this, i + 1, "diamond", this.cards.length, false, (i+1)+"d"));
			this.cards.push(new Card(this.domHelper, this, i + 1, "heart", this.cards.length, false, (i+1)+"h"));
			this.cards.push(new Card(this.domHelper, this, i + 1, "spade", this.cards.length, false, (i+1)+"s"));
		}

		if (this.visible) {
			this.$deck = this.domHelper.createDeckFrag();
			this.$deck.click(() => this.actionable
				? this.game.onDeckClick()
				: undefined
			);
		}
		return this;
	}
}
