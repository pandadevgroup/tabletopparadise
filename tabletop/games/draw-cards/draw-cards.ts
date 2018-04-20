/**
 * @module Games
 */

import { CardGame, Card } from "../../card-game";
import * as actions from "./actions";

export class DrawCardsGame extends CardGame {
	initializeListeners() {
		super.initializeListeners();
		this.server.on(actions.DRAW_CARD_ACTION, action => {
			let playerId = action.payload.playerId;

			let card = this.drawCard(this.players[playerId]);
			if (playerId === this.player.id) card.setActionable(true);
		});
	}

	runGameSetup() {
		this.player.cards.forEach(card => card.setActionable(true));
	}

	onSelectedCardsChange(selectedCards: Card[]) {
		if (selectedCards.length !== 0) this.showPlayButton();
		else this.hidePlayButton();
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
