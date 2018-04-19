/**
 * @module Games
 */

import { CardGame } from "../../card-game";
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

	onDeckClick() {
		super.onDeckClick();
		this.server.dispatch(
			new actions.DrawCardAction({
				playerId: this.player.id
			})
		);
	}
}
