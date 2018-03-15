import { CardGame } from "../../card-game";
import { Deck } from "../../card-game";

export class DrawingCardsGame extends CardGame {
	constructor(protected container: JQuery<HTMLElement>) {
		super(container, {
			players: 1,
			initialHandSize: 13,
			showDeck: true
		});
	}

	protected onDeckClick() {
		this.drawCard(this.players[0]);
		console.log(this.deck.sort());
		console.log(this.deck.sort(Deck.COMPARE_BY_SUIT));
		console.log(this.deck.cards);
	}

	protected startGame() {
		this.deck.actionable = true;
	}
}
