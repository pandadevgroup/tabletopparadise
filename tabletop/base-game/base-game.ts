/**
 * @module BaseGame
 */

import { DomHelper, DomElement, Tabletop } from "../tabletop";
import { ServerConnection } from "../server";
import { Player } from "./player";

import "./styles/game.scss";

/**
 * BaseGame provides the necessary utilities for a game.
 *
 * It handles resizing, creating a [[Tabletop.Tabletop]] instance, communicating with the server, etc.
 *
 * Extend this class to create functionality for a custom game.
 * You may override any public/protected method provided you call `super()`.
 */
export class BaseGame<
	DomHelperType extends DomHelper = DomHelper,
	PlayerType extends Player = Player,
	TabletopType extends Tabletop = Tabletop,
	ServerConnectionType extends ServerConnection = ServerConnection
> implements DomElement {
	/**
	 * A singleton Dom Helper.
	 */
	protected domHelper: DomHelperType;
	/**
	 * A singleton Server Connection.
	 */
	protected server: ServerConnectionType;
	/**
	 * An object mapping player ids to player objects.
	 */
	protected players: { [id: string]: PlayerType };
	/**
	 * The local player playing on the computer.
	 */
	protected player: PlayerType;
	/**
	 * A singleton Tabletop.
	 */
	protected tabletop: TabletopType;

	/**
	 * Whether or not the play button is shown.
	 */
	protected playButton: boolean = false;
	/**
	 * A jQuery object representing the play button.
	 */
	protected $playButton: JQuery<HTMLElement>;

	/**
	 * Whether or not the game is playing back actions.
	 */
	protected playingBackActions = true;

	/**
	 * Creates an instance of a BaseGame.
	 *
	 * You may override this constructor to do additional work.
	 * Remember to call `super`. If you are using your own implementation
	 * of DomHelper, ServerConnection, or Player, pass in the appropriate
	 * classes to the constructor.
	 *
	 * @param {JQuery<HTMLElement}
	 */
	constructor(
		protected $container: JQuery<HTMLElement>,
		protected DomHelperClass: any = DomHelper,
		protected PlayerClass: any = Player,
		protected TabletopClass: any = Tabletop,
		protected ServerConnectionClass: any = ServerConnection
	) {
		this.initializeDom();
		if (!this.domHelper) throw "Error: `BaseGame.domHelper` is not initialized. Make sure to instantiate `BaseGame.domHelper` in `initializeDom()`.";
		this.initializeTabletop();
		if (!this.tabletop) throw "Error: `BaseGame.tabletop` is not initialized. Check `initializeTabletop()`."
		this.initializeLayoutOpts();
		this.initializeServer();
		if (!this.server) throw "Error: `BaseGame.server` is not initialized.";
		this.initializeListeners();
		this.initializePlayers()
			.then(() => {
				if (!this.players) throw "Error: `BaseGame.players` is not initialized.";
				if (!this.player) throw "Error: `BaseGame.player` is not initialized. Is the player signed in to the correct game?";
			})
			.then(() => this.initialize())
			.then(() => this.server.runPrevActions())
			.then(() => {
				this.playingBackActions = false;
				if (this.player.isHost) {
					this.runHostSetup();
				}
			})
			.then(() => this.runGameSetup())
			.then(() => {
				this.domHelper.ready();
				this.render();
				this.resize();
				this.domHelper.renderFrag();
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
		this.domHelper = new this.DomHelperClass(this.$container);

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
		this.tabletop = new this.TabletopClass(this.$container);
	}

	/**
	 * Creates an instance of a ServerConnection.
	 *
	 * Initializes `this.server`.
	 */
	initializeServer() {
		this.server = new this.ServerConnectionClass();
	}

	/**
	 * Initialize any listeners (card draw, etc).
	 */
	initializeListeners() {}

	/**
	 * Called after host setup is done and all previous actions are run.
	 *
	 * Do any final initializations for the game here.
	 */
	runGameSetup() {}

	/**
	 * Initializes `this.player` and `this.players`.
	 *
	 * When overriding, initialize `this.player` and `this.players`.
	 */
	async initializePlayers() {
		let players = await this.server.getAllPlayers();
		let localPlayerId = this.server.getLocalPlayerId();

		this.players = {};
		players.map(playerInfo => {
			this.players[playerInfo.id] = new this.PlayerClass(
				playerInfo.id,
				playerInfo.username,
				playerInfo.isHost,
				playerInfo.id === localPlayerId,
				"position",
				this.domHelper,
				this
			);
		});
		this.player = this.players[localPlayerId];
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

	showPlayButton() {
		this.playButton = true;
		this.domHelper.showPlayButton(this.$playButton);
	}

	hidePlayButton() {
		this.playButton = false;
		this.domHelper.hidePlayButton(this.$playButton);
	}

	/**
	 * This function will be called if the current local player is host.
	 *
	 * In this function, do any one-time initialization tasks.
	 *
	 * Eg. for a card game, sort the card deck.
	 */
	runHostSetup() {}

	/**
	 * This button will be called when the play button is clicked.
	 */
	onPlayButtonClick() {}

	/**
	 * This will be called immediately after tabletop resizes.
	 *
	 * Use this function to update any layout options in DomHelper.
	 */
	updateLayoutOpts() {}

	/**
	 * Initialize any layout options in DomHelper here.
	 *
	 * Warning: the width and height of tabletop has not yet been updated
	 * when this function is called. Do not use `tabletop.width` or `tabletop.height`.
	 */
	initializeLayoutOpts() {}

	render() {
		this.tabletop.render();
		Object.values(this.players).map(player => player.render());
		this.$playButton = this.domHelper.createPlayButtonFrag();
		this.$playButton.click(() => this.onPlayButtonClick());
	}

	resize() {
		this.tabletop.resizeDimensions();
		this.updateLayoutOpts();
		this.tabletop.resize();
		Object.values(this.players).map(player => player.resize());
		if (this.playButton) this.showPlayButton();
		else this.hidePlayButton();
	}
}
