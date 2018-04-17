/**
 * @module Server
 */

import * as firebase from "firebase";
import { Action } from "./action";

/**
 * Handles communication with the Firebase server.
 *
 * You may extend this class for your custom game.
 */
export class ServerConnection {
	/**
	 * Array of listeners for events.
	 */
	protected listeners: { event: string, callback: Function }[] = [];

	/**
	 * Constructs a new instance of ServerConnection and starts listening for events.
	 * @param gameId a unique game id used to identify the game.
	 */
	constructor(protected gameId?: string) {
		if (!firebase.apps.length) {
			// Initialize Firebase
			var config = {
				apiKey: "AIzaSyAulUtZj74h98YWLWJ9uZPn1nI0N_480HQ",
				authDomain: "tabletop-paradise.firebaseapp.com",
				databaseURL: "https://tabletop-paradise.firebaseio.com",
				projectId: "tabletop-paradise",
				storageBucket: "tabletop-paradise.appspot.com",
				messagingSenderId: "941646063027"
			};
			firebase.initializeApp(config);
		}
		if (!gameId) this.gameId = this.getGameId();
		this.start();
	}

	/**
	 * Starts listening for actions. Automatically called when
	 * ServerConnection is initialized.
	 */
	start() {
		firebase.database()
			.ref(`/game/${this.gameId}/actions`)
			.orderByChild("timestamp")
			.startAt(Date.now())
			.on("child_added", (snapshot) => {
				let action = snapshot.val();
				this.handleAction(action);
			});
	}

	/**
	 * Returns the current game id.
	 *
	 * Game id = /game/?game=gameId
	 */
	getGameId() {
		let paramName = "game";
		var regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(window.location.href);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	/**
	 * Gets all players in game
	 */
	async getAllPlayers() {
		let snap = await firebase.database().ref(`/game/${this.gameId}/players`).once("value");
		let data = snap.val();

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
		return sessionStorage.getItem("playerId");
	}

	/**
	 * Runs through all previous actions.
	 *
	 * Useful when a user disconnects and reconnects.
	 * Attach all listeners, then call this function.
	 */
	async runPrevActions() {
		let snap = await firebase.database()
			.ref(`/game/${this.gameId}/actions`)
			.once("value");
		if (snap.val() == null) return null;
		return (Object.values(snap.val()) as Action[])
			.forEach(action => this.handleAction(action));
	}

	/**
	 * Listen to an event
	 * @param event The event name to listen to
	 * @param callback A function to call when an action with the given event occurs
	 */
	on(event: string, callback: Function) {
		this.listeners.push({ event, callback });
	}

	/**
	 * Dispatch an action
	 * @param action The action to dispatch
	 */
	dispatch(action: Action) {
		action.timestamp = Date.now();
		firebase.database().ref(`/game/${this.gameId}/actions`).push(action);
	}

	/**
	 * Calls all listeners listening for the action
	 * @param action The action that occurred
	 */
	protected handleAction(action: Action) {
		this.listeners.forEach(listener => {
			if (listener.event === action.event) {
				listener.callback(action);
			}
		});
	}
}
