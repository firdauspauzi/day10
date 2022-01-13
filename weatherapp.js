// API key for openweather
// 4c6d93da4571c8f32ca31837327933a2
//e805b82dba788816cd55c6b207b7ea5e
// var apikey = "4c6d93da4571c8f32ca31837327933a2";


//date and time element
var currtime = document.getElementById("time");
var currdate = document.getElementById("date");

function timeDate() {
    var today = new Date();
    function addZero(i) {
        if (i < 10) {i = "0" + i}
        return i;
      };
    var h = addZero(today.getHours());
    var m = addZero(today.getMinutes());
    // var s = addZero(today.getSeconds());
    currdate.innerHTML = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    currtime.innerHTML = h+":" + m;
};

setInterval(timeDate,1000);


//main elements of current, selected state
var mainLocation = document.getElementById("mainlocation");
var mainIcon = document.getElementById("mainIcon");
var mainTemp = document.getElementById("mainTemp");
var mainWeather = document.getElementById("mainWeather");
var mainDesc = document.getElementById("mainDesc");
var mainHumid = document.getElementById("mainHumid");
var mainWind = document.getElementById("mainWind");


// the 5 day forecast elements
var oneDay = document.getElementById("currDay");
var oneIcon = document.getElementById("currIcon");
var oneWeather = document.getElementById("currWeather");

var twoDay = document.getElementById("day2");
var twoIcon = document.getElementById("icon2");
var twoWeather = document.getElementById("weather2");

var threeDay = document.getElementById("day3");
var threeIcon = document.getElementById("icon3");
var threeWeather = document.getElementById("weather3");

var fourDay = document.getElementById("day4");
var fourIcon = document.getElementById("icon4");
var fourWeather = document.getElementById("weather4");

var fiveDay = document.getElementById("day5");
var fiveIcon = document.getElementById("icon5");
var fiveWeather = document.getElementById("weather5");


// geolocation/reverse geocoding for main location
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;

    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=4c6d93da4571c8f32ca31837327933a2`)
    .then(response=>response.json())
    .then((data) => {
        console.log("Hello");
        console.log(data);

        //main info elements
        var name = data.city.name;
        var icon =  data.list[0].weather[0].icon;
        var temperature = data.list[0].main.temp - 273.15;
        var weather = data.list[0].weather[0].main;
        var weatherdesc = data.list[0].weather[0].description;
        var humid = data.list[0].main.humidity;
        var wind = data.list[0].wind.speed;

        mainLocation.innerHTML = name;
        mainIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        mainTemp.innerHTML = temperature.toFixed(0) + " &#8451;"; //&#8451; is the degree celsius symbol
        mainWeather.innerHTML = weather;
        mainDesc.innerHTML = weatherdesc;
        mainHumid.innerHTML = "Humidity: " + humid + " %";
        mainWind.innerHTML = "Wind Speed: " + (wind*3.6).toFixed(2) + " km/h"


        //5day forecast
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const d = new Date();

        oneDay.innerHTML = weekday[d.getDay()];
        oneIcon.src = mainIcon.src;
        oneWeather.innerHTML = weather;

        const dtwo = new Date(data.list[9].dt_txt);
        var day_two_of_week = dtwo.getDay(); 
        var dayTwo = weekday[day_two_of_week];
        twoDay.innerHTML = dayTwo;
        var iconTwo =  data.list[12].weather[0].icon;
        twoIcon.src = `http://openweathermap.org/img/wn/${iconTwo}@2x.png`;
        var weatherTwo = data.list[12].weather[0].main;
        twoWeather.innerHTML = weatherTwo;

        const dthree = new Date(data.list[18].dt_txt);
        var day_three_of_week = dthree.getDay(); 
        var dayThree = weekday[day_three_of_week];
        threeDay.innerHTML = dayThree;
        var iconThree =  data.list[20].weather[0].icon;
        threeIcon.src = `http://openweathermap.org/img/wn/${iconThree}@2x.png`;
        var weatherThree = data.list[20].weather[0].main;
        threeWeather.innerHTML = weatherThree;

        const dfour = new Date(data.list[27].dt_txt);
        var day_four_of_week = dfour.getDay(); 
        var dayFour = weekday[day_four_of_week];
        fourDay.innerHTML = dayFour;
        var iconFour =  data.list[28].weather[0].icon;
        fourIcon.src = `http://openweathermap.org/img/wn/${iconFour}@2x.png`;
        var weatherFour = data.list[28].weather[0].main;
        fourWeather.innerHTML = weatherFour;

        const dfive = new Date(data.list[36].dt_txt);
        var day_five_of_week = dfive.getDay(); 
        var dayFive = weekday[day_five_of_week];
        fiveDay.innerHTML = dayFive;
        var iconFive =  data.list[36].weather[0].icon;
        fiveIcon.src = `http://openweathermap.org/img/wn/${iconFive}@2x.png`;
        var weatherFive = data.list[36].weather[0].main;
        fiveWeather.innerHTML = weatherFive;

    });
}

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

navigator.geolocation.getCurrentPosition(success, error, options);


//Select state function

function updateWeatherMain(latState, longState) {
  var lat = latState;
  var long = longState;

  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=4c6d93da4571c8f32ca31837327933a2`)
  .then(response=>response.json())
  .then((data) => {

      //main info elements
      var name = data.city.name;
      var icon =  data.list[0].weather[0].icon;
      var temperature = data.list[0].main.temp - 273.15;
      var weather = data.list[0].weather[0].main;
      var weatherdesc = data.list[0].weather[0].description;
      var humid = data.list[0].main.humidity;
      var wind = data.list[0].wind.speed;

      mainLocation.innerHTML = name;
      mainIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      mainTemp.innerHTML = temperature.toFixed(0) + " &#8451;"; //&#8451; is the degree celsius symbol
      mainWeather.innerHTML = weather;
      mainDesc.innerHTML = weatherdesc;
      mainHumid.innerHTML = "Humidity: " + humid + " %";
      mainWind.innerHTML = (wind*3.6).toFixed(2) + " km/h"


      //5day forecast
      const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      const d = new Date();

      oneDay.innerHTML = weekday[d.getDay()];
      oneIcon.src = mainIcon.src;
      oneWeather.innerHTML = weather;

      const dtwo = new Date(data.list[12].dt_txt);
      var day_two_of_week = dtwo.getDay(); 
      var dayTwo = weekday[day_two_of_week];
      twoDay.innerHTML = dayTwo;
      var iconTwo =  data.list[12].weather[0].icon;
      twoIcon.src = `http://openweathermap.org/img/wn/${iconTwo}@2x.png`;
      var weatherTwo = data.list[12].weather[0].main;
      twoWeather.innerHTML = weatherTwo;

      const dthree = new Date(data.list[20].dt_txt);
      var day_three_of_week = dthree.getDay(); 
      var dayThree = weekday[day_three_of_week];
      threeDay.innerHTML = dayThree;
      var iconThree =  data.list[20].weather[0].icon;
      threeIcon.src = `http://openweathermap.org/img/wn/${iconThree}@2x.png`;
      var weatherThree = data.list[20].weather[0].main;
      threeWeather.innerHTML = weatherThree;

      const dfour = new Date(data.list[20].dt_txt);
      var day_four_of_week = dfour.getDay(); 
      var dayFour = weekday[day_four_of_week];
      fourDay.innerHTML = dayFour;
      var iconFour =  data.list[28].weather[0].icon;
      fourIcon.src = `http://openweathermap.org/img/wn/${iconFour}@2x.png`;
      var weatherFour = data.list[28].weather[0].main;
      fourWeather.innerHTML = weatherFour;

      const dfive = new Date(data.list[36].dt_txt);
      var day_five_of_week = dfive.getDay(); 
      var dayFive = weekday[day_five_of_week];
      fiveDay.innerHTML = dayFive;
      var iconFive =  data.list[36].weather[0].icon;
      fiveIcon.src = `http://openweathermap.org/img/wn/${iconFive}@2x.png`;
      var weatherFive = data.list[36].weather[0].main;
      fiveWeather.innerHTML = weatherFive;

  });
}
