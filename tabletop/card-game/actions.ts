import { Action } from "../server";

export const DECK_SYNC = "Deck Sync";

export class DeckSync extends Action {
	constructor(payload: any) {
		super(DECK_SYNC, payload);
	}
}
