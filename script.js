console.log(cities);
$('.ui.search')
  .search({
    type: 'category',
    source: cities
  })
;




window.onload = function() {
    var searchInput = $("userInput");
    $("#userInput").keyUp(function() {
    const input = searchInput.value;
    console.log(searchInput);
    const suggestions = cities.filter(function(city){
        return city.name.toLowerCase().startsWith(input);
    });
});
};