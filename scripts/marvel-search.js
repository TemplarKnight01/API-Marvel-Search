($(document).ready(function(){
	var Private_Key = "1052b7712271269207273b098a115a95b98a312f";
	var Public_key = "35fac5a509675cdda9c2f4199ebfe4da";
	var ts = 9;
	var hash = hex_md5(ts+Private_Key+Public_key);
	var url_characters = "https://gateway.marvel.com:443/v1/public/characters";

	$("#execute").click(function(){
		var character_selection = $("#character").val();
		console.log(hash);
		$.ajax({
			url : url_characters,
			data : {
				apikey: Public_key,
				ts : ts,
				hash : hash,
				name : character_selection
			},
			type : "GET",
			dataType : "JSON",
			contentType : "application/json",
			success : function(data_recieved){
				var image_character = data_recieved.data.results[0].thumbnail.path+"."+data_recieved.data.results[0].thumbnail.extension;
				//console.log(image_character);
				var description = data_recieved.data.results[0].description;
				//console.log(description);
				var name = data_recieved.data.results[0].name;
				var url_1 = data_recieved.data.results[0].urls[1].url;
				console.log(url_1);
				//console.log(name)
				// Agregando Imagen
				$("#img_container").removeAttr("src");
				$("#img_container").attr("src", image_character);

				$("#description_character").text(description);
				$("external_link").attr("href", url_1);
			},
		})
	})
}))