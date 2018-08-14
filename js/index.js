$(document).ready(function () {
	$("#register").click(function (event) {
		event.preventDefault();

		var email = $("#sign-up-email").val();
		var password = $("#sign-up-password").val();
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
			window.location = "home.html";
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});
	});
	$("#login").click(function () {
		event.preventDefault();

		var email = $("#sign-in-email").val();
		var password = $("#sign-in-password").val();
		firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
			window.location = "home.html";
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});

	});
});
