/* to do:
1. capture event on Submit button DONE
2. fetch API for current weather by day  DONE
3. capture lat and lon from current weather return  DONE
4. Display to Current day container DONE
5. use lat and long from current to build API fetch for 5-day DONE
6. Display to 5 day container DONE
7. ADD IMAGE links DONE
8. Added color code DONE
9. comit and display search history**** only one city being commited, not sure how to loop saved search into original function...
*/

var key = "a43949445aa97c6dc3150855a2e5fd13"


// ADD DATE AND TIME TO JUMBOTRON AND 5-DAY CARDS
function setDate(){
    var weatherDay = moment().format('(MM/D/YYYY)')
    $("#today-date").text(weatherDay);
    var oneDay = moment().add(01, 'days').format('MM/D/YYYY')
    $("#forecast-date").text(oneDay);
    var twoDay = moment().add(02, 'days').format('MM/D/YYYY')
    $("#forecast-date2").text(twoDay);
    var threeDay = moment().add(03, 'days').format('MM/D/YYYY')
    $("#forecast-date3").text(threeDay);
    var fourDay = moment().add(04, 'days').format('MM/D/YYYY')
    $("#forecast-date4").text(fourDay);
    var fiveDay = moment().add(05, 'days').format('MM/D/YYYY')
    $("#forecast-date5").text(fiveDay);
    }
    


// CAPTURE CLICK ON SEARCH BUTTON    
$("#search-button").click(searchEventHandler) 
function searchEventHandler(){
console.log("click")
    let searchCity = $("#search-city").val().trim();
    console.log(searchCity)
        if(!searchCity){
            alert("please enter a city name.");
        }
        localStorage.setItem("prevSearch", searchCity)
        weatherSearch(searchCity);
        setDate()
        

    }      



