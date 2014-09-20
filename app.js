var getCurrentWeather = function(cityName) {
	var result = $.ajax({
		url: "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&APPID=7568c4802a197a31911e92da53e2a12c",
		data: {
			tagged: cityName,
			site: "openweathermap"
		},
		type: "GET",
		dataType: "json",
		success: function(weatherResult) {
			showCurrentWeather(weatherResult);
		},
		error: function(xhr, status, errorThrown) {
			console.log("Error: " + errorThrown);
	        console.log("Status: " + status);
	        console.dir(xhr);
		},
		complete: function(xhr, status) {
        	console.log("Request has been completed");
    	}
	});		
};

var showCurrentWeather = function(weatherResult) {
	var template = $(".templates .currentWeather");

	//get current weather icon
	template.find(".icon").html("<img src='http://api.openweathermap.org/data/2.5/img/w/"+weatherResult.weather[0].icon+"'>");
	//get city name and country
	template.find(".name").html(weatherResult.name + ", " + weatherResult.sys.country);
	//get current temperature
	template.find(".temp").html(weatherResult.main.temp+"&#176; C");
	//get cloud
	template.find(".sky").html(weatherResult.clouds.all);
	//get current weather description
	template.find(".description").html(weatherResult.weather[0].main);
};

/*--- jQuery ---*/
$(document).ready(function() {

	$(".weather").submit(function(event) {
		var cityName = $(this).find("input[name='tags']").val();

		
		getCurrentWeather(cityName);

		//getForecast();
	});
});