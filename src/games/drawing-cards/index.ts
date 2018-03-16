import { CardGame, CardGamePlayer, Card } from "../../card-game";
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

	onDeckClick() {
		let card = this.drawCard(this.players[this.playerIndex++]);
		card.actionable = this.playerIndex === 1;

		if (this.playerIndex >= 4) this.playerIndex = 0;
	}

	onSelectedCardsChange(selectedCards: Card[]) {
		if (selectedCards.length !== 0) this.showPlayButton = true;
		else this.showPlayButton = false;
	}

	onPlayBtnClick() {
		this.playSelectedCards();
	}

	startGame() {
		this.deck.actionable = true;
		this.players[0].cards.forEach(card => card.actionable = true);
	}
}