//get current weather for city/ display in Hero
function weatherSearch(searchCity){
    console.log(searchCity)
    var apiToday = "https://api.openweathermap.org/data/2.5/weather?q="+searchCity+"&units=imperial&appid="+key;
    fetch(apiToday)
    .then(function(response){
        return response.json()
    })
    .then(function(data) {
        console.log(data)
        var tempT =  parseInt(data.main.temp)
        $("#temp").text("CURRENT TEMPERATURE: " + tempT + " deg")
        var humidityT = data.main.humidity
        $("#humidity").text("HUMIDITY: " + humidityT + "%")
        var descT = data.weather[0].description
        $("#desc").text(descT)
        var windT = data.wind.speed
        $("#wind").text("WIND SPEED: " + windT + " MPH")
        var iconT = data.weather[0].icon
        $("#weather-icon").attr("src","http://openweathermap.org/img/wn/"+iconT+"@2x.png")
         cityT = data.name 
         $("#city").text(cityT)
//USE LAT AND LON TO GET 5-DAY FORECAST and UVI
         var lat = (data.coord.lat)
         var lon = (data.coord.lon)
         var apiFiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat + "&lon=" +lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + key
         fetch(apiFiveDay)
         .then(function(response){
             return response.json()
         })
         .then(function(data1){
            console.log(data1)
            console.log(data1.current.uvi)
            var uvi = data1.current.uvi
            console.log(uvi)
            $("#uv").text("UV INDEX: " + uvi)
                if(uvi < 5) {
                    $("#uv").addClass("favorable")
                 }else if (uvi > 8) {
                    $("#uv").addClass("severe")
                 }else $("#uv").addClass("moderate")
                 
            console.log(data1.daily.length -3)
            //for (var i = 0; i < data1.daily.length -3; i++){
                var iconF = data1.daily[0].weather[0].icon
                $("#forecast-icon").attr("src", "http://openweathermap.org/img/wn/"+iconF+"@2x.png")
                var iconF2 = data1.daily[1].weather[0].icon
                $("#forecast-icon2").attr("src", "http://openweathermap.org/img/wn/"+iconF2+"@2x.png")
                var iconF3 = data1.daily[2].weather[0].icon
                $("#forecast-icon3").attr("src", "http://openweathermap.org/img/wn/"+iconF3+"@2x.png")
                var iconF4 = data1.daily[3].weather[0].icon
                $("#forecast-icon4").attr("src", "http://openweathermap.org/img/wn/"+iconF4+"@2x.png")
                var iconF5 = data1.daily[4].weather[0].icon
                $("#forecast-icon5").attr("src", "http://openweathermap.org/img/wn/"+iconF5+"@2x.png")
            //5-day temp
                var tempF = parseInt(data1.daily[0].temp.max)
                $("#forecast-temp").text( tempF + " deg" )
                var tempF2 = parseInt(data1.daily[1].temp.max)
                $("#forecast-temp2").text( tempF2 + " deg" )
                var tempF3 = parseInt(data1.daily[2].temp.max)
                $("#forecast-temp3").text( tempF3 + " deg" )
                var tempF4 = parseInt(data1.daily[3].temp.max)
                $("#forecast-temp4").text( tempF4 + " deg" )
                var tempF5 = parseInt(data1.daily[4].temp.max)
                $("#forecast-temp5").text( tempF5 + " deg" )
            // 5-day wind
                var windF = data1.daily[0].wind_speed
                $("#forecast-wind").text("WIND: " + windF + " MPH") 
                var windF2 = data1.daily[1].wind_speed
                $("#forecast-wind2").text("WIND: " + windF2 + " MPH") 
                var windF3 = data1.daily[2].wind_speed
                $("#forecast-wind3").text("WIND: " + windF3 + " MPH") 
                var windF4 = data1.daily[3].wind_speed
                $("#forecast-wind4").text("WIND: " + windF4 + " MPH") 
                var windF5 = data1.daily[4].wind_speed
                $("#forecast-wind5").text("WIND: " + windF5 + " MPH") 
            //5-day Humidity
                var humF = data1.daily[0].humidity
                $("#forecast-humidity").text( "Humididty " + humF + "%")
                var humF2 = data1.daily[1].humidity
                $("#forecast-humidity2").text( "Humididty " + humF2 + "%")
                var humF3 = data1.daily[2].humidity
                $("#forecast-humidity3").text( "Humididty " + humF3 + "%")
                var humF4 = data1.daily[3].humidity
                $("#forecast-humidity4").text( "Humididty " + humF4 + "%")
                var humF5 = data1.daily[4].humidity
                $("#forecast-humidity5").text( "Humididty " + humF5 + "%")
              
         })

        })
    
    }
// DISPLAY SAVED SEARCH   
function displayHistory() {
var savedCity = localStorage.getItem("prevSearch");
var historyButton = document.createElement('button');
$(historyButton).text(savedCity);
$(historyButton).addClass("btn btn-primary btn-lg btn-block");
$(historyButton).attr("id", "history-button")
$("#history-container").append(historyButton)
}
displayHistory()

