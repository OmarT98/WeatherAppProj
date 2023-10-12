let weather = {
    apiKey: "f28c468731c11a2ad6d7eadc6157c2f4",
    fetchWeather: function (city) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        //console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = `Weather in ${name}`;
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = `${temp} C°`;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind speed: ${speed}km/h`;
        document.querySelector(".weather").classList.remove("Loading");
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchBar").value);
    }
};

let autocomplete;
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.querySelector("#autocomplete"),
        {
            types: ['establishment'],
            componentRestrictions: { 'country': ['AU'] },
            fields: ['place_id', 'geometry', 'name']
        });

    autocomplete.addEventListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    var place = autocomplete.getPlace();

    if (!place.geometry) {
        document.querySelector("#autocomplete").placeholder = 'Enter a place';

    } else {
        document.querySelector("#details").innerHtml = place.name;
    }
}

//The function for pressing search btn to work.
document
    .querySelector(".searchBtn")
    .addEventListener("click", function () {
        weather.search();
    });

//The function for pressing Enter to work.
document
    .querySelector(".searchBar")
    .addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            weather.search();
        }
    });

//weather.fetchWeather("Cairo");   

document
    .querySelector(".card")
    .addEventListener("click", function () {
        weather.search();
    });


function darkMode() {
    var element = document.querySelector(".card");
    element.classList.toggle("card");
}

function darkMode() {
    var element = document.querySelector(".card2");
    element.classList.toggle("card");
}