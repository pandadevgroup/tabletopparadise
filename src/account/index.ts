import * as firebase from "firebase";
import { firebaseConfig } from "../config";

firebase.initializeApp(firebaseConfig);


$(document).ready(() => {
	$("#logout").click(() => {
		firebase.auth().signOut();
	});
})