//RENDER FORECAST AND CONDITIONS WHEN SAVED SEARCH IS CLICKED
$("#history-button").click(displayHistoryButton);
function displayHistoryButton(weatherSearch){
console.log("click")
let searchCity = $("#history-button").text()
console.log(searchCity)

var apiToday = "https://api.openweathermap.org/data/2.5/weather?q="+searchCity+"&units=imperial&appid="+key;
    fetch(apiToday)
    .then(function(response){
        return response.json()
    })
    .then(function(data) {
        console.log(data)
        var tempT =  parseInt(data.main.temp)
        $("#temp").text("CURRENT TEMPERATURE: " + tempT + " deg")
        var humidityT = data.main.humidity
        $("#humidity").text("HUMIDITY: " + humidityT + "%")
        var descT = data.weather[0].description
        $("#desc").text(descT)
        var windT = data.wind.speed
        $("#wind").text("WIND SPEED: " + windT + " MPH")
        var iconT = data.weather[0].icon
        $("#weather-icon").attr("src","http://openweathermap.org/img/wn/"+iconT+"@2x.png")
         cityT = data.name 
         $("#city").text(cityT)
//USE LAT AND LON TO GET 5-DAY FORECAST and UVI
         var lat = (data.coord.lat)
         var lon = (data.coord.lon)
         var apiFiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat + "&lon=" +lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + key
         fetch(apiFiveDay)
         .then(function(response){
             return response.json()
         })
         .then(function(data1){
            console.log(data1)
            console.log(data1.current.uvi)
            var uvi = data1.current.uvi
            console.log(uvi)
            $("#uv").text("UV INDEX: " + uvi)
                if(uvi < 5) {
                    $("#uv").addClass("favorable")
                 }else if (uvi > 8) {
                    $("#uv").addClass("severe")
                 }else $("#uv").addClass("moderate")
                 
            console.log(data1.daily.length -3)
            //for (var i = 0; i < data1.daily.length -3; i++){
                var iconF = data1.daily[0].weather[0].icon
                $("#forecast-icon").attr("src", "http://openweathermap.org/img/wn/"+iconF+"@2x.png")
                var iconF2 = data1.daily[1].weather[0].icon
                $("#forecast-icon2").attr("src", "http://openweathermap.org/img/wn/"+iconF2+"@2x.png")
                var iconF3 = data1.daily[2].weather[0].icon
                $("#forecast-icon3").attr("src", "http://openweathermap.org/img/wn/"+iconF3+"@2x.png")
                var iconF4 = data1.daily[3].weather[0].icon
                $("#forecast-icon4").attr("src", "http://openweathermap.org/img/wn/"+iconF4+"@2x.png")
                var iconF5 = data1.daily[4].weather[0].icon
                $("#forecast-icon5").attr("src", "http://openweathermap.org/img/wn/"+iconF5+"@2x.png")
            //5-day temp
                var tempF = parseInt(data1.daily[0].temp.max)
                $("#forecast-temp").text( tempF + " deg" )
                var tempF2 = parseInt(data1.daily[1].temp.max)
                $("#forecast-temp2").text( tempF2 + " deg" )
                var tempF3 = parseInt(data1.daily[2].temp.max)
                $("#forecast-temp3").text( tempF3 + " deg" )
                var tempF4 = parseInt(data1.daily[3].temp.max)
                $("#forecast-temp4").text( tempF4 + " deg" )
                var tempF5 = parseInt(data1.daily[4].temp.max)
                $("#forecast-temp5").text( tempF5 + " deg" )
            // 5-day wind
                var windF = data1.daily[0].wind_speed
                $("#forecast-wind").text("WIND: " + windF + " MPH") 
                var windF2 = data1.daily[1].wind_speed
                $("#forecast-wind2").text("WIND: " + windF2 + " MPH") 
                var windF3 = data1.daily[2].wind_speed
                $("#forecast-wind3").text("WIND: " + windF3 + " MPH") 
                var windF4 = data1.daily[3].wind_speed
                $("#forecast-wind4").text("WIND: " + windF4 + " MPH") 
                var windF5 = data1.daily[4].wind_speed
                $("#forecast-wind5").text("WIND: " + windF5 + " MPH") 
            //5-day Humidity
                var humF = data1.daily[0].humidity
                $("#forecast-humidity").text( "Humididty " + humF + "%")
                var humF2 = data1.daily[1].humidity
                $("#forecast-humidity2").text( "Humididty " + humF2 + "%")
                var humF3 = data1.daily[2].humidity
                $("#forecast-humidity3").text( "Humididty " + humF3 + "%")
                var humF4 = data1.daily[3].humidity
                $("#forecast-humidity4").text( "Humididty " + humF4 + "%")
                var humF5 = data1.daily[4].humidity
                $("#forecast-humidity5").text( "Humididty " + humF5 + "%")
              
         })

        })

}









 