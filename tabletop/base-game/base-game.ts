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
export abstract class BaseGame implements DomElement {
	/**
	 * The DomHelper class to use. Override with your custom DomHelper class.
	 */
	protected DomHelper = DomHelper;
	/**
	 * The Player class to use. Override with your custom Player class.
	 */
	protected Player = Player;
	/**
	 * The ServerConnection class to use. Override with your custom ServerConnection class.
	 */
	protected ServerConnection = ServerConnection;
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
	 * of DomHelper, ServerConnection, or Player, override properties
	 * DomHelper, ServerConnection, and Player with your custom classes.
	 *
	 * @param {JQuery<HTMLElement}
	 */
	constructor(
		protected $container: JQuery<HTMLElement>
	) {
		this.initializeDom();
		this.initializeServer();
		this.initializePlayers();
	}

	/**
	 * Initializes `this.domHelper` and any event listeners related to the dom,
	 * primarily `$(window).resize()`.
	 *
	 * You may extend this method to add additional event listeners
	 * or do any additional dom setup.
	 *
	 * To use your own custom implementation of DomHelper, override property DomHelper.
	 */
	initializeDom() {
		this.domHelper = new this.DomHelper(this.$container);

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
		// TODO: Get Game ID
		this.server = new this.ServerConnection();
	}

	/**
	 * Initializes `this.player` and `this.players`.
	 *
	 * When overriding, initialize `this.player` and `this.players`.
	 */
	async initializePlayers() {
		let players = await this.server.getAllPlayers();
		let localPlayerId = this.server.getLocalPlayerId();

		this.players = players.map(playerInfo => new this.Player(
			playerInfo.id,
			playerInfo.username,
			"position",
			this.domHelper,
			this
		));
		this.player = this.players.find(player => player.id === localPlayerId);
	}

	abstract render();
	abstract resize();
}
