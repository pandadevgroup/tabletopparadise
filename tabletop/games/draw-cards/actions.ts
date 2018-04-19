/**
 * @module Games
 */

import { Action } from "../../server";

export const DRAW_CARD_ACTION = "Draw Card";

export class DrawCardAction extends Action {
	constructor(payload: { playerId: string }) {
		super(DRAW_CARD_ACTION, payload);
	}
}
