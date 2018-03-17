import { CardGame, CardGamePlayer, Card } from "../../card-game";
import { Deck } from "../../card-game";
import { Server, Action } from "../../server";

export class DrawingCardsGame extends CardGame {

	constructor(protected container: JQuery<HTMLElement>) {
		super(container, {
			players: 4,
			initialHandSize: 5,
			showDeck: true
		});

		this.server.listen("card_dealt", (action: Action) => {
			let card = this.drawCard();
			card.setActionable(true);
		});
	}

	onDeckClick() {
		this.server.push(new Action("card_dealt", "testMsg"));
	}

	onSelectedCardsChange(selectedCards: Card[]) {
		if (selectedCards.length !== 0) this.showPlayButton = true;
		else this.showPlayButton = false;
	}

	onPlayBtnClick() {
		this.playSelectedCards();
	}

	startGame() {
		this.deck.setAcitonable(true);
		this.players[0].cards.forEach(card => card.setActionable(true));
	}
}
