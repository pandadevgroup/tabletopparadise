/**
 * @module Games
 */
import { CardGame, Card, CardUtils } from "../../card-game";
import * as actions from "../../card-game/actions";
import { BSPokerPlayer } from "./player";
import { BSPokerDomHelper } from "./dom-helper";

//TODO change bridge to BS Poker
export class BSPokerGame extends CardGame<BSPokerDomHelper, BSPokerPlayer> {
	protected currentSuit = null;

	// Trump suit and bidding TODO
	protected trumpSuit = CardUtils.HEART;
	protected firstPlayer = null;

	constructor(
		protected $container: JQuery<HTMLElement>
	) {
		super($container, {
			showDeck: true,
			initialHandSize: 5,
			sortMethod: CardUtils.COMPARE_BY_VALUE,
			// The diamond suit is the lowest to avoid confusion between the red heart and diamond suit
			sortSuitValueSystem:  CardUtils.DEFUALT_SUIT_VALUE_SYSTEM
		}, BSPokerDomHelper, BSPokerPlayer);
	}
	/*
	initializeListeners() {
		super.initializeListeners();

		// When a card is played, play the card
		this.server.on(actions.PLAY_CARDS_ACTION, action => {
			const playerId = action.payload.playerId;
			const player = this.players[playerId];
			const cards = player.getCardsFromIDs(action.payload.cardIds);

			if (!this.currentSuit) {
				this.currentSuit = cards[0].suit;
			}

			this.playCards(player, cards);

			// Show/hide play button if the card was played by this Player
			if (player === this.player) {
				this.player.deselectAllCards();
				this.onSelectedCardsChange(this.player.selectedCards);
			}
		});


		// When the turn switches
		this.server.on(actions.TURN_SWITCH_ACTION, action => {

			// Switch the active player
			if (action.payload.prevTurn) {
				this.players[action.payload.prevTurn].setTurn(false);
			}
			this.players[action.payload.nextTurn].setTurn(true);

			// Update the card
			this.updateCardActionable();

			if (this.tabletop.getPlayedCards().length >= Object.values(this.players).length) {
				// Everyone has played a card
				if (this.playingBackActions) this.handleRoundFinish();
				else {
					if (this.player.id === action.payload.nextTurn) {
						this.player.setTurn(false);
						this.updateCardActionable();
					}
					setTimeout(() => {
						this.handleRoundFinish();
						if (this.player.id === action.payload.nextTurn) {
							this.player.setTurn(true);
							this.updateCardActionable();
						}
					}, 1500);
				}
			} else if (this.tabletop.getPlayedCards().length === 0) {
				// No cards are on the tabletop = new round
				this.firstPlayer = action.payload.nextTurn;
			}
		});
	}

	// At the end of a round
	handleRoundFinish() {

		// Calculate the winning card
		let cards = this.tabletop.getPlayedCards();
		let winningCard = this.getWinningCard(cards, this.currentSuit, this.trumpSuit);

		// Increment the number of tricks taken by the winning player
		let player = this.getPlayerWithId(winningCard.playedBy);
		player.tricks++;

		// Reset the current suit and played cards
		this.currentSuit = null;
		this.tabletop.clearCards(player.position);
		this.tabletop.resize();
		player.resize();
		if (player.partner) player.partner.resize();
	}

	// If host, run setup
	runHostSetup() {
		super.runHostSetup();
		// Default first player is host player
		if (this.firstPlayer === null) {
			this.server.dispatch(new actions.TurnSwitchAction({
				prevTurn: null,
				nextTurn: this.player.id
			}));
		}
	}

	// During game setup
	runGameSetup() {
		this.updateCardActionable();
	}

	// When the player selects/deselects a card.
	onSelectedCardsChange(selectedCards: Card[]) {

		if (selectedCards.length !== 0) {
			// Show the play button if a card is selected.
			this.showPlayButton();
		} else {
			// If no card is selected, hide the play button.
			this.hidePlayButton();
		}

		while (selectedCards.length > 1) {
			// If more than one card is selected, deselect the earliest selected card, and continue until
			// only one card is selected
			this.player.deselectCard(selectedCards[0]);
		}
	}

	// When the play button is clicked, we play the current card.
	onPlayButtonClick() {

		// "play" the card
		this.server.dispatch(
			new actions.PlayCardsAction({
				playerId: this.player.id,
				cardIds: this.player.getSelectedCardIDs()
			})
		);
		let playedCards = this.tabletop.getPlayedCards();

		// If there are as many cards as players, switch the turn to the player who played the winning card.
		if (playedCards.length >= Object.values(this.players).length) {
			this.server.dispatch(
				new actions.TurnSwitchAction({
					prevTurn: this.player.id,
					nextTurn: this.getWinningCard(playedCards, this.currentSuit, this.trumpSuit).playedBy
				})
			);

		// Otherwise, switch the turn to the next player
		} else {
			this.server.dispatch(
				new actions.TurnSwitchAction({
					prevTurn: this.player.id,
					nextTurn: this.player.playerNumber + 1 >= Object.keys(this.players).length
						? this.getPlayerWithNumber(0).id
						: this.getPlayerWithNumber(this.player.playerNumber + 1).id
				})
			);
		}
	}


	// Set each legal card to actionable so it can be played.
	protected updateCardActionable() {

		if (!this.player.isTurn) {
			// If it's not the current player's turn, there is no legal playable card
			this.player.cards.forEach(card => card.setActionable(false));
		} else {

			let hasSuit = false; // Whether the player has a card in the current suit.
			this.player.cards.forEach(card => {
				if (card.suit === this.currentSuit) {

					// All cards in the suit that was lead is legal. Once we find a card in the current suit
					// we update the boolean.
					hasSuit = true;
					card.setActionable(true);
				} else {
					card.setActionable(false);
				}
			});

			// If the player doesn't have any cards in the current suit, then the player can play any card.
			if (!hasSuit)  {
				this.player.cards.forEach(card => card.setActionable(true));
			}
		}
	}

	protected getWinningCard(cards: Card[], currentSuit, trumpSuit): Card {
		let winning = null;
		let suitStrength = [];
		let numStrength = CardUtils.DEFUALT_NUMBER_VALUE_SYSTEM;

		// The only important suits are the current suit and the trump suit. The trump suit beats the current suit.
		suitStrength.push(currentSuit);
		suitStrength.push(trumpSuit);

		// For each card
		cards.forEach(card => {
			if (winning === null) {

				//If there is no current winning card, this card wins by default
				winning = card;

				return;
			}

			// If the suit of this card is greater than the suit of the currently winning card, this is the new winning
			// card. If a suit is not in the suitStrength array, it's index is -1, so it can't beat the winning card.
			if (suitStrength.lastIndexOf(card.suit) > suitStrength.lastIndexOf(winning.suit)) {
				winning = card;
			} else if (
				suitStrength.lastIndexOf(card.suit) == suitStrength.lastIndexOf(winning.suit) &&
				numStrength.indexOf(card.number) > numStrength.indexOf(winning.number)
			) {
				// If the suit of this card is equal to the suit of the winning card, and this card has a higher number,
				// this is the new winning card.
				winning = card;
			}
		});

		return winning;
	}
	*/
}
