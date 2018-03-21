import { CardGame, CardGamePlayer, Card } from "../../card-game";
import { Deck } from "../../card-game";
import { Options } from "../../card-game";

import { Action } from "../../server";

export class DrawCards extends CardGame {
	constructor(protected container: JQuery<HTMLElement>) {
		super(container, {
			players: 4,
			initialHandSize: 5,
			showDeck: true
		});
		Options.init();

		this.server.on("reload", (action: Action) => {
			window.location.href = window.location.href;
		});

		this.server.get("deckSynced").then(snapshot => {
			if (snapshot.val()) {
				// Since this is only called once we dont need it since it can't be shown.
				// If this is done in an listener in the future, uncomment this line.
				//this.domHelper.hideWaitingMsg();

				return;
			}
			this.server.get("hostId").then(snapshot => {
				let hostId = snapshot.val();
				if (hostId == this.player.auth.uid) {
					// if this player is host sync the cards.
					this.server.dispatch(new Action("deck_sync", {
						deck: this.deck.getCardIDs(),
						hands: Object.values(this.players).map(player => ({
							playerId: player.id,
							cardIds: player.getCardIDs()
						}))
					}));
					this.server.set("deckSynced", true);
				} else {
					this.domHelper.showWaitingMsg();
					this.deck.setActionable(false);
				}
			});
		});

		this.server.on("deck_sync", (action: Action) => {
			const { deck, hands } = action.payload;
			this.deck.setCardOrder(action.payload.deck);
			hands.forEach(hand => {
				const cards = this.deck.getCardsFromIds(hand.cardIds);
				this.players[hand.playerId].setCards(cards);
			});
		});

		this.server.on("draw_card", (action: Action) => {
			let playerId = action.payload.playerId;
			let card = this.drawCard(this.players[playerId]);
			if (playerId === this.player.id) card.setActionable(true);
		});

		this.server.on("play_cards", (action: Action) => {
			const playerId = action.payload.playerId;
			const player = this.players[playerId];
			
			if (action.payload.cardIds.substring(1) != "s" && action.payload.cardIds.substring(1) != "h") {
				return;//only allow spades or hearts
			}
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
		this.onSelectedCardsChange(this.player.selectedCards);
	}

	startGame() {
		this.deck.setActionable(true);

		$("#loading").addClass("hidden");
		$("#game").removeClass("hidden");
	}
}
