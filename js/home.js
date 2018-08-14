var database = firebase.database();
$(document).ready(function () {
	//	var userId = firebase.auth().currentUser.uid;
	database.ref('/posts').once('value').then(function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();
			$(".box-post").append("<li>" + childData.text + "</li>");
		});
	});

	$(".post").click(function (event) {
		event.preventDefault();

		var msg = $(".message").val();
		database.ref("posts").push({
			text: msg
		});
		$(".box-post").append("<li>" + msg + "</li>");
		//		$(".box-post").append('<li>${msg}</li>');
	});
	//
	//	$('.star').on('click', function () {
	//		$(this).toggleClass('star-yellow');
	//	});
	//
	//	$('.ckbox label').on('click', function () {
	//		$(this).parents('tr').toggleClass('selected');
	//	});
	//
	//	$('.btn-filter').on('click', function () {
	//		var $target = $(this).data('target');
	//		if ($target != 'all') {
	//			$('.table tr').css('display', 'none');
	//			$('.table tr[data-status="' + $target + '"]').fadeIn('slow');
	//		} else {
	//			$('.table tr').css('display', 'none').fadeIn('slow');
	//		}
	//	});

});
