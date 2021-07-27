# Weather-Dashboard

## Objective
Intergrate OpenWeather API and custom webpage to create a weather-dashboard where users can search for weather condtions by location as well as by selecting previous searches
---
## Acceptance Criteria

1. Allow user to enter the city for which they would like weather conditions
2. Display current date, weather conditions ( Temp, Wind, Humidity and UV Index) weather-icon 
3. UV Index is represented by color coding for Favorable, moderate or extreme conditions
4. User can also see 5 day forecast, by day, with date, weather conditions and an icon
5. Clicking on saved search will display the conditions for the saved location 
---

## Process for completion
1. create form element in which user can enter city
2. Use gathered information to dynamically send and parse API requests to OpenWeatherMap.org for current and 5-day forecast
3. Have users search captured in local storage to be displayed in a button 
