console.log("Sanity Check: JS is working!");

$(document).ready(function(){
	//array to hold all place data from API
	var allPlaces = [];
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
