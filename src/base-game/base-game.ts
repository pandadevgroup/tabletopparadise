/**
 * @module BaseGame
 */

import { DomHelper, DomElement } from "../tabletop";
import { ServerConnection } from "../server";
import { Player } from "./player";

/**
 * BaseGame provides the necessary utilities for a game.
 *
 * It handles resizing, creating a [[Tabletop.Tabletop]] instance, communicating with the server, etc.
 *
 * Extend this class to create functionality for a custom game.
 * You may override any public/protected method provided you call `super()`.
 */
export class BaseGame implements DomElement {
	/**
	 * A singleton Dom Helper.
	 *
	 * Override this property to use your own custom DomHelper.
	 */
	protected domHelper: DomHelper;
	/**
	 * A singleton Server Connection.
	 *
	 * Override this property if you are using a custom server connection.
	 */
	protected server: ServerConnection;
	/**
	 * An array of players currently playing the tabletop game.
	 *
	 * Override this property to use your own custom Player class.
	 */
	protected players: Player[];
	/**
	 * The local player playing on the computer.
	 *
	 * Override this property to use your own custom Player class.
	 */
	protected player: Player;

	/**
	 * Creates an instance of a BaseGame.
	 *
	 * You may override this constructor to do additional work.
	 * Remember to call `super`. If you are using your own implementation
	 * of DomHelper, ServerConnection, or Player, override the functions
	 * [[initializeDomHelper]], [[initializeServer]], and [[initializePlayers]]
	 * to instantiate your custom classes.
	 *
	 * @param {JQuery<HTMLElement}
	 */
	constructor(
		protected $container: JQuery<HTMLElement>
	) {
		this.initializeDomHelper();
		this.initializeDom();
		this.initializeServer();
		this.initializePlayers();
	}

	/**
	 * Creates an instance of a DomHelper.
	 *
	 * Initializes `this.domHelper`.
	 *
	 * Override this method to use your custom implementation of DomHelper.
	 * Do not call `super()`.
	 */
	initializeDomHelper() {

	}

	/**
	 * Initializes any event listeners related to the dom, primarily `$(window).resize()`.
	 * Called immediately after [[initializeDomHelper]].
	 *
	 * You may extend this method to add additional event listeners.
	 * Call `super()` to set up the window resize listener.
	 */
	initializeDom() {
		let debounce;
		$(window).resize(() => {
			clearTimeout(debounce);
			debounce = setTimeout(() => this.resize(), 200);
		});
	}

	/**
	 * Creates an instance of a ServerConnection.
	 *
	 * Initializes `this.server`.
	 *
	 * Override this method to use your own custom implementation of ServerConnection.
	 * Do not call `super()`.
	 */
	initializeServer() {

	}

	/**
	 * Initializes `this.player` and `this.players`.
	 *
	 * Override this method to use your own custom implementation of Player.
	 * Do not call `super()`.
	 */
	initializePlayers() {

	}

	render() {

	}

	resize() {

	}
}
