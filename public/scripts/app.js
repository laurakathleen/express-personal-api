console.log("Sanity Check: JS is working!");
	//array to hold all place data from API
	var allPlaces = [];

$(document).ready(function(){
	console.log("ajax is all good");
	
	$.ajax({
		method: "GET",
		url: '/api/profile',
		success: onSuccess,
		error: onError
	})

	function onSuccess(json){
		console.log(json);
		allPlaces = json;
		render();
	}

	function onError(json){
		console.log('mistake');
	}
});
