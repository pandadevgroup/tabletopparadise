import { Action } from "./action";
import "firebase";

export class ServerConnection {
	private listeners: { type: string, callback: Function }[] = [];

	constructor(
		private gameId: string
	) {
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

		this.start();
	}

	auth() {
		return firebase.auth();
	}

	get(name: string) {
		return firebase.database()
			.ref(`/game/${this.gameId}/${name}`)
			.once("value")
	}

	set(name: string, value: any) {
		return firebase.database()
			.ref(`/game/${this.gameId}/${name}`)
			.set(value);
	}

	runPrevActions() {
		return firebase.database()
			.ref(`/game/${this.gameId}/actions`)
			.once("value")
			.then((snap) => {
				if (snap.val() == null) {
					return snap.val();
				} else {
					return Object.values(snap.val()) as Action[]
				}
			})
			.then((actions) => {
				if (actions != null) {
					actions.forEach(action => this.handleAction(action))
				}
			});
	}

	start() {
		firebase.database()
			.ref(`/game/${this.gameId}/actions`)
			.orderByChild("meta/timestamp")
			.startAt(Date.now())
			.on("child_added", (snapshot) => {
				let action = snapshot.val();
				this.handleAction(action);
			});
	}

	on(type: string, callback: Function) {
		this.listeners.push({ type, callback });
	}

	dispatch(action: Action) {
		action.meta = { timestamp: Date.now(), timestampString: new Date().toString() };
		return firebase.database().ref(`/game/${this.gameId}/actions`).push(action);
	}

	private handleAction(action: Action) {
		this.listeners.forEach(listener => {
			if (listener.type === action.type) {
				listener.callback(action);
			}
		});
	}
}
