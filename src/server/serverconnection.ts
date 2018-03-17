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

	get(name: string) {
		return firebase.database()
			.ref(`/game/${this.gameId}/${name}`)
			.once("value")
			.then(snap => snap.val());
	}

	getAllActions() {
		return firebase.database()
			.ref(`/game/${this.gameId}/actions`)
			.once("value")
			.then(snap => Object.values(snap.val()) as Action[]);
	}

	start() {
		firebase.database().ref(`/game/${this.gameId}/actions`).on("child_added", (snapshot) => {
			let action = snapshot.val();
			this.listeners.forEach(listener => {
				if (listener.type === action.type) {
					listener.callback(action);
				}
			});
		});
	}

	on(type: string, callback: Function) {
		this.listeners.push({ type, callback });
	}

	dispatch(action: Action) {
		action.meta = { timestamp: Date.now(), timestampString: new Date().toString() };
		return firebase.database().ref(`/game/${this.gameId}/actions`).push(action);
	}
}
