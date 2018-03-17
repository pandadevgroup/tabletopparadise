import { Action } from "./action";
import "firebase";

export class ServerConnection {
	private listeners: { type: string, callback: Function }[] = [];
	/**
	 * If active is false, no events will be emitted.
	 *
	 * Set this to false when running initial actions, then set to true when the game starts.
	 */
	public active = false;

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

	getHost() {
		return firebase.database().ref(`/game/${this.gameId}/host`).once("value");
	}

	getAllActions() {
		return firebase.database()
			.ref(`/game/${this.gameId}/actions`)
			.once("value")
			.then(snap => Object.values(snap.val()) as Action[]);
	}

	start() {
		firebase.database().ref(`/game/${this.gameId}/actions`).limitToLast(1).on("child_added", (snapshot) => {
			if (!this.active) return;
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
        return firebase.database().ref(`/game/${this.gameId}/actions`).push(action);
    }
}
