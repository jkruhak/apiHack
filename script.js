/*--- show current weather in template ---*/
var showCurrentWeather = function(current) {
	var cityWeather = $(".templates #currentWeather").clone();

	//show current temperature
	var currentTemp = cityWeather.find(".temp");
	currentTemp.text(current.main);

	console.log(current.main);

	return cityWeather;
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
			//var weatherResult = showCurrentWeather(data.tagged, data.main.length);

			$(".search-results").html(showCurrentWeather);

			//$(".search-results").append(showCurrentWeather);
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