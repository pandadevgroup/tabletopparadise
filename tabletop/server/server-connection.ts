/**
 * @module Server
 */

import * as firebase from "firebase";
import { Subject } from "rxjs";
import { filter, distinctUntilChanged } from "rxjs/operators";
import { Action } from "./action";

/**
 * Handles communication with the Firebase server.
 *
 * You may extend this class for your custom game.
 */
export class ServerConnection {
	private actionsSubject: Subject<Action> = new Subject<Action>();
	get actions() {
		return this.actionsSubject.pipe(
			distinctUntilChanged((x, y) => x.timestamp === y.timestamp)
		);
	}

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
		if (!this.gameId) throw "Game ID is null; Perhaps game url parameter is not set?";
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
		return localStorage.getItem("playerId");
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
			.forEach(action => this.actionsSubject.next(action));
	}

	/**
	 * Dispatch an action
	 * @param action The action to dispatch
	 */
	dispatch(action: Action) {
		action.timestamp = Date.now();
		firebase.database().ref(`/game/${this.gameId}/actions`).push(action);
	}
}
