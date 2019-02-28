/**
 * @module Server
 */

import { Subject } from "rxjs";
import { distinctUntilChanged, filter } from "rxjs/operators";
import { Action } from "./action";
import * as io from "socket.io-client";
import { Player } from "../base-game";

/**
 * Handles communication with the Firebase server.
 *
 * You may extend this class for your custom game.
 */
export class ServerConnection {
	private SERVER_HOST = "http://localhost:3001";

	private actionsSubject: Subject<Action> = new Subject<Action>();
	get actions() {
		return this.actionsSubject.pipe(
			distinctUntilChanged((x: Action, y: Action) => x.timestamp === y.timestamp)
		);
	}

	private socket;

	/**
	 * Constructs a new instance of ServerConnection and starts listening for events.
	 * @param gameId a unique game id used to identify the game.
	 */
	constructor(protected gameId?: string) {
		if (!gameId) this.gameId = this.getGameId();
		if (!this.gameId) throw "Game ID is null; Perhaps game url parameter is not set?";
		this.start();
	}

	/**
	 * Starts listening for actions. Automatically called when
	 * ServerConnection is initialized.
	 */
	start() {
		this.socket = io("http://localhost:3001");
		this.socket.on("new_action", action => {
			this.actionsSubject.next(action);
		});
	}

	on(type: string, callback: (value: Action) => void) {
		this.actions.pipe(filter(action => action.type === type)).subscribe(callback);
	}

	/**
	 * Returns the current game id.
	 *
	 * Game id = /game/?game=gameId
	 */
	getGameId() {
		let paramName = "game";
		let regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(window.location.href);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	/**
	 * Gets all players in game
	 */
	async getAllPlayers(): Promise<{ id: string, username: string, isHost: boolean }[]> {
		const response = await fetch(`${this.SERVER_HOST}/players`);
		const data = await response.json();
		let players = [];
		for (let playerId in data) {
			players.push({
				id: playerId,
				username: data[playerId].username,
				isHost: data[playerId].isHost
			});
		}
		return players;
	}

	/**
	 * Get the player ID of the player currently playing on the computer.
	 *
	 * Will be null if the player has not logged in.
	 */
	getLocalPlayerId() {
		return localStorage.getItem("playerId");
	}

	/**
	 * Runs through all previous actions.
	 *
	 * Useful when a user disconnects and reconnects.
	 * Attach all listeners, then call this function.
	 */
	async runPrevActions() {
		const response = await fetch(`${this.SERVER_HOST}/actions`);
		const data: Action[] = await response.json();
		return data.forEach(action => this.actionsSubject.next(action));
	}

	/**
	 * Dispatch an action
	 * @param action The action to dispatch
	 */
	dispatch(action: Action) {
		action.timestamp = Date.now();
		this.socket.emit("new_action", action);
		this.actionsSubject.next(action);
	}
}
