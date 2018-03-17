import { CardGame, CardGamePlayer, Card } from "../../card-game";
import { Deck } from "../../card-game";
import { Action } from "../../server";

export class DrawCards extends CardGame {
	constructor(protected container: JQuery<HTMLElement>) {
		super(container, {
			players: 4,
			initialHandSize: 5,
			showDeck: true
		});
		this.server.on("deck_sync", function(snapshot) {
			this.deck.set(snapshot.val().deck);
			for (let i = 0; i < snapshot.val().hands.length; i ++) {
				this.players[i].set(snapshot.val().hands)
			}
		});
		this.server.get("deckSynced").then((snapshot) => {

			if (!snapshot.val()) {
				this.server.get("host").then((snapshot) => {
					if (snapshot.val() == this.player.id) {

						//if this player is host sync the cards.
						this.server.dispatch(new Action("deck_sync", {
							deck: this.deck.getCardIDs(),
							hands: [this.players[0].getCardIDs(), this.players[1].getCardIDs(), this.players[2].getCardIDs(), this.players[3].getCardIDs()]
						}));
					}
				})
			}
		});

		this.server.on("draw_card", (action: Action) => {
			let playerId = action.payload.playerId;
			let card = this.drawCard(this.players[playerId]);
			if (this.players[playerId] === this.player) card.setActionable(true);
		});

		this.server.on("play_cards", (action: Action) => {
			const playerId = action.payload.playerId;
			const player = this.players[playerId];
			this.playCards(player, player.getCards(action.payload.cardIds));
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
		this.server.dispatch(new Action("play_cards", {
			playerId: this.player.id,
			cardIds: this.player.selectedCards.map(card => card.id)
		}));
		this.player.clearSelectedCards();
	}

	startGame() {
		this.deck.setActionable(true);
		this.players[0].cards.forEach(card => card.setActionable(true));

		$("#loading").addClass("hidden");
		$("#game").removeClass("hidden");
	}
}
