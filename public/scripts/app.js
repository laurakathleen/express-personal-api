console.log("Sanity Check: JS is working!");
	var template;
	var $profileSpot;
	var $placesList;
	var deleteIt = $('.deleteBtn');

	// define google map globals
	var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
	var $quakesList;
	var map;
	var mapTemplate;
	var coords = [];
	var latcoord;
	var loncoord;
	var marker;

	function initMap() {
		var mapDiv = document.getElementById('map');
	    map = new google.maps.Map(mapDiv, {
	      center: {lat: 37.78, lng: -122.44},
	      zoom: 8
	    });
	}

$(document).ready(function(){
	console.log("ajax is all good");
	$placesList = $('#placeTarget');
	$profileSpot = $('#profileTarget');

	//compile handlebars:
	var profileSource = $('#profile-template').html();
	var profileTemplate = Handlebars.compile(profileSource);
	var myProfile = [];

	//get my profile:
	$.ajax({
		method: "GET",
		url: '/api/profile',
		// dataType: 'json',
		success: onProfileSuccess,
		error: onError
	});

	//google map:
	$.ajax({
		method: "GET",
		url: weekly_quakes_endpoint,
		dataType: "json",
		success: onMapSuccess
	});

	//compile handlebars:
	var source = $('#places-template').html();
	template = Handlebars.compile(source);
	//array to hold all place data from API
	var allPlaces = [];
	
	
	//get all places:
	$.ajax({
		method: "GET",
		url: '/api/places',
		success: onSuccess,
		error: onError
	});


	//add a new place:
	$('#places-form').on('submit', function(e){
		e.preventDefault();
		// console.log('new place serialized', $(this).serializeArray());
		$.ajax({
			method: 'POST',
			url: '/api/places',
			data: $(this).serializeArray(),
			success: newPlaceSuccess,
			error: newPlaceError
		});
	});

	//update place:
	$placesList.on('submit', '.update-place', function(e){
		e.preventDefault();
		var placeId = $(this).closest('.place').attr('data-id');
		var placeToUpdate = allPlaces.find(function(place){
			return place._id == placeId;
		 });
		var updatedPlace = $(this).serialize();
		$.ajax({
			type: 'PUT',
			url: '/api/places/' + placeId,
			data: updatedPlace,
			success: function onUpdateSuccess(json){
				allPlaces.splice(allPlaces.indexOf(placeToUpdate), 1, json);
				render();
			// error: onUpdateError
			}
		});
	});

	//delete a place:
	$placesList.on('click', '.deleteBtn', function(e){
		e.preventDefault();
		// console.log($(this))
		// console.log('clicked delete btn to get rid of ' + '/api/places/' +$(this).attr('data-id'));
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
		// console.log(placesHtml);

		//append html to the view
		$placesList.append(placesHtml);
	}

	function profileRender(){
		$profileSpot.empty();
		var profileHtml = profileTemplate({ profile: myProfile});
		// console.log(myProfile);
		// console.log(profileHtml);
		$profileSpot.append(profileHtml);
	}

	function onProfileSuccess(json){
		// console.log(json);
		myProfile = json;
		profileRender();
	}

	//on map success:
	function onMapSuccess(json){
		var data = json.features;

		for (var i = 0; i < data.length; i++) {
			var loncoord = data[i].geometry.coordinates[0];
			var latcoord = data[i].geometry.coordinates[1];

			coords = {lat: latcoord, lng: loncoord};

			marker = new google.maps.Marker({
			position: coords,
			map: map,
			title: "Earthquake"
			});

			}
	
			console.log(coords);

		var mapSource=$('#earthquake-template').html();
		 

		//compile:
		var mapTemplate=Handlebars.compile(mapSource);
		console.log(mapTemplate);

		var earthquakeHtml = mapTemplate({features: data});
		console.log(earthquakeHtml);
		
		$("#info").append(earthquakeHtml);
	}


	function onSuccess(json){
		// console.log(json);
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

	// function onUpdateSuccess(json){
	// 	allPlaces.splice(allPlaces.indexOf(placeToUpdate), 1, json);
	// 	render();
	// }

	function onUpdateError(){
		console.log('error with updating place');
	}

	function deletePlaceSuccess(json){
		// allPlaces.splice(allPlaces.indexOf(placeToDelete), 1);
		var place = json;
		// console.log(json);
		var placeId = place._id;
		// console.log('delete place', placeId);
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
