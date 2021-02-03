window.onload = function() {
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
           
           return true;
        },
	});
}