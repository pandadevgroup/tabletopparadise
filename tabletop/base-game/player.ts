/**
 * @module BaseGame
 */

import { BaseGame } from "./base-game";
import { DomElement, DomHelper } from "../tabletop";

/**
 * A Player object represents a "player" in the tabletop game. It is responsible for
 * rendering the player and communicating with the Game object if an action is done (eg. a card was played)
 *
 * Extend this class to add render logic and game logic relating to the player.
 *
 * An example extension for a card game:
 *
 * ```javascript
 * export class CardGamePlayer extends Player {
 *     cards = [];
 *     selectedCards = [];
 *
 *     constructor(
 *         public id: string,
 *         public name: string,
 *         public position: "top" | "left" | "right" | "bottom",
 *         protected domHelper: CardGameDomHelper,
 *         protected game: CardGame,
 *         protected hideCards: boolean
 *     ) {
 *         super(id, name, position, domHelper, game);
 *     }
 *
 *     resize() {
 *         let playerPos = // TODO: get player position
 *         this.domHelper.updateElPos(this.player$, playerPos);
 *         this.cards.forEach(card => card.resize());
 *     }
 *
 *     render() {
 *         this.player$ = this.domHelper.createPlayerFrag(this.name);
 *         let playerPos = // TODO: get player position
 *         this.domHelper.updateEl(this.player, playerPos);
 *         this.cards.forEach(card => card.render());
 *     }
 *
 *     addCards(cards) {
 *         // TODO
 *     }
 *
 *     removeCards(cards) {
 *         // TODO
 *     }
 *
 *     handleCardClick(card) {
 *         // TODO
 *         this.game.onCardClick(this, card);
 *     }
 * }
 * ```
 */
export class Player implements DomElement {
	/**
	 * The jQuery element that contains all Player-related DOM code.
	 *
	 * Anything that needs to be rendered that belongs to the
	 * player should be appended to player$.
	 */
	protected player$: JQuery<HTMLElement>;
	/**
	 * Whether or not it is the player's turn right now.
	 */
	isTurn = false;

	constructor(
		/**
		 * A unique ID to identify the player. Can be as simple as an auto-incrementing number.
		 */
		public id: string,
		/**
		 * The given player name, to be rendered.
		 */
		public name: string,
		/**
		 * If true, the player is hosting the game.
		 *
		 * This can be useful for determining who does one-time initializations,
		 * such as (in a card game) sorting the deck.
		 */
		public isHost: boolean,
		/**
		 * If true, the player is the person on the computer playing the game.
		 *
		 * Otherwise, the player is a remote player.
		 */
		public isLocal: boolean,
		/**
		 * The position of the player to be rendered onto the screen.
		 *
		 * For a four-player game, typically `"top" | "left" | "right" | "bottom"`.
		 */
		public position: any,
		/**
		 * An instance of a Dom Helper, typically supplied by BaseGame.
		 */
		protected domHelper: DomHelper,
		/**
		 * The game object that the player belongs to.
		 *
		 * The player object will utilize the game object to notify it of
		 * any player actions (eg. a card was played).
		 */
		protected game: BaseGame
	) {}

	setTurn(turn: boolean) {
		this.isTurn = turn;
	}

	render() {}
	resize() {}
}
