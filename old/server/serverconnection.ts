import { Action } from "./action";
import "firebase";

export class ServerConnection {
	private listeners: { event: string, callback: Function }[] = [];

	constructor(
		private gameId: string
	) {
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

	on(event: string, callback: Function) {
		this.listeners.push({ event, callback });
	}

	dispatch(action: Action) {
		action.meta.timestamp = Date.now();
		action.meta.timestampString = new Date().toString();
		action.meta.key = firebase.database().ref(`/game/${this.gameId}/actions`).push().key;


		return this.set(`actions/${action.meta.key}`, action);
	}

	private handleAction(action: Action) {
		this.listeners.forEach(listener => {
			if (listener.event === action.event) {

				if (action.meta.type === Action.ONE_TIME_REQUEST) {

					if (!action.meta.expired && (action.meta.fufilledBy != undefined ? action.meta.fufilledBy.indexOf(this.auth().currentUser.uid) == -1 : true)) {
						if (action.meta.expireDate > Date.now()) {
							//expired
							this.set(`actions/${action.meta.key}/meta/expired`, true);
							return;
						} else {
							if (!action.meta.fufilledBy)
								action.meta.fufilledBy = [this.auth().currentUser.uid]
							else
								action.meta.fufilledBy.push(this.auth().currentUser.uid);
							this.set(`actions/${action.meta.key}/meta/fufilledBy`, action.meta.fufilledBy);
							console.log("OTA");
							console.log(action);
							listener.callback(action);
						}

					}

				} else {
					listener.callback(action);
				}
			}
		});
	}
	firebase() {
		return firebase;
	}
}
