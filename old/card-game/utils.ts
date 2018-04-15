import { Card } from "./card";

export class CardUtils {
	// (group by suit -- lowest to highest: clubs, diamonds, hearts, spades), then group by number within suits
	static COMPARE_BY_SUIT = "suit";
	// (group by number -- lowest to highest: 2, 3 ... 10, j, q, k, ace/1), then group by suit within numbers
	static COMPARE_BY_VALUE = "value";

	static DEFUALT_SUIT_VALUE_SYSTEM = [Card.CLUB, Card.DIAMOND, Card.HEART, Card.SPADE];
	static DEFUALT_NUMBER_VALUE_SYSTEM = [2, 3, 4, 5, 6, 7, 8, 9, 10, Card.JACK, Card.QUEEN, Card.KING, Card.ACE];

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
