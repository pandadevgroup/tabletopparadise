import * as firebase from "firebase";
import { firebaseConfig } from "../../config";

firebase.initializeApp(firebaseConfig);

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
		}).then(function() {
			
		});
});
