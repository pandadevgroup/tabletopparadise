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

	static readonly FULL_DECK = [
		new Card(undefined, 1 , "club"    , 1 , false, "1c"),
		new Card(undefined, 1 , "diamond" , 2 , false, "1d"),
		new Card(undefined, 1 , "heart"   , 3 , false, "1h"),
		new Card(undefined, 1 , "spade"   , 4 , false, "1s"),
		new Card(undefined, 2 , "club"    , 5 , false, "2c"),
		new Card(undefined, 2 , "diamond" , 6 , false, "2d"),
		new Card(undefined, 2 , "heart"   , 7 , false, "2h"),
		new Card(undefined, 2 , "spade"   , 8 , false, "2s"),
		new Card(undefined, 3 , "club"    , 9 , false, "3c"),
		new Card(undefined, 3 , "diamond" , 10, false, "3d"),
		new Card(undefined, 3 , "heart"   , 11, false, "3h"),
		new Card(undefined, 3 , "spade"   , 12, false, "3s"),
		new Card(undefined, 4 , "club"    , 13, false, "4c"),
		new Card(undefined, 4 , "diamond" , 14, false, "4d"),
		new Card(undefined, 4 , "heart"   , 15, false, "4h"),
		new Card(undefined, 4 , "spade"   , 16, false, "4s"),
		new Card(undefined, 5 , "club"    , 17, false, "5c"),
		new Card(undefined, 5 , "diamond" , 18, false, "5d"),
		new Card(undefined, 5 , "heart"   , 19, false, "5h"),
		new Card(undefined, 5 , "spade"   , 20, false, "5s"),
		new Card(undefined, 6 , "club"    , 21, false, "6c"),
		new Card(undefined, 6 , "diamond" , 22, false, "6d"),
		new Card(undefined, 6 , "heart"   , 23, false, "6h"),
		new Card(undefined, 6 , "spade"   , 24, false, "6s"),
		new Card(undefined, 7 , "club"    , 25, false, "7c"),
		new Card(undefined, 7 , "diamond" , 26, false, "7d"),
		new Card(undefined, 7 , "heart"   , 27, false, "7h"),
		new Card(undefined, 7 , "spade"   , 28, false, "7s"),
		new Card(undefined, 8 , "club"    , 29, false, "8c"),
		new Card(undefined, 8 , "diamond" , 30, false, "8d"),
		new Card(undefined, 8 , "heart"   , 31, false, "8h"),
		new Card(undefined, 8 , "spade"   , 32, false, "8s"),
		new Card(undefined, 9 , "club"    , 33, false, "9c"),
		new Card(undefined, 9 , "diamond" , 34, false, "9d"),
		new Card(undefined, 9 , "heart"   , 35, false, "9h"),
		new Card(undefined, 9 , "spade"   , 36, false, "9s"),
		new Card(undefined, 10, "club"    , 37, false, "10c"),
		new Card(undefined, 10, "diamond" , 38, false, "10d"),
		new Card(undefined, 10, "heart"   , 39, false, "10h"),
		new Card(undefined, 10, "spade"   , 40, false, "10s"),
		new Card(undefined, 11, "club"    , 41, false, "11c"),
		new Card(undefined, 11, "diamond" , 42, false, "11d"),
		new Card(undefined, 11, "heart"   , 43, false, "11h"),
		new Card(undefined, 11, "spade"   , 44, false, "11s"),
		new Card(undefined, 12, "club"    , 45, false, "12c"),
		new Card(undefined, 12, "diamond" , 46, false, "12d"),
		new Card(undefined, 12, "heart"   , 47, false, "12h"),
		new Card(undefined, 12, "spade"   , 48, false, "12s"),
		new Card(undefined, 13, "club"    , 49, false, "13c"),
		new Card(undefined, 13, "diamond" , 50, false, "13d"),
		new Card(undefined, 13, "heart"   , 51, false, "13h"),
		new Card(undefined, 13, "spade"   , 52, false, "13s")
	];
	//TODO - Add jokers 1 = small joker, 2 = big joker
	// static readonly FULL_DECK_JOKERS = Deck.FULL_DECK.concat([
	// 	new Card(undefined, 1, "joker", 53, false, "joker"),
	// 	new Card(undefined, 2, "joker", 54, false, "joker")
	// ]);
	// static readonly FULL_DECK_FOUR_JOKERS = Deck.FULL_DECK_JOKERS.concat([
	// 	new Card(undefined, 1, "joker", 53, false, "joker"),
	// 	new Card(undefined, 2, "joker", 54, false, "joker")
	// ]);

	constructor(
		protected domHelper: CardGameDomHelper,
		protected tabletop: Tabletop,
		protected visible: boolean,
		protected game: CardGame,
		initialCards: Card[] = Deck.FULL_DECK
	) {
		this.initializeCards(initialCards);
	}

	protected initializeCards(initialCards) {
		this.cards = [];
		for (let i = 0; i < initialCards.length; i ++) {
			initialCards[i].setDomHelper(this.domHelper);
			this.cards.push(initialCards[i]);
		}
	}

	shuffle(algorithm = function(array: Card[]) {
		// Fisher-yates shuffle
		// based on algorithm from: https://bost.ocks.org/mike/shuffle/
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
		if (numCards > this.cards.length) throw "GetCardError: Not enough cards in deck";

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
