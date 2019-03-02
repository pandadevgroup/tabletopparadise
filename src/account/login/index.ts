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


$(document).ready(function () {
	//in case the user has disabled javascript, we leave the href= as a backup until this code runs
	$("#forgot-password").attr("href", "#forgotpassword");
	$("#forgot-password").click(function () {
		window.location.href = "/account/forgotpassword?email=" + encodeURIComponent($("#email").val() + "");
	});



});


$("#login").click(function () {
	$("#error-txt").text("");
	let email = $("#email").val() + "";
	let password = $("#password").val() + "";
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.catch(function (error) {
			if (error.code == "auth/user-disabled") {
				$("#error-txt").text("Error: The account corresponding to this email address " +
					"has been disabled. Please contact support.");
			} else {
				$("#error-txt").text("Error: Incorrect email/password combination.");
				//either the email is wrong, the password is wrong, or both.
			}
		}).then(function () {
			firebase.auth().onAuthStateChanged(function (user) {
				console.log(user);
				if (user) {
					// User is signed in.
					if (getQuery("redir") == "" || getQuery("redir") == null) {
						window.location.href = "/?from=login";
					} else {
						window.location.href = getQuery("redir");

					}
				}
			});
		});



});
