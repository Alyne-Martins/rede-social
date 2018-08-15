var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];
$(document).ready(function () {
	//	Pegando post do firebase
	database.ref('/posts/' + USER_ID).once('value').then(function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();
			var text = childData.text;
			//Chamando função que coloca post do firebase no html
			createPost(text, childKey);
		});
	});
	//	Criando novo post do firebase
	$(".post").click(function (event) {
		event.preventDefault();
		var msg = $(".message").val();
		var postFromDB = database.ref("posts/" + USER_ID).push({
			text: msg
		});
		var newPostKey = postFromDB.key;
		//Chamando função que coloca novo post no html
		createPost(msg, newPostKey);
		$(".message").val("");
	});
});
//função de criar posts no HTMl
function createPost(text, key) {
	$(".box-list").append("<div class='box-post d-flex mb-3'><div class='mr-auto'><span class='box-msg' data-newedit-id=" + key + ">" + text + "</span></div><button type='button' class='btn btn-outline-warning' data-posts-id=" + key + ">Deletar</button><button type='button' class='btn btn-outline-warning ml-2' data-edit-id=" + key + ">Editar</button></div>");
	//Apagar posts
	$("button[data-posts-id=" + key + "]").click(function () {
		database.ref("posts/" + USER_ID + "/" + key).remove();
		$(this).parent().remove();
	})
	//Editar posts
	$("button[data-edit-id=" + key + "]").click(function () {
		$("span[data-newedit-id=" + key + "]").append("<div><input type='text' class='form-control box-input new-post' placeholder='" + text + "'><button type='button' class='editar btn btn-outline-warning ml-2' data-btedit-id=" + key + ">Finalizar Edição</button></div>");

		//salvar edição
		$("button[data-btedit-id=" + key + "]").click(function () {
			var newText = $(".new-post").val();
			$("span[data-newedit-id=" + key + "]").html(newText);
			database.ref("posts/" + USER_ID + "/" + key).update({
				text: newText
			});
			$(this).parent().remove();
		})

	})

}
