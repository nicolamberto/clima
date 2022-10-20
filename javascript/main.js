//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const api = {
    key: "24653bf38f563e133d11577a79de4d33",
    url: "https://api.openweathermap.org/data/2.5/weather"
}

async function search(query) {
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();
        
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        date.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = `${toCelsius(data.main.temp)}°c`;
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelsius(data.main.temp_min)} / ${toCelsius(data.main.temp_max)}`;
        updateImages(data);


        function updateImages(data) {
            const temp = toCelsius(data.main.temp);
            let src = 'recursos/temp-mid.png';
            if (temp > 26) {
              src = 'recursos/temp-high.png';
            } else if (temp < 20) {
              src = 'recursos/temp-low.png';
            }
            tempImg.src = src;
          }
    
    } catch(err) {
        console.log(err)
        alert("Hubo un error")
    }
}

function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function onSubmit(event) {
    event.preventDefault();
    search(searchbox.value);
}

const form = document.getElementById("search-form");
const searchbox = document.getElementById("searchbox");
form.addEventListener("submit", onSubmit, true);

const city = document.getElementById("city")
const date = document.getElementById("date")
const tempImg = document.getElementById("tempImg")
const temp = document.getElementById("temp")
const weather = document.getElementById("weather")
const range = document.getElementById("range")