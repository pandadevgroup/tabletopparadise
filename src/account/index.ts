import * as firebase from "firebase";
import * as firebaseui from "firebaseui";
import { firebaseConfig, firebaseUIConfig } from "../config";

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
		console.log(user.uid);
	} else {
		console.log("Signed out");
		showFirebaseUI();
	}
});

$(document).ready(() => {
	$("#logout").click(() => {
		firebase.auth().signOut();
	});
})
