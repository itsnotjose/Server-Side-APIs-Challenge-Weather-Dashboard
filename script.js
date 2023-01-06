
const searchForm = document.getElementById('searchCity');
const citiesContainer = document.querySelector('#cities');
// getting the current time
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; 
const day = now.getDate();
const hour = now.getHours();
const minute = now.getMinutes();
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  //list of previous searches
  const searchTerm = searchForm.elements.search.value;
  let previousSearchTerms = localStorage.getItem('searchTerm');

  if (!previousSearchTerms) {
  localStorage.setItem('searchTerm', searchTerm);
  } else {
    previousSearchTerms += `,${searchTerm}`;
    localStorage.setItem('searchTerm', previousSearchTerms);
  }
  previousSearchTerms = localStorage.getItem('searchTerm').split(',');
  const listItems = previousSearchTerms.map(term => {
    return `<button class="city" id="city" data-term="${term}">${term}</button>`;
    
  });
  //clear button
  citiesContainer.innerHTML = listItems.join('');
  const clear = document.getElementById('clear');

  clear.addEventListener('click', () => {
    localStorage.removeItem('searchTerm');
    citiesContainer.innerHTML = '';

  });
  // button for past terms
  document.querySelectorAll('.city').forEach(button => {
    event.preventDefault();

    button.addEventListener('click', event => {
      console.log('button clicked');
      event.preventDefault();
      const term = event.target.dataset.term;
      searchForm.elements.search.value = term;
      searchForm.submit();
   
    });

  // getting the api
  const city = searchForm.elements.search.value;
  const APIKey = "7f90550ecbce4a56347e8acc00c6fbc2";
  const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
  const forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
  fetch(queryURL).then(response => response.json())
  .then(response => {
    // html output
    const temperature = response.main.temp;
    //console.log(temperature);
    const windSpeed = response.wind.speed;
    //console.log(windSpeed);
    const humidity = response.main.humidity;
    //console.log(humidity);
    const cityName = response.name;
    //console.log(cityName);
    const html = `
    <h2>Weather for ${city}  ${month}-${day}-${year} ${hour}:${minute}</h2>
    <p>Temperature: ${temperature}</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} MPH</p>
  `;
  document.getElementById('weatherOutput').innerHTML = html;
  const container = document.querySelector('#weatherOutput');
  const icon = document.createElement('img');
  icon.src = 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '.png';
  container.appendChild(icon);



  // get the weather data for the next 4 days
  fetch(forecastURL).then(response => response.json())
  .then(response => {
    const forecastData = response.list;
    
    const nextDays = forecastData.slice(0, 4);
    nextDays.forEach((day, index) => {
      const temperature = day.main.temp;
      const humidity = day.main.humidity;
      const windSpeed = day.wind.speed;
      const dateString = day.dt_txt;
      const weatherCondition = day.weather[0];

      // future icon for current weather condition
      const iconUrl = `http://openweathermap.org/img/wn/${weatherCondition.icon}@2x.png`;
      const iconFuture = document.createElement('img');
      iconFuture.src = iconUrl;
      // date for the following days
      const date = new Date(dateString);
      const formattedDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
    
      const container = document.querySelector(`#card-${index + 1}`);
      container.innerHTML = `
        <h2>Weather for ${city} on ${formattedDate}</h2>
        <p>Temperature: ${temperature}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} MPH</p>
        ${iconFuture.outerHTML}
      `;
    });
    
  }); 
});
});
});



