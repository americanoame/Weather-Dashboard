var weatherCard = document.querySelector('weather-card');
var fetchButton = document.getElementById('fetch-button');
var inputVal = document.getElementById('location-input');
var weatherDiv = document.getElementById('forecast-div');


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
                    // So you grab that data by going through the object into the main property and selecting the temp property
                    if (data) {
                        var weatherTemp = data.list[0].main.temp;
                        var weatherWin = data.list[0].wind.speed;
                        var weatherHumidity = data.list[0].main.humidity
                        var weatherIcon = data.list[0].weather[0].icon;
                        var weatherIconUrl = 'https://openweathermap.org/img/wn/' + weatherIcon;
                    }
                    weatherDiv.innerHTML =
                        `<div class="col-md" id="forecast-div">
                      <div class="card">
                      <div class="card-body">
                          <img id='forecast-icon' src=${weatherIconUrl} alt=''>
                          <p>${weatherTemp}</p>
                          <p>${weatherWin}</p>
                          <p>${weatherHumidity}</p>
                      </div>
                    </div>
                 </div>`;

                })

            for (var i = 0; i < data.length; i++) {
                var eventName = data.embedded.events[i].name;
                var eventImage = data.embedded.events[i].images[0].url;
                var eventDate = dayjs(data.embedded.events[i].dates.start.localData).format('MM DD YYYY');
                if (data > 0) {
                    eventName = eventImage + ':' + eventDate;
                }


            };
        })
}
fetchButton.addEventListener('click', checkWheather);


// "Please note that using One Call 3.0 requires a separate subscription to the One Call by Call plan. Learn more here https://openweathermap.org/price. If you have a valid subscription to the One Call by Call plan, but still receive this error, then please see https://openweathermap.org/faq#error401 for more info."