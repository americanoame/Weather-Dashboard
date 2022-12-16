var weatherCard = document.querySelector('weather-card');
var fetchButton = document.getElementById('fetch-button');
var inputVal = document.getElementById('location-input');
var weatherDiv = document.getElementById('ticketmaster-div');


function checkWheather() {

    var weatherKey = '2831b8fc4f77e10c7c6818de58be1a7c';
    // var weatherKey = 'ea46403fc22bf7a9fa2ec1fa8455041f'
    var resquestUrl = ('https://api.openweathermap.org/data/2.5/weather?q=' + inputVal.value + '&appid=' + weatherKey)
    fetch(resquestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // TAKE THE COORDS LAT, LON from the data and run second fetch call
            // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
            // Error need second api key
            var secondUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&appid=' + weatherKey;
            fetch(secondUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    // Go into the second call data, list, then you can see the data for each day
                })

            for (var i = 0; i < data.length; i++) {
                var eventName = data.embedded.events[i].name;
                var eventImage = data.embedded.events[i].images[0].url;
                var eventDate = dayjs(data.embedded.events[i].dates.start.localData).format('MM DD YYYY');
                if (data > 0) {
                    eventName = eventImage + ':' + eventDate;
                }

                weatherDiv.innerHTML =
                    `<div class="card small hoverable ticketmaster-card">
                <div class="card-image">
                    <p>ADD IN ICON HERE</p>
                </div>
                <div class="card-content">
                    <p>${data.main.temp}</p>
                    <p>placeholder</p>
                    <p>placeholder</p>
                </div>
                <div class="card-action">
                    <a href="#">Placeholder</a>
                </div>
            </div>`;

            };
        })
}
fetchButton.addEventListener('click', checkWheather);


// "Please note that using One Call 3.0 requires a separate subscription to the One Call by Call plan. Learn more here https://openweathermap.org/price. If you have a valid subscription to the One Call by Call plan, but still receive this error, then please see https://openweathermap.org/faq#error401 for more info."