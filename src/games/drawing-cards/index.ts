import { CardGame } from "../../card-game";
import { Deck } from "../../card-game";

export class DrawingCardsGame extends CardGame {
	private playerIndex = 0;

	constructor(protected container: JQuery<HTMLElement>) {
		super(container, {
			players: 4,
			initialHandSize: 5,
			showDeck: true
		});
	}

	protected onDeckClick() {
		let card = this.drawCard(this.players[this.playerIndex++]);
		card.actionable = this.playerIndex === 1;

		if (this.playerIndex >= 4) this.playerIndex = 0;
	}

	protected startGame() {
		this.deck.actionable = true;
		this.players[0].cards.forEach(card => card.actionable = true);
	}
}
