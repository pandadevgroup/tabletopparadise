import * as firebase from "firebase";
import { firebaseConfig } from "../config";

firebase.initializeApp(firebaseConfig);

let gameId = getParameterByName("game");
if (!gameId) window.location.href = "/";
$("#invite-url").val("https://tabletopparadise.pandadevgroup.com/join/" + encodeURIComponent(gameId)); //possible xss if we use .html
$(".game-id").text(gameId); //possible xss if we use .html
$("#invite-email-link").attr(
	"href",
	"mailto:?subject=Join my Tabletop Paradise game!&body=" + getHTMLEmailTemplate("Bridge", gameId)
);

let playersRef = firebase.database().ref(`/game/${gameId}/players`);
playersRef.on("value", snapshot => {
	console.log("Players", snapshot.val());
});

let playerId = localStorage.getItem("playerId");
if (!playerId) {
	let username = prompt("Enter Your Username");
	playerId = playersRef.push({
		username,
		isHost: false
	}).key;
	localStorage.setItem("playerId", playerId);
} else {
	console.log("Player ID is", playerId);
}

function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getHTMLEmailTemplate(type, id) {
	return encodeURIComponent(`I've invited you to join my Tabletop Paradise game!\n`
	+ `Join ${type}#${id}: https://tabletopparadise.pandadevgroup.com/join/${id}`);
}
