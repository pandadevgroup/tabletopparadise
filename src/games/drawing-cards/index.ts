import { CardGame, CardGamePlayer, Card } from "../../card-game";
import { Deck } from "../../card-game";
import { Action } from "../../server";

export class DrawingCardsGame extends CardGame {

	constructor(protected container: JQuery<HTMLElement>) {
		super(container, {
			players: 4,
			initialHandSize: 5,
			showDeck: true
		});

		this.server.listen("draw_card", (action: Action) => {
			let playerId = action.payload.playerId;
			this.drawCard(this.players[playerId]);
		});
	}

	onDeckClick() {
		this.server.push(new Action("draw_card", {
			playerId: this.player.id
		}));
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

		$("#loading").addClass("hidden");
		$("#game").removeClass("hidden");
	}
}
