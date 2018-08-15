var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];
$(document).ready(function () {
	//	var userId = firebase.auth().currentUser.uid;
	database.ref('/posts/' + USER_ID).once('value').then(function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();
			$(".box-list").append("<div class='box-post d-flex mb-3'><div class='mr-auto'><span class='box-msg'>" + childData.text + "</span></div><button type='button' class='btn btn-outline-warning' data-posts-id=" + childKey + ">Deletar</button><button type='button' class='btn btn-outline-warning ml-2 '>Editar</button></div>");

			$("button[data-posts-id=" + childKey + "").click(function () {
				database.ref("posts/" + USER_ID + "/" + childKey).remove();
				$(this).parent().remove();
			})
		});
	});

	$(".post").click(function (event) {
		event.preventDefault();

		var msg = $(".message").val();
		var postFromDB = database.ref("posts/" + USER_ID).push({
			text: msg
		});
		$(".box-list").append("<div class='box-post d-flex mb-3'><div class='mr-auto'><span class='box-msg'>" + msg + "</span></div><button type='button' class='btn btn-outline-warning' data-posts-id=" + postFromDB.key + ">Deletar</button><button type='button' class='btn btn-outline-warning ml-2 '>Editar</button></div>");
		//		$(".box-post").append('<li>${msg}</li>');
		//				< input class = 'd-flex justify-content-end'
		//		type = 'checkbox'
		//		data - posts - id = " + postFromDB.key + " > Remover
		$("button[data-posts-id=" + postFromDB.key + "").click(function () {
			database.ref("posts/" + USER_ID + "/" + postFromDB.key).remove();
			$(this).parent().remove();
		})
	});

	//	"<div class='box-post'><span class='box-msg'><i class='icon-star mr-4'></i>" + childData.text + "</span><div class='box-opc d-flex justify-content-end'><i class='icon-pencil-square-o'>Editar</i><input type='checkbox'  data-posts-id=" + childKey + ">Remover</div></div>"


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
