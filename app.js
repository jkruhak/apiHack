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
			//get current weather icon
			$(".templates .currentWeather").find(".icon").html("<img src='http://api.openweathermap.org/data/2.5/img/w/"+weatherResult.weather[0].icon+"'>");
			//get city name and country
			$(".templates .currentWeather").find(".name").html(weatherResult.name + ", " + weatherResult.sys.country);
			//get current temperature
			$(".templates .currentWeather").find(".temp").html(weatherResult.main.temp+"&#176; C");
			//get cloud
			$(".templates .currentWeather").find(".sky").html(weatherResult.clouds.all);
			//get current weather description
			$(".templates .currentWeather").find(".description").html(weatherResult.weather[0].main);
		},
		error: function(xhr, status, errorThrown) {
			console.log("Error: " + errorThrown);
	        console.log("Status: " + status);
	        console.dir(xhr);
		},
		complete: function( xhr, status ) {
        	console.log("Request has been completed");
    	}
	});		
};

/*--- jQuery ---*/
$(document).ready(function() {

	$(".weather").submit(function(event) {
		var cityName = $(this).find("input[name='tags']").val();
		
		getCurrentWeather(cityName);

		//getForecast();
	});
});