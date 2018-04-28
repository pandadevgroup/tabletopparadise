import * as firebase from "firebase";
import { firebaseConfig } from "../config";
import "./lobby.scss";

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
	let players: any = snapshot.val();
	let index = 1;
	for (let id in players) {
		$(`#p${index++}btn`).html(`
			${players[id].username}
			${playerId === id ? '<span class="badge badge-light">You</span>' : ''}
			${players[id].isHost ? '<span class="badge badge-light">Host</span>' : ''}
		`);
	}
});

let playerId = localStorage.getItem("playerId");
let username = "";
if (!playerId) {
	username = prompt("Enter Your Username");
	playerId = playersRef.push({
		username,
		isHost: false
	}).key;
	localStorage.setItem("playerId", playerId);
} else {
	console.log("Player ID is", playerId);
}

$("#leave-game").click(function() {
	localStorage.removeItem("playerId");
	window.location.href = window.location.href;
});

//TODO: move chat to external so both lobby and game can use it.
let chatRef = firebase.database().ref(`/game/${gameId}/chat/messages/`);
$("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);

chatRef.on("child_added", function(snapshot) {
	if (!$("#chat-no-messages-yet").hasClass("hidden")) {
		$("#chat-no-messages-yet").addClass("hidden");
	}
	let atBottomBeforeAppend = false;
	if ($("#chat-messages")[0].scrollHeight - $("#chat-messages").scrollTop() == $("#chat-messages").innerHeight()) {
		atBottomBeforeAppend = true;
	}
	$("#chat-messages").append(
		`<p class="message user-message"><b>${snapshot.val().parentUsername}:</b> ${snapshot.val().payload}</p>`
	);
	if (atBottomBeforeAppend) {
		$("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);
	}
});
$("#chat-msg").keypress(function(e) {
	if (e.which == 13) {
		$("#chat-send").click();
	}
});
$("#chat-send").click(function() {
	let message = $("#chat-msg")
		.val()
		.toString()
		.trim(); //trim only exists on string
	$("#chat-msg").val("");
	if (message == "") {
		return;
	}
	//TODO: add parsing for whisper, etc.
	//TODO: add parsing for markdown, etc.
	//TODO: replace html tags with &lt; and &gt;
	console.log(username);
	if (username == "") {
		console.log(true);
		console.log(playerId);
		console.log(`/game/${gameId}/players/${playerId}/`);
		firebase
			.database()
			.ref(`/game/${gameId}/players/${playerId}/username/`)
			.once("value")
			.then(function(snapshot) {
				username = snapshot.val();
				console.log(snapshot.val());
				sendMessage(message);
			});
	} else {
		sendMessage(message);
	}
});
function sendMessage(message) {
	chatRef.push({
		parent: playerId,
		parentUsername: username,
		type: "general", //type can be general, whisper
		payload: message
	});
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
	return encodeURIComponent(
		`I've invited you to join my Tabletop Paradise game!\n` +
			`Join ${type}#${id}: https://tabletopparadise.pandadevgroup.com/join/${id}`
	);
}

$(document).ready(function() {
	$("#loading").addClass("hidden");
	$("#main").removeClass("hidden");
});
