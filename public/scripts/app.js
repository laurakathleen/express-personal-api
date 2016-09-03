console.log("Sanity Check: JS is working!");
	var template;
	//array to hold all place data from API
	var allPlaces = [];

$(document).ready(function(){
	console.log("ajax is all good");
	
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
		allPlaces.push(json);
		render();
	}

	function newPlaceError(){
		console.log('newplace error!');
	}
});
