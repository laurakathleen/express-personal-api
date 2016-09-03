console.log("Sanity Check: JS is working!");
	var template;
	var $placesList;
	var deleteIt = $('.deleteBtn');
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
		url: '/api/places',
		success: onSuccess,
		error: onError
	});

	//add a new place:
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

	//update place:
	$placesList
	.on('click', '.editBtn', function(e){
		e.preventDefault();
		var placeId = $(this).closest('.place').attr('data-id');
		var placeToUpdate = allPlaces.find(function(place){
			return place._id == placeId;
		});
		var updatedPlace = $(this).serialize();
		$.ajax({
			type: 'PUT',
			url: '/api/places/' + placeId,
			success: onUpdateSuccess,
			error: onUpdateError
		});
	});

	//delete a place:
	$placesList.on('click', '.deleteBtn', function(e){
		e.preventDefault();
		console.log('clicked delete btn to get rid of ' + '/api/places/' +$(this).attr('data-id'));
		$.ajax({
			method: 'DELETE',
			url: '/api/places/'+$(this).attr('data-id'),
			data: $('#places-form input').serialize(),
			success: deletePlaceSuccess,
			error: deletePlaceError
		});
	});

	function render(){
		//empty all existing posts from view
		$placesList.empty();

		//pass allPlaces into the template function
		var placesHtml = template({ places: allPlaces});
		console.log(placesHtml);

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
		allPlaces.push(json);
		render();
	}

	function newPlaceError(){
		console.log('newplace error!');
	}

	function onUpdateSuccess(json){
		allPlaces.splice(allPlaces.indexOf(placeToUpdate), 1, json);
		render();
	}

	function onUpdateError(){
		console.log('error with updating place');
	}

	function deletePlaceSuccess(json){
		// allPlaces.splice(allPlaces.indexOf(placeToDelete), 1);
		var place = json;
		console.log(json);
		var placeId = place._id;
		console.log('delete place', placeId);
		for (var i = 0; i < allPlaces.length; i++){
			if (allPlaces[i]._id === placeId){
				allPlaces.splice(i, 1);
				break;
			}
		}
		render();
	} 

	function deletePlaceError(){
		console.log("did not delete place as expected");
	}
});
