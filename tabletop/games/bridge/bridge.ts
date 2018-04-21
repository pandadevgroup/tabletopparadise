/**
 * @module Games
 */
import { CardGame, Card, CardUtils, CardGameDomHelper } from "../../card-game";
import * as actions from "../../card-game/actions";
import { BridgePlayer } from "./player";

export class BridgeGame extends CardGame<CardGameDomHelper, BridgePlayer> {
	// TODO
	protected currentSuit = CardUtils.SPADE;
	protected currentTurn = null;

	constructor(
		protected $container: JQuery<HTMLElement>
	) {
		super($container, {
			showDeck: false,
			initialHandSize: 13,
			sortMethod: CardUtils.COMPARE_BY_SUIT
		}, CardGameDomHelper, BridgePlayer);
	}

	initializeListeners() {
		super.initializeListeners();

		this.server.on(actions.PLAY_CARDS_ACTION, action => {
			const playerId = action.payload.playerId;
			const player = this.players[playerId];

			this.playCards(player, player.getCardsFromIDs(action.payload.cardIds));

			// Show/hide play button
			if (player === this.player) {
				this.player.deselectAllCards();
				this.onSelectedCardsChange(this.player.selectedCards);
			}
		});

		this.server.on(actions.TURN_SWITCH_ACTION, action => {
			this.currentTurn = action.payload.nextTurn;
			if (action.payload.prevTurn) this.players[action.payload.prevTurn].setTurn(false);
			this.players[action.payload.nextTurn].setTurn(true);
			this.updateCardActionable();
		});
	}

	runHostSetup() {
		super.runHostSetup();
		// Default first player is host player
		if (this.currentTurn === null) {
			this.server.dispatch(new actions.TurnSwitchAction({
				prevTurn: null,
				nextTurn: this.player.id
			}));
		}
	}

	runGameSetup() {
		this.updateCardActionable();
	}

	onSelectedCardsChange(selectedCards: Card[]) {
		if (selectedCards.length !== 0) this.showPlayButton();
		else this.hidePlayButton();

		if (selectedCards.length > 1) this.player.deselectCard(selectedCards[0]);
	}

	onPlayButtonClick() {
		this.server.dispatch(
			new actions.PlayCardsAction({
				playerId: this.player.id,
				cardIds: this.player.getSelectedCardIDs()
			})
		);
		this.server.dispatch(
			new actions.TurnSwitchAction({
				prevTurn: this.player.id,
				nextTurn: this.player.playerNumber + 1 >= Object.keys(this.players).length
					? this.getPlayerWithNumber(0).id
					: this.getPlayerWithNumber(this.player.playerNumber + 1).id
			})
		);
	}

	protected updateCardActionable() {
		if (!this.player.isTurn) {
			this.player.cards.forEach(card => card.setActionable(false));
		} else if (this.player.selectedCards.length !== 0) {
			this.player.cards.forEach(card => card.setActionable(false));
			this.player.selectedCards.forEach(card => card.setActionable(true));
		} else {
			this.player.cards.forEach(card => (
				card.suit === this.currentSuit
					? card.setActionable(true)
					: card.setActionable(false)
				)
			);
		}
	}
}
