const apiKey = "11553b90c4b765f0fbfecc9c17c00da0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.js-search');

const searchButton = document.querySelector('.js-search-button');

const weatherIcon = document.querySelector('.js-main-weather-icon');
async function checkWeather(city) {
    const response = await fetch(apiUrl + city+ `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    }
    else{
        var data =await response.json();

        console.log(data);
        document.querySelector('.js-city').innerHTML = data.name;
    
        document.querySelector('.js-temp').innerHTML = `${Math.round(data.main.temp)}°C`;
    
        document.querySelector('.js-humidity').innerHTML = data.main.humidity+"%"
    
        document.querySelector('.js-wind').innerHTML = Math.round(data.wind.speed)+"km/h"
    
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "img/clouds.png";
            document.querySelector('.weather-display').innerHTML = 'Cloudy'
        }
        else if(data.weather[0].main == "Haze"){
            weatherIcon.src = "img/mist.png";
            document.querySelector('.weather-display').innerHTML = 'Haze'
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "img/clear-sky.png";
            document.querySelector('.weather-display').innerHTML = 'Clear'
        }
    
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "img/snow.png";
            document.querySelector('.weather-display').innerHTML = 'Snow'
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "img/rain.png";
            document.querySelector('.weather-display').innerHTML = 'Rain'
        }
        document.querySelector('.error').style.display = "none";
        document.querySelector('.weather').style.display = "Block";
    }

   
}

searchButton.addEventListener('click',()=>{
    checkWeather(searchBox.value);
});
checkWeather(city);