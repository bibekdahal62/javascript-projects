
const locationKeyURL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=hAaC4OdINFttAoOMJZg8h6WJZGEiQfcT&q=bhojpur,nepal`;


async function getLocationKey(){
    try{
        let locationResponse = await fetch(locationKeyURL);
        if(!locationResponse.ok){
            throw new Error("Error while fetching location data..");
        }
        let locationData = await locationResponse.json();
        locationKey = locationData[0].Key;
        if(!locationKey){
            throw new Error("Error while getting location key..");
        }
        console.log(locationData[0]);
        console.log(locationKey);
        getWeatherData(locationKey);
    }catch(error){
        console.log(error);
    }
}

getLocationKey();

function convertFtoC(fahrenheit) {
    let celsius = (5 / 9) * (fahrenheit - 32);
    return celsius;
}

async function getWeatherData(locationKey){
    try{
        let url = `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=hAaC4OdINFttAoOMJZg8h6WJZGEiQfcT`
        let weatherResponse = await fetch(url);
        if(!weatherResponse.ok){
            throw new Error("Error while fetching weather data..");
        }
        let weatherData = await weatherResponse.json();
        if(!weatherData){
            throw new Error("Error while fetching weather data..");
        }
        console.log(weatherData);

        let dateTime = weatherData.DailyForecasts[0].Date;
        console.log(dateTime);
        if(!dateTime){
            throw new Error("Error while getting date..");
        }

        let minTemp = convertFtoC(weatherData.DailyForecasts[0].Temperature.Minimum.Value).toFixed(3);
        let maxTemp = convertFtoC(weatherData.DailyForecasts[0].Temperature.Maximum.Value).toFixed(3);
        if(!minTemp || !maxTemp){
            throw new Error("Error while getting max. min. temperature data..");
        }
        console.log(minTemp);
        console.log(maxTemp);

        let dayIcon = weatherData.DailyForecasts[0].Day.Icon;
        let dayIconPhrase = weatherData.DailyForecasts[0].Day.IconPhrase;
        if(!dayIcon){
            throw new Error("Error while getting day icon data..");
        }else if(!dayIconPhrase){
            throw new Error("Error while getting day weather data..")
        }
        dayIcon = "0" + dayIcon;
        console.log(dayIcon);
        console.log(dayIconPhrase);

        let nightIcon = weatherData.DailyForecasts[0].Night.Icon;
        let nightIconPhrase = weatherData.DailyForecasts[0].Night.IconPhrase;
        if(!nightIcon){
            throw new Error("Error while getting night icon data..");
        }else if(!nightIconPhrase){
            throw new Error("Error while getting night weather data..")
        }
        console.log(nightIcon);
        console.log(nightIconPhrase);

        let source = weatherData.DailyForecasts[0].Sources[0];
        if(!source){
            throw new Error("Error while getting source data..")
        }
        console.log(source);

    }catch(error){
        console.log(error);
    }
}



