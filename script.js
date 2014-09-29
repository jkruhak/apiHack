var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
        	console.log("Request is a " + status);
    	}
	});		
};

var showCurrentWeather = function(weatherResult) {
	var template = $(".templates .currentWeather");

	//get current date
	var date = new Date(1000*weatherResult.dt);
	var day = date.getDate();
	var month = monthNames[date.getMonth()];

	var currentDate = template.find(".date");
	currentDate.text(month.toString() + " " + day.toString());

	//get current weather icon
	var weatherIcon = template.find(".icon");
	weatherIcon.html("<img src='http://api.openweathermap.org/data/2.5/img/w/"+weatherResult.weather[0].icon+"'>");
	
	//get city name and country
	var searchInput = template.find(".name");
	searchInput.text(weatherResult.name + ", " + weatherResult.sys.country);
	
	//get current temperature
	var currentTemp = Math.floor(weatherResult.main.temp);
	var locationTemp = template.find(".temp");
	locationTemp.html(currentTemp + "&#176; C");
	
	//get humidity
	var humid = template.find(".humidity");
	humid.html(weatherResult.main.humidity + "&#37;");
	
	
	//get current weather description
	var weatherDescr = template.find(".description");
	weatherDescr.text(weatherResult.weather[0].description);
};

var getWeatherTomorrow = function(cityName) {
	var result = $.ajax({
		url: "http://api.openweathermap.org/data/2.5/forecast/daily?q="+cityName+"&mode=json&units=metric&cnt=5",
		data: {
			tagged: cityName,
			site: "openweathermap"
		},
		type: "GET",
		dataType: "json",
		success: function(tomorrowResult) {
			showWeatherTomorrow(tomorrowResult);
		},
		error: function(xhr, status, errorThrown) {
			console.log("Error: " + errorThrown);
	        console.log("Status: " + status);
	        console.dir(xhr);
		},
		complete: function(xhr, status) {
        	console.log("Request is a " + status);
    	}
	});
};

var showWeatherTomorrow = function(tomorrowResult) {
	var template = $(".templates .weatherTomorrow");
	var nextDay = tomorrowResult.list[1];

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
};

/*--- jQuery ---*/
$(document).ready(function() {

	$(".weather").submit(function(event) {
		var cityName = $(this).find("input[name='tags']").val();
		$(".hidden").show();
		getCurrentWeather(cityName);
		getWeatherTomorrow(cityName);
	});
});