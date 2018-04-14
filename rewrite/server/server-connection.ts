/**
 * @module Server
 */

import "firebase";
import { Action } from "./action";

export class ServerConnection {
	protected listeners: { event: string, callback: Function }[] = [];

	constructor(protected gameId: string) {
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
		this.start();
	}

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

	runPrevActions() {
		return firebase.database()
			.ref(`/game/${this.gameId}/actions`)
			.once("value")
			.then(snap => {
				if (snap.val() == null) {
					return null;
				} else {
					return Object.values(snap.val()) as Action[]
				}
			})
			.then(actions => {
				if (actions != null) {
					actions.forEach(action => this.handleAction(action))
				}
			});
	}

	on(event: string, callback: Function) {
		this.listeners.push({ event, callback });
	}

	dispatch(action: Action) {
		action.timestamp = Date.now();
		firebase.database().ref(`/game/${this.gameId}/actions`).push(action);
	}

	protected handleAction(action: Action) {
		this.listeners.forEach(listener => {
			if (listener.event === action.event) {
				listener.callback(action);
			}
		});
	}
}
