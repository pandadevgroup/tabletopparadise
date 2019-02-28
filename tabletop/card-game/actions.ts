/**
 * @module CardGame
 */

import { Action } from "../server";

export const DECK_SYNC_ACTION = "Deck Sync";
export const DRAW_CARD_ACTION = "Draw Card";
export const PLAY_CARDS_ACTION = "Play Cards";
export const TURN_SWITCH_ACTION = "Turn Switch";

export class DeckSyncAction extends Action {
	constructor(payload: any) {
		super(DECK_SYNC_ACTION, payload);
	}
}

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

export class TurnSwitchAction extends Action {
	constructor(payload: { prevTurn: string, nextTurn: string }) {
		super(TURN_SWITCH_ACTION, payload);
	}
}
