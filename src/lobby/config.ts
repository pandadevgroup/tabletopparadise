import * as firebase from "firebase";

export const firebaseConfig = {
	apiKey: "AIzaSyAulUtZj74h98YWLWJ9uZPn1nI0N_480HQ",
	authDomain: "tabletop-paradise.firebaseapp.com",
	databaseURL: "https://tabletop-paradise.firebaseio.com",
	projectId: "tabletop-paradise",
	storageBucket: "tabletop-paradise.appspot.com",
	messagingSenderId: "941646063027"
};

export const firebaseUIConfig = {
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		// firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		// firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		// firebase.auth.GithubAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	signInFlow: "popup",
	callbacks: {
		'signInSuccessWithAuthResult': function(authResult, redirectUrl) {
		  	if (authResult.user) {
				console.log(authResult.user);
			}
			// Do not redirect.
			return false;
		}
	},
};
