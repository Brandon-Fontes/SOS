Storage.prototype.setObj = function(key, obj) {
return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
return JSON.parse(this.getItem(key))
}
window.onload = function() {
   getHistory();
    showHistory(history);

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
           console.log(result)
           $('#uiWrapper').search('hide results');
           $('#uiWrapper').removeClass("loading");
           getWeather(result.id);
           return true;
        },
    });
    
}
function getWeather(cityId){
    console.log(cityId);
    let endpoint = 'https://api.openweathermap.org/data/2.5/forecast'
let apiKey = '3ad464391a8d3730b856f21a25189460'
    
    

$.ajax({
url: endpoint + "?id=" + cityId + "&APPID=" + apiKey,

dataType: 'jsonp',
    success: function(result){
        console.log(result);
        history.push(result.city);
       
        setHistory();
        history = JSON.parse(history);
        showHistory(history);
        showForecast(result)
    }
});
}

function showHistory(history){
    //step 1 delete existing history html
    $('#historyItems').empty();
    //step 2 re-build history html based on history variable
   console.log(history);
    history.forEach(function(item){
        console.log(item);
        $('#historyItems').append('<li onclick="getWeather(' +  item.id + ')">' + item.name + '</li>');
    })
    //step 3 make sure each city shown has an onclick that fires getWeather with cityId
    
}

function showForecast(result){
    //use result data to show current weather as well as
    $('fore').text(result);
}

function getHistory(){
    var history = localStorage.getObj('history');
    if (history === null){ history = []; }else{
        history = JSON.parse(history);
    }
}

function setHistory(){
    localStorage.setObj('history');
}