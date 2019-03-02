import * as firebase from "firebase";
import { firebaseConfig } from "../../config";
import * as $ from "jquery";

firebase.initializeApp(firebaseConfig);

//http://stackoverflow.com/a/901144/5511561
function getQuery(name: string) {
	var url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

firebase.auth().signOut().then(function () {
    // Sign-out successful.
}).catch(function (error) {
    alert("An unknown error occured. Please try again later.");
});

if (getQuery("redir") != null && getQuery("redir") != "") {
    $("#login-again").attr("href", "/account/login/?redir=" + encodeURIComponent(getQuery("redir")));
}
