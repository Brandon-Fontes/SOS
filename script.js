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

//fetch current weather from the API via CityID
function getWeather(cityId){
    let endpoint = 'https://api.openweathermap.org/data/2.5/onecall'
	let apiKey = '3ad464391a8d3730b856f21a25189460'

   var city = getCityById(cityId);
   addToHistory(city)
   showHistory();


	$.ajax({
		url: endpoint + "?lat=" + city.coord.lat + "&lon=" +city.coord.lon+ "&APPID=" + apiKey + '&units=imperial',
		dataType: 'jsonp',
	    success: function(result){
			showCurrentWeather(result, city)
			
	    }
	});
	
	//now adding in the 5 day forecast
	getForecast(cityId);
}

//fetch weather from the API via CityID
function getForecast(cityId){
    let endpoint = 'https://api.openweathermap.org/data/2.5/forecast'
	let apiKey = '3ad464391a8d3730b856f21a25189460'
    
	$.ajax({
		url: endpoint + "?id=" + cityId + "&APPID=" + apiKey,
		dataType: 'jsonp',
	    success: function(result){
	    	showForecast(result)
	    }
	});
}

//show the current to the user
function showCurrentWeather(result, city){
	console.log(result);

    //use result data to show current weather as well as
     $('#fore').text(city.name);

    //update weather icon
     $("#currentWeatherIcon").attr("src", getWeatherIcon(result.current.weather[0].icon));
	$('#temp').text('Temperature: ' + result.current.temp);
	$('#windSpeed').text('Wind Speed: ' + result.current.wind_speed);
	$('#humidity').text('Humidity: ' + result.current.humidity);
	$('#uvIndex').text('Uv Index: ' + result.current.uvi);
}

//show the forecast to the user
function showForecast(result){
	console.log(result);


	$('#temp5').text('Temperature: ' + result.daily[0].temp[0]);
	$('#windSpeed').text('Wind Speed: ' + result.current.wind_speed);
	$('#humidity').text('Humidity: ' + result.current.humidity);
	$('#uvIndex').text('Uv Index: ' + result.current.uvi);
    //use result data to show current weather as well as
    //$('#fore').text(result.city.name);

    //update weather icon
    //$("#currentWeatherIcon").attr("src", getWeatherIcon(result.list[0].weather[0].icon));
    
}

//get icon src based on icon value
function getWeatherIcon(iconId){
	return "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
}

function getCityById(cityId){
	var returnCity = false;
	cities.forEach(function(city){
		
		if(city.id == cityId){
			returnCity = city;
		}
	})
		return returnCity;
	
}