import { Card } from "./card";

export class CardUtils {
	//constants for better readibility
	static ACE: number = 1;
	static JACK: number = 11;
	static QUEEN: number = 12;
	static KING: number = 13;
	static faceCards: number[] = [CardUtils.JACK, CardUtils.QUEEN, CardUtils.KING];

	static CLUB: String = "club";
	static DIAMOND: String = "diamond";
	static HEART: String = "heart";
	static SPADE: String = "spade";
	static suits: String[] = [CardUtils.CLUB, CardUtils.DIAMOND, CardUtils.HEART, CardUtils.SPADE];

	// (group by suit -- lowest to highest: clubs, diamonds, hearts, spades), then group by number within suits
	static COMPARE_BY_SUIT = "suit";
	// (group by number -- lowest to highest: 2, 3 ... 10, j, q, k, ace/1), then group by suit within numbers
	static COMPARE_BY_VALUE = "value";

	static DEFUALT_SUIT_VALUE_SYSTEM = [CardUtils.CLUB, CardUtils.DIAMOND, CardUtils.HEART, CardUtils.SPADE];
	static DEFUALT_NUMBER_VALUE_SYSTEM = [2, 3, 4, 5, 6, 7, 8, 9, 10, CardUtils.JACK, CardUtils.QUEEN, CardUtils.KING, CardUtils.ACE];

	static sortCards(
		cards: Card[],
		compare?: string | ((a, b) => number),
		suitValueSystem = CardUtils.DEFUALT_SUIT_VALUE_SYSTEM,
		numberValueSystem = CardUtils.DEFUALT_NUMBER_VALUE_SYSTEM
	) {
		if (typeof compare == "function") {
			// Use given function
			cards.sort(compare);
		} else if (compare == CardUtils.COMPARE_BY_SUIT) {
			// Sort cards based on suit, then value
			cards.sort(function (a, b) {
				if (a.suit == b.suit) {
					return numberValueSystem.indexOf(a.number) - numberValueSystem.indexOf(b.number);
				} else {
					return suitValueSystem.indexOf(a.suit) - suitValueSystem.indexOf(b.suit);
				}
			});
		} else {
			// Sort cards based on value, then suit
			cards.sort(function (a, b) {
				if (a.number == b.number) {
					return suitValueSystem.indexOf(a.suit) - suitValueSystem.indexOf(b.suit);
				} else {
					return numberValueSystem.indexOf(a.number) - numberValueSystem.indexOf(b.number);

				}
			});
		}
	}
}
