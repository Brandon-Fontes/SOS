//windows onload
window.onload = function() {
	var history = getHistory();
	showHistory(history);

	//load our most recent search on page load
	if (history.length > 0){
		getWeather(history[0].id);
	}

	$('#uiWrapper').search({
		source: cities,
		searchFields: [
			'name'
		],
		fields : {
	      title : 'name',
	      description: 'state'
	    },
    	maxResults: 15,
    	onSearchQuery: function(query){
            $('#uiWrapper').addClass("loading");
        },
    	onResults: function (response){
            $('#uiWrapper').removeClass("loading");
        },
        onSelect: function(result, response) {
        	//cleanup the UI
			$('#uiWrapper').search('hide results');
			$('#uiWrapper').removeClass("loading");
			$('#uiWrapper').search("set value", "");
			$('#uiWrapper').search("query");

			//get the results from the API for this city
			getWeather(result.id);

			return true;
        },
    });
}

//fetch weather from the API via CityID
function getWeather(cityId){
    let endpoint = 'https://api.openweathermap.org/data/2.5/forecast'
	let apiKey = '3ad464391a8d3730b856f21a25189460'
    
	$.ajax({
		url: endpoint + "?id=" + cityId + "&APPID=" + apiKey,
		dataType: 'jsonp',
	    success: function(result){
	    	addToHistory(result.city)
	        showHistory();
	        showForecast(result)
	    }
	});
}

//show the forecast to the user
function showForecast(result){
	console.log(result);

    //use result data to show current weather as well as
    $('#fore').text(result.city.name);
    
}

