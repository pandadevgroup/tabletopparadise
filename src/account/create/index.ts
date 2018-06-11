import * as firebase from "firebase";
import { firebaseConfig } from "../../config";

firebase.initializeApp(firebaseConfig);

$("#create").click(function () {
    $("#repeatpassword").removeClass("is-invalid");
    $("#email").removeClass("is-invalid");


    let email = $("#email").val() + "";
    let password = $("#password").val() + "";
    let retypePassword = $("#repeatpassword").val() + "";
    if (password === retypePassword) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(error);

            if (error.code == "auth/invalid-email") {
                $("#email").addClass("is-invalid");
            }
        }).then(function () {

        });
    } else {
        $("#repeatpassword").addClass("is-invalid");
    }

})