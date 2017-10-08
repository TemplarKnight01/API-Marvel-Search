($(document).ready(function(){
	//Remove display into preloads
	$(".preloader-wrapper").css("display", "none");
	$(".progress").css("display", "none");

	var Private_Key = "1052b7712271269207273b098a115a95b98a312f";
	var Public_key = "35fac5a509675cdda9c2f4199ebfe4da";
	var ts = 9;
	var hash = hex_md5(ts+Private_Key+Public_key);
	var url_characters = "https://gateway.marvel.com:443/v1/public/characters";

	$("#execute").click(function(){
		var character_selection = $("#character").val();
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
			beforeSend : function(){
				$(".preloader-wrapper").css("display", "block");
				$(".progress").css("display", "block");
				$("#img_container").css("display", "none");
			},
			success : function(data_recieved){
				//add display before of preload
				$(".preloader-wrapper").css("display", "none");
				$(".progress").css("display", "none");
				$("#img_container").css("display", "block");
				//Assigning Data
				var definition_data = data_recieved.data.results[0];
				var image_character = definition_data.thumbnail.path+"."+definition_data.thumbnail.extension;
				var description = definition_data.description;
				var name = definition_data.name;
				var url_1 = definition_data.urls[1].url;
				var url_2 = definition_data.urls[0].url;
				console.log(data_recieved.data.results[0]);
				//Add Image
				//The requested was not found on this server
				$("#img_container").removeAttr("src");
				$("#img_container").attr("src", image_character);
				//Add Name
				$("#hero_name").text(name);
				//External Links
				$("#description_character").text(description);
				$("#external_link_1").attr("href", url_1);
				$("#external_link_2").attr("href", url_2);
			},
			error : function(error){
				//add display before of preload
				$(".preloader-wrapper").css("display", "none");
				$(".progress").css("display", "none");
				$("#img_container").css("display", "block");
				//data
				$("#description_character").text("No connection to server or enter a character");
				$("#hero_name").text("No connection to server");
				$("#img_container").attr("src", "images/default-hero-image.png");
			}
		})
	})
}))