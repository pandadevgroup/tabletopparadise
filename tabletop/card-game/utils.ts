/**
 * @module CardGame
 */

import { Card } from "./card";

export class CardUtils {
	//constants for better readibility
	static readonly ACE: number = 1;
	static readonly JACK: number = 11;
	static readonly QUEEN: number = 12;
	static readonly KING: number = 13;
	static readonly faceCards: number[] = [CardUtils.JACK, CardUtils.QUEEN, CardUtils.KING];

	static readonly CLUB: string = "club";
	static readonly DIAMOND: string = "diamond";
	static readonly HEART: string = "heart";
	static readonly SPADE: string = "spade";
	static readonly JOKER: string = "joker";
	static readonly suits: string[] = [CardUtils.CLUB, CardUtils.DIAMOND, CardUtils.HEART, CardUtils.SPADE];

	// (group by suit -- lowest to highest: clubs, diamonds, hearts, spades), then group by number within suits
	static readonly COMPARE_BY_SUIT = function (a, b, numberValueSystem, suitValueSystem, sortDirection) {
		if (a.suit == b.suit) {
			return (numberValueSystem.indexOf(a.number) - numberValueSystem.indexOf(b.number)) * (sortDirection == CardUtils.RIGHT ? 1 : -1);
		} else {
			return (suitValueSystem.indexOf(a.suit) - suitValueSystem.indexOf(b.suit)) * (sortDirection == CardUtils.RIGHT ? 1 : -1);
		}
	};
	// (group by number -- lowest to highest: 2, 3 ... 10, j, q, k, ace/1), then group by suit within numbers
	static readonly COMPARE_BY_VALUE = function (a, b, numberValueSystem, suitValueSystem, sortDirection) {
		if (a.number == b.number) {
			return (suitValueSystem.indexOf(a.suit) - suitValueSystem.indexOf(b.suit)) * (sortDirection == CardUtils.RIGHT ? 1 : -1);
		} else {
			return (numberValueSystem.indexOf(a.number) - numberValueSystem.indexOf(b.number)) * (sortDirection == CardUtils.RIGHT ? 1 : -1);

		}
	};

	static readonly LEFT = "left";
	static readonly RIGHT = "right";

	static readonly DEFUALT_SUIT_VALUE_SYSTEM = [CardUtils.CLUB, CardUtils.DIAMOND, CardUtils.HEART, CardUtils.SPADE];
	static readonly DEFUALT_NUMBER_VALUE_SYSTEM = [2, 3, 4, 5, 6, 7, 8, 9, 10, CardUtils.JACK, CardUtils.QUEEN, CardUtils.KING, CardUtils.ACE];

	static sortCards(
		/**
		 * The cards to sort
		 */
		cards: Card[],
		/**
		 * The function with which to compare each card. The function can either be a custom function,
		 * or the provided static CardUtils.COMPARE_BY_SUIT and CardUtils.COMPARE_BY_VALUE functions, which first sort with
		 * the suit or value, respectively, and then within the suit or value, sorts by value or suit, respectively.
		 *
		 * If the function is a custom function, it must accept 5 parameters. The first two, a and b, are the two Cards to compare.
		 * The next two, numberValueSystem and suitValueSystem, are the respective value systems. The remaining parameter,
		 * sortDirection, specifies the direction, either left or right, in which the highest card (number and suit) should be ordered.
		 */
		compare?: ((a, b, numberValueSystem, suitValueSystem, sortDirection) => number),
		/**
		 * The suit value system is an array that provides ordering for suits. A lower indexed element in the
		 * provided array is considered to be a lower value than all elements with a greater index than that element.
		 * It should be an array containing strings, one for each suit to be considered. The suits of two cards will
		 * be compared to this array when sorting.
		 */
		suitValueSystem:string[] = CardUtils.DEFUALT_SUIT_VALUE_SYSTEM,
		/**
		 * The card number value system is an array that provides ordering for cards (ignoring suit). A lower indexed element in the
		 * provided array is considered to be a lower value than all elements with a greater index than that element.
		 * It should be an array containing integers, one for each number to be considered. J/Q/K are valued 11/12/13 respectively, and
		 * Ace is valued 1. The numbers of two cards will be compared to this array when sorting.
		 */
		numberValueSystem:number[] = CardUtils.DEFUALT_NUMBER_VALUE_SYSTEM,
		/**
		 * The direction in which the highest card should be displayed. If "left" or CardUtils.LEFT is specified,
		 * then the cards will be ordered with the largest number of the largest suit on the right, and the
		 * smallest number of the smallest suit on the right, If "right" or CardUtils.RIGHT is specified, the opposite
		 * occurs.
		 */
		sortDirection:"left" | "right" = CardUtils.LEFT
	) {


		cards.sort(function(a, b) {
			return compare(a, b, numberValueSystem, suitValueSystem, sortDirection);
		});

	}
}
