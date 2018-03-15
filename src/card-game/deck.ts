import { Card } from "./card";
import Utils from "../util";
import { CardGame } from ".";
import { CardGameDomHelper } from "./dom-helper";

export class Deck {
	protected _cards: Card[];
	protected $deck: JQuery<HTMLElement>;
	protected clickListeners: Function[] = [];
	private _actionable: boolean = false;

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

	get cards() {
		return this._cards;
	}

	get(numCards: number): Card[] {
		if (numCards > this.cards.length) throw "Not enough cards in deck";

		return this._cards.splice(0, numCards);
	}

	getCardPosition(index?) {
		return {
			translateX: Math.round(this.game.tabletop.width / 2 - this.game.layoutOpts.cardWidth / 2),
			translateY: Math.round(this.game.tabletop.height / 2 - this.game.layoutOpts.cardHeight / 2),
			rotateX: 180,
			zIndex: undefined
		};
	}

	shuffle(algorithm = function (array: Card[]) {
		// Fisher-yates shuffle
		// based on algorithm(them minified) from: https://bost.ocks.org/mike/shuffle/ | https://web.archive.org/web/20180311033149/https://bost.ocks.org/mike/shuffle/
		for (var t, i, m = array.length; m;) (i = Math.floor(Math.random() * m--)), (t = array[m]), (array[m] = array[i]), (array[i] = t);
		return array;
	}) {
		this._cards = algorithm(this._cards);
		return this;
	}

	//constants to be used by user for better readibility
	static COMPARE_BY_SUIT = "suit";//(group by suit -- lowest to highest: clubs, diamonds, hearts, spades), then group by number within suits
	static COMPARE_BY_VALUE = "value";//(group by number -- lowest to highest: 2, 3 ... 10, j, q, k, ace/1), then group by suit within numbers

	static DEFUALT_SUIT_VALUE_SYSTEM = [Card.CLUB, Card.DIAMOND, Card.HEART, Card.SPADE];//lowest to highest
	static DEFUALT_NUMBER_VALUE_SYSTEM = [2, 3, 4, 5, 6, 7, 8, 9, Card.JACK, Card.QUEEN, Card.KING, Card.ACE];//lowest to highest

	sort(compare?: string | ((a, b) => number), suitValueSystem = Deck.DEFUALT_SUIT_VALUE_SYSTEM, numberValueSystem = Deck.DEFUALT_NUMBER_VALUE_SYSTEM) {
		//if they provide a compare function, then we use that.
		if (typeof compare == "function") {
			this._cards.sort(compare);
			//otherwise, if they provide a string stating how they want us to compare, and that string tells us to compare by the suit, then we do
		} else if (compare == Deck.COMPARE_BY_SUIT) {
			//sort the cards with our custom compare function
			this._cards.sort(function (a, b) {
				if (a.suit = b.suit) {
					//if a is higher, return a negative number
					//if a and b are equal, return 0
					//if b is higher, return a positive number
					//this will return a number following the above rules
					return numberValueSystem.indexOf(b.number) - numberValueSystem.indexOf(a.number);
				} else {
					return suitValueSystem.indexOf(b.suit) - suitValueSystem.indexOf(a.suit);

				}
			});
			//for chaning
			return this;
		} else {
			//defualt is compare by value
			this._cards.sort(function (a, b) {
				if (a.number = b.number) {

					return suitValueSystem.indexOf(b.suit) - suitValueSystem.indexOf(a.suit);
				} else {
					return numberValueSystem.indexOf(b.number) - numberValueSystem.indexOf(a.number);

				}
			});
			return this;
		}
	}

	resize() {
		this.domHelper.resizeEl(this.$deck, this.getCardPosition());
		this._cards.forEach(card => card.resize());
		return this;
	}

	onClick(callback: Function) {
		this.clickListeners.push(callback);
		return this;
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
		return this;
	}
}
