import * as firebase from "firebase";
import * as firebaseui from "firebaseui";
import { firebaseConfig, firebaseUIConfig } from "./config";

firebase.initializeApp(firebaseConfig);

let ui = new firebaseui.auth.AuthUI(firebase.auth());

function showFirebaseUI() {
	$("#firebaseui-auth-container").removeClass("d-none");
	ui.start('#firebaseui-auth-container', firebaseUIConfig);
}

function hideFirebaseUI() {
	$("#firebaseui-auth-container").addClass("d-none");
}

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		// User is signed in.
		hideFirebaseUI();
		var isAnonymous = user.isAnonymous;
		var uid = user.uid;
		console.log(user);
		firebase.auth().signOut();
	} else {
		console.log("Signed out");
		showFirebaseUI();
	}
});
