/**
 * @module Server
 */

/**
 * Represents an Action in the tabletop game.
 *
 * In a card game, examples of actions include:
 * - Drawing a card
 * - Playing a card
 * - Placing a bid (Bridge)
 *
 * It is recommended to extend this class to create your own Action classes.
 *
 * Example (For action of Draw Card):
 *
 * ```javascript
 * // actions.ts
 *
 * export const DRAW_CARD = "Draw Card";
 *
 * export class DrawCardAction extends Action {
 *     constructor(cardNumber: number) {
 *         super(DRAW_CARD, cardNumber);
 *     }
 * }
 * ```
 */
export class Action {
	/**
	 * Timestamp of when Action is submitted.
	 *
	 * Set by ServerConnection when the Action is submitted to Firebase.
	 */
	public timestamp: number;

	constructor(
		/**
		 * An identifier for the type of event.
		 *
		 * Examples: `"Draw Card"`, `"Shuffle Deck"`, etc.
		 */
		public readonly event: string,
		/**
		 * Any data associated with the action.
		 *
		 * Example: Action is `"Set Deck"`, payload is an array representing the deck.
		 */
		public payload?: any
	) {}
}
