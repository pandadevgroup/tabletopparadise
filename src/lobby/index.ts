import * as firebase from "firebase";
import { firebaseConfig } from "../config";

firebase.initializeApp(firebaseConfig);

let gameId = getParameterByName("game");
if (!gameId) window.location.href = "/";

let playersRef = firebase.database().ref(`/game/${gameId}/players`);
playersRef.on('value', (snapshot) => {
	console.log("Players", snapshot.val());
});

let playerId = sessionStorage.getItem("playerId");
if (!playerId) {
	let username = prompt("Enter Your Username");
	playerId = playersRef.push(username).key;
	sessionStorage.setItem("playerId", playerId);
} else {
	console.log("Player ID is", playerId);
}


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
