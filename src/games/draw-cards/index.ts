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

		this.server.get("deckSynced").then(synced => {
			if (synced) return;
			this.server.get("hostId").then(hostId => {
				if (hostId == this.player.id) {
					// if this player is host sync the cards.
					this.server.dispatch(new Action("deck_sync", {
						deck: this.deck.getCardIDs(),
						hands: Object.values(this.players).map(player => ({
							playerId: player.id,
							cardIds: player.getCardIDs()
						}))
					}));
				}
			});
		});

		this.server.on("deck_sync", (action: Action) => {
			const { deck, hands } = action.payload;
			this.deck.setCardOrder(action.payload.deck);
			hands.forEach(hand => {
				const cards = deck.getCardsFromIds(hand.cardIds);
				this.players[hand.playerId].setCards(cards)
			});
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
