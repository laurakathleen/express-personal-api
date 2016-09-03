console.log("Sanity Check: JS is working!");
	var template;
	var $placesList;
	//array to hold all place data from API
	var allPlaces = [];

$(document).ready(function(){
	console.log("ajax is all good");
	$placesList = $('#placeTarget');

	//compile handlebars:
	var source = $('#places-template').html();
	template = Handlebars.compile(source);
	
	$.ajax({
		method: "GET",
		url: '/api/profile',
		success: onSuccess,
		error: onError
	});

	$('#places-form').on('submit', function(e){
		e.preventDefault();
		console.log('new place serialized', $(this).serializeArray());
		$.ajax({
			method: 'POST',
			url: '/api/places',
			data: $(this).serializeArray(),
			success: newPlaceSuccess,
			error: newPlaceError
		});
	});

	function render(){
		//empty all existing posts from view
		$placesList.empty();

		//pass allPlaces into the template function
		var placesHtml = template({ places: allPlaces});

		//append html to the view
		$placesList.append(placesHtml);
	}

	function onSuccess(json){
		console.log(json);
		allPlaces = json;
		render();
	}

	function onError(json){
		console.log('mistake');
	}

	function newPlaceSuccess(json){
		$('#places-form input').val('');
		render();
	}

	function newPlaceError(){
		console.log('newplace error!');
	}
});
