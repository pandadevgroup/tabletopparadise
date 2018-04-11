import { CardGame, CardGamePlayer, Card } from "../../card-game";
import { Deck } from "../../card-game";
import { Options } from "../../card-game";

import { Action } from "../../server";

export class BridgeGame extends CardGame {
	public suit = 0; //based on Card.SUITS
	public localPlayersTurn = true; // is it the turn of the player running this instance

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
					this.server.dispatch(
						new Action("deck_sync", {
							deck: this.deck.getCardIDs(),
							hands: Object.values(this.players).map(player => ({
								playerId: player.id,
								cardIds: player.getCardIDs()
							}))
						})
					);
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

			this.playCards(player, player.getCards(action.payload.cardIds));
		});
		this.server.on("turnSwitch", (action: Action) => {
			this.player.setCardsActionable(action.payload.nextTurn !== this.player.id);
			if (action.payload.nextTurn !== this.player.id) {
				console.log("My Turn!");
			}
		});
	}

	validateCards(cards) {
		if (!this.localPlayersTurn) {
			return;
		}
		for (var i = 0; i < cards.length; i++) {
			if (cards[i].suit != Card.suits[this.suit]) {
				return false;
			}
		}
		this.server.dispatch(
			new Action("turn_switch", {
				parent: this.player.id,
				nextTurn:
					this.players[this.player.id].playerNumber + 1 >= Object.keys(this.players).length
						? this.players[0].id
						: this.players[this.getPlayerIdByNumber(this.players[this.player.id].playerNumber + 1)].id
			})
		);

		this.suit = this.suit > Card.suits.length - 1 ? 0 : this.suit + 1;
		return true;
	}

	onDeckClick() {
		this.server.dispatch(
			new Action("draw_card", {
				playerId: this.player.id
			})
		);
	}

	onSelectedCardsChange(selectedCards: Card[]) {
		if (selectedCards.length !== 0) this.showPlayButton = true;
		else this.showPlayButton = false;
	}

	onPlayBtnClick() {
		if (!this.validateCards(this.player.selectedCards)) {
			return;
		}
		this.server.dispatch(
			new Action("play_cards", {
				playerId: this.player.id,
				cardIds: this.player.selectedCards.map(card => card.id)
			})
		);
		this.player.clearSelectedCards();
		this.onSelectedCardsChange(this.player.selectedCards);
	}

	startGame() {
		this.deck.setActionable(true);

		$("#loading").addClass("hidden");
		$("#game").removeClass("hidden");
	}
}
