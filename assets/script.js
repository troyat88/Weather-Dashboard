/* to do:
1. capture event on Submit button DONE
2. fetch API for current weather by day  DONE
3. capture lat and lon from current weather return  DONE
4. Display to Current day container DONE
5. use lat and long from current to build API fetch for 5-day DONE
6. Display to 5 day container
7. ADD IMAGE links
*/
var key = "a43949445aa97c6dc3150855a2e5fd13"
const dateT = new Date ()


$("#search-button").click(searchEventHandler)
function searchEventHandler(){
console.log("click")
    let searchCity = $("#search-city").val().trim();
    console.log(searchCity)
        if(!searchCity){
            alert("please enter a city name.")
        }
        weatherSearch(searchCity)
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
        $("#temp").text("CURRENT TEMPERATURE: " + tempT +  " DEG.")
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
                console.log(tempF)

        

            
            
         })

        })
    
    }

 