/**
 * @module Games
 */

import {
	CardGame,
	Card,
	CardGameDomHelper,
	CardGamePlayer,
	CardGameTabletop,
	Deck,
	CardUtils,
	CardGameOptions
} from "../../card-game";
import * as actions from "../../card-game/actions";
import { ServerConnection } from "../../server";
import { BridgeDomHelper } from "../bridge/dom-helper";
import { BridgePlayer } from "../bridge/player";

export class DrawCardsGame extends CardGame {
	constructor(
		protected $container: JQuery<HTMLElement>
	) {
		super($container, {
			showDeck: true,
			initialHandSize: 5,
			sortMethod: CardUtils.COMPARE_BY_VALUE
		});
	}

	initializeListeners() {
		super.initializeListeners();

		this.server.on(actions.DRAW_CARD_ACTION, action => {
			let playerId = action.payload.playerId;

			let card = this.drawCard(this.players[playerId]);
			if (playerId === this.player.id) card.setActionable(true);
		});

		this.server.on(actions.PLAY_CARDS_ACTION, action => {
			const playerId = action.payload.playerId;
			const player = this.players[playerId];

			this.playCards(player, player.getCardsFromIDs(action.payload.cardIds));
		});
	}

	runGameSetup() {
		this.player.cards.forEach(card => card.setActionable(true));
	}

	onSelectedCardsChange(selectedCards: Card[]) {
		if (selectedCards.length !== 0) this.showPlayButton();
		else this.hidePlayButton();
	}

	onPlayButtonClick() {
		this.server.dispatch(
			new actions.PlayCardsAction({
				playerId: this.player.id,
				cardIds: this.player.getSelectedCardIDs()
			})
		);
	}

	onDeckClick() {
		super.onDeckClick();
		this.server.dispatch(
			new actions.DrawCardAction({
				playerId: this.player.id
			})
		);
	}
}
