/**
 * @module Games
 */

import { Action } from "../../server";

export const DRAW_CARD_ACTION = "Draw Card";
export const PLAY_CARDS_ACTION = "Play Cards";

export class DrawCardAction extends Action {
	constructor(payload: { playerId: string }) {
		super(DRAW_CARD_ACTION, payload);
	}
}

export class PlayCardsAction extends Action {
	constructor(payload: { playerId: string, cardIds: string[] }) {
		super(PLAY_CARDS_ACTION, payload);
	}
}
