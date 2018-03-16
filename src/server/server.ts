import { Action } from "./action";

export class Server {
	private listeners: Function[] = [];

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

		this.startWatch();
	}

	startWatch() {
		firebase.database().ref(`/game/${this.gameId}/actions`).on("child_added", (snapshot) => {
			this.listeners.forEach(listener => listener(snapshot.val()));
		});
	}

	listen(callback: Function) {
		this.listeners.push(callback);
	}

    push(action: Action) {
        return firebase.database().ref(`/game/${this.gameId}/actions`).push(action);
    }
}
