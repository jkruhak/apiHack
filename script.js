/*--- show current weather in template ---*/
var showCurrentWeather = function(currentWeather) {
	var result = $(".templates .currentWeather").clone();

	/*--- Get city name ---*/
	var locationName = result.find(".name");
	locationName.text(currentWeather.name);

	console.log(currentWeather.name);

	return result;
};

/*--- Get current weather ---*/
var getCurrentWeather = function(cityName) {
	var data = {tagged: cityName,
				site: "openweathermap"};

	var result = $.ajax({
		
		url: "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&APPID=7568c4802a197a31911e92da53e2a12c",
		data: data,
		type: "GET",
		dataType: "json"
		})		
		.done(function(result) {

			$(".search-results").append(showCurrentWeather);

		});
};	

/*--- Get 5 day forecast ---*/
var getForecast = function() {

};

/*--- jQuery ---*/
$(document).ready(function() {

	$(".weather").submit(function(event) {
		var cityName = $(this).find("input[name='tags']").val();
		
		getCurrentWeather(cityName);

		//getForecast();
	});
});