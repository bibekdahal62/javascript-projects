
// let locationKeyURL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=hAaC4OdINFttAoOMJZg8h6WJZGEiQfcT&q=bhojpur,nepal`;

let button = document.querySelector('form button');
let userInputLocation = document.querySelector("form input");

let dayImage = document.querySelector(".day-information .weather-status img");
let nightImage = document.querySelector(".night-information .weather-status img");

let dayStatus = document.querySelector(".day-information .weather-status p");
let nightStatus = document.querySelector(".night-information .weather-status p");

let minimumTemperature = document.querySelectorAll(".min-temp");
let maximumTemprature = document.querySelectorAll(".max-temp");

let sourceLink = document.querySelector(".source a");

let display = document.querySelector(".display");


async function getLocationKey(locationURL){
    display.classList.add("hidden");
    try{
        let locationResponse = await fetch(locationURL);
        if(!locationResponse.ok){
            throw new Error("Error while fetching location data..");
        }
        let locationData = await locationResponse.json();
        if(locationData[0] == undefined){
            throw new Error("Error while fetching location data..");
        }
        locationKey = locationData[0].Key;
        if(locationKey == undefined){
            throw new Error("Error while getting location key..");
        }
        // console.log(locationData[0]);
        // console.log(locationKey);
        getWeatherData(locationKey);
    }catch(error){
        console.log(error);
    }
}

function convertFtoC(fahrenheit) {
    let celsius = (5 / 9) * (fahrenheit - 32);
    return celsius;
}

async function getWeatherData(locationKey){
    try{
        let url = `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey={enter your api key here}`
        let weatherResponse = await fetch(url);
        if(!weatherResponse.ok){
            throw new Error("Error while fetching weather data..");
        }
        let weatherData = await weatherResponse.json();
        if(!weatherData){
            throw new Error("Error while fetching weather data..");
        }
        console.log(weatherData);

        // let dateTime = weatherData.DailyForecasts[0].Date;
        // // console.log(dateTime);
        // if(!dateTime){
        //     throw new Error("Error while getting date..");
        // }

        let minTemp = Math.round(convertFtoC(weatherData.DailyForecasts[0].Temperature.Minimum.Value));
        let maxTemp = Math.round(convertFtoC(weatherData.DailyForecasts[0].Temperature.Maximum.Value));
        if(minTemp == undefined || maxTemp == undefined){
            throw new Error("Error while getting max. min. temperature data..");
        }
        // console.log(minTemp);
        // console.log(maxTemp);
        minimumTemperature.forEach((min) => {
            min.innerHTML = `Min = ${minTemp}<sup>o</sup>C`;
        });
        maximumTemprature.forEach((max) => {
            max.innerHTML = `Max = ${maxTemp}<sup>o</sup>C`;
        });

        let dayIcon = weatherData.DailyForecasts[0].Day.Icon.toString();
        let dayIconPhrase = weatherData.DailyForecasts[0].Day.IconPhrase;
        if(dayIcon == undefined){
            throw new Error("Error while getting day icon data..");
        }else if(dayIconPhrase == undefined){
            throw new Error("Error while getting day weather data..")
        }
        if(dayIcon.length == 1){
            dayIcon = "0" + dayIcon;
        }
        // console.log(dayIcon);
        // console.log(dayIconPhrase);
        dayImage.src = `https://developer.accuweather.com/sites/default/files/${dayIcon}-s.png`;
        dayStatus.innerText = dayIconPhrase;

        let nightIcon = weatherData.DailyForecasts[0].Night.Icon.toString();
        let nightIconPhrase = weatherData.DailyForecasts[0].Night.IconPhrase;
        if(nightIcon == undefined){
            throw new Error("Error while getting night icon data..");
        }else if(nightIconPhrase == undefined){
            throw new Error("Error while getting night weather data..")
        }
        if(nightIcon.length == 1){
            nightIcon = "0" + nightIcon;
        }
        // console.log(nightIcon);
        // console.log(nightIconPhrase);
        nightImage.src = `https://developer.accuweather.com/sites/default/files/${nightIcon}-s.png`;
        nightStatus.innerText = nightIconPhrase;

        let source = weatherData.DailyForecasts[0].Link;
        if(source == undefined){
            throw new Error("Error while getting source data..")
        }
        // console.log(source);
        sourceLink.href = source;
        display.classList.remove("hidden");

    }catch(error){
        console.log(error);
    }
}

button.addEventListener("click", (event) => {
    event.preventDefault();
    let inputLocation = userInputLocation.value.toLowerCase();
    locationURL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=hAaC4OdINFttAoOMJZg8h6WJZGEiQfcT&q=${inputLocation}`;
    getLocationKey(locationURL);
});


