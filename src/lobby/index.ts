import * as firebase from "firebase";
import * as firebaseui from "firebaseui";

var config = {
	apiKey: "AIzaSyAulUtZj74h98YWLWJ9uZPn1nI0N_480HQ",
	authDomain: "tabletop-paradise.firebaseapp.com",
	databaseURL: "https://tabletop-paradise.firebaseio.com",
	projectId: "tabletop-paradise",
	storageBucket: "tabletop-paradise.appspot.com",
	messagingSenderId: "941646063027"
};
firebase.initializeApp(config);

var uiConfig = {
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

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		  // User is signed in.
		  var isAnonymous = user.isAnonymous;
		  var uid = user.uid;
		  console.log(user);
	} else {
	  	console.log("Signed out");
	}
});
