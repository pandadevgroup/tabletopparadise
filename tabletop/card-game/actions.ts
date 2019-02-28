/**
 * @module CardGame
 */

import { Action } from "../server";

export const DECK_SYNC_ACTION = "Deck Sync";

export class DeckSyncAction extends Action {
	constructor(payload: any) {
		super(DECK_SYNC_ACTION, payload);
	}
}
