/**
 * @module BaseGame
 */

import { DomHelper, DomElement, Tabletop } from "../tabletop";
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
	 * The Tabletop class to use. Override with your custom Tabletop class.
	 */
	protected Tabletop = Tabletop;
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
	 * A singleton Tabletop.
	 *
	 * Override this property to use your own Tabletop clss.
	 */
	protected tabletop: Tabletop;

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
		this.initializeTabletop();
		this.initializeServer();
		this.initializeListeners();
		this.initializePlayers()
			.then(() => this.initialize())
			.then(() => {
				if (this.player.isHost) {
					this.runHostSetup();
				}
			})
			.then(() => {
				this.render();
				this.resize();
			});
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
	 * Initializes `this.tabletop`.
	 *
	 * To use your own custom implementation of Tabletop, override property Tabletop.
	 *
	 * If your custom implementation of Tabletop requires additional arguments,
	 * you may override this method.
	 */
	initializeTabletop() {
		this.tabletop = new this.Tabletop(this.$container);
	}

	/**
	 * Creates an instance of a ServerConnection.
	 *
	 * Initializes `this.server`.
	 */
	initializeServer() {
		this.server = new this.ServerConnection();
	}

	/**
	 * Initialize any listeners (card draw, etc).
	 */
	initializeListeners() {}

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
			playerInfo.isHost,
			"position",
			this.domHelper,
			this
		));
		this.player = this.players.find(player => player.id === localPlayerId);
	}

	/**
	 * Called after players are initialized and all initialization is done,
	 * but before runHostSetup() is called.
	 *
	 * Do any further initialization for your custom game here.
	 *
	 * @returns {Promise<void>}
	 */
	async initialize() {}

	/**
	 * This function will be called if the current local player is host.
	 *
	 * In this function, do any one-time initialization tasks.
	 *
	 * Eg. for a card game, sort the card deck.
	 */
	runHostSetup() {}

	render() {}

	resize() {
		this.tabletop.resize();
	}
}
