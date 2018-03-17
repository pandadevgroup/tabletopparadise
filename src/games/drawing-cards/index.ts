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

		this.server.on("draw_card", (action: Action) => {
			let playerId = action.payload.playerId;
			this.drawCard(this.players[playerId]);
		});

		this.server.on("play_cards", (action: Action) => {
			let playerId = action.payload.playerId;
			this.playCards(this.players[playerId], action.payload.cards);
		});
	}

	onDeckClick() {
		this.server.dispatch(new Action("draw_card", {
			playerId: this.player.id
		}));
	}

	onSelectedCardsChange(selectedCards: Card[]) {
		if (selectedCards.length !== 0) this.showPlayButton = true;
		else this.showPlayButton = false;
	}

	onPlayBtnClick() {
		this.server.dispach(new Action("play_cards", {
			playerId: this.player.id,
			cards: this.player.selectedCards
		}));
		this.player.clearSelectedCards();
	}

	startGame() {
		this.deck.setAcitonable(true);
		this.players[0].cards.forEach(card => card.setActionable(true));

		$("#loading").addClass("hidden");
		$("#game").removeClass("hidden");
	}
}
