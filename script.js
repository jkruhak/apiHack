var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var getCurrentWeather = function(cityName) {
	var result = $.ajax({
		url: "http://api.openweathermap.org/data/2.5/forecast/daily?q="+cityName+"&mode=json&units=metric&cnt=7&APPID=7568c4802a197a31911e92da53e2a12c",
		data: {
			tagged: cityName,
			site: "openweathermap"
		},
		type: "GET",
		dataType: "json",
		success: function(weatherResult) {
			showCurrentWeather(weatherResult);
			showForecast(weatherResult);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		},
		complete: function(xhr, message) {
			console.log("Get Weather request is a " + message);
        	
    	}
	});		
};

var showCurrentWeather = function(weatherResult) {
	//copy Current Weather template
	var template = $(".templates .currentWeather").clone().appendTo(".search-results");

	var currentDay = weatherResult.list[0];

	//get current date
	var date = new Date(1000*currentDay["dt"]);
	var day = date.getDate();
	var month = monthNames[date.getMonth()];

	var currentDate = template.find(".date");
	currentDate.text(month.toString() + " " + day.toString());

	//get current weather icon
	var weatherIcon = template.find(".icon");
	weatherIcon.html("<img src='http://api.openweathermap.org/data/2.5/img/w/"+currentDay.weather[0].icon+"'>");
	
	//get city name and country
	var searchInput = template.find(".name");
	searchInput.text(weatherResult.city.name + ", " + weatherResult.city.country);
	
	//get current temperature
	var currentTemp = Math.floor(currentDay.temp.day);
	var locationTemp = template.find(".temp");
	locationTemp.html(currentTemp + "&#176; C");
	
	//get humidity
	var humid = template.find(".humidity");
	humid.html(currentDay.humidity + "&#37;");
	
	
	//get current weather description
	var weatherDescr = template.find(".description");
	weatherDescr.text(currentDay.weather[0].description);
};



var showForecast = function(weatherResult) {
	for(var i = 1; i < 6; i++) {
		var template = $(".templates .weatherTomorrow").clone().appendTo(".results");
		
		var nextDay = weatherResult.list[i];

		//get tomorrow's date	
		var date = new Date(1000*nextDay["dt"]);
		var day = date.getDate();
		var month = monthNames[date.getMonth()];

		template.find(".date").text(month.toString() + " " + day.toString());

		//get tomorrow's weather icon
		var weatherIcon = template.find(".icon");
		weatherIcon.html("<img src='http://api.openweathermap.org/data/2.5/img/w/"+nextDay.weather[0].icon+"'>");
	
		//get minimum temperature
		var minimumTemp = Math.floor(nextDay.temp.min);
		template.find(".minTemp").html(minimumTemp + "&#176; C");

		//get maximum temperature
		var maximumTemp = Math.floor(nextDay.temp.max);
		template.find(".maxTemp").html(maximumTemp + "&#176; C");

		//get humidity
		var humid = template.find(".humidity");
		humid.html(nextDay.humidity + "&#37;");

		//get tomorrow's weather description
		var weatherDescr = template.find(".description");
		weatherDescr.html(nextDay.weather[0].description);
	}
	return template;

};

/*--- jQuery ---*/
$(document).ready(function() {

	$(".weather").submit(function(event) {
		var cityName = $(this).find("input[name='tags']").val();
		$(".search-results").html("");
		$(".results").html("");
		getCurrentWeather(cityName);
	});
});