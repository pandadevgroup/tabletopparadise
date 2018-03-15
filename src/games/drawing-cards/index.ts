import { CardGame } from "../../card-game";
import { Deck } from "../../card-game";

export class DrawingCardsGame extends CardGame {
	constructor(protected container: JQuery<HTMLElement>) {
		super(container, {
			players: 4,
			initialHandSize: 5,
			showDeck: true
		});
	}

	protected onDeckClick() {
		this.drawCard(this.players[0]);
	}

	protected startGame() {
		this.deck.actionable = true;
	}
}
