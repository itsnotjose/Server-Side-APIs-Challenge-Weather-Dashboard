
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
    return `<ul class="city" id="city-list">${term}</ul>`;
  });
  //clear button
  citiesContainer.innerHTML = listItems.join('');
  const clear = document.getElementById('clear');

  clear.addEventListener('click', () => {
    localStorage.removeItem('searchTerm');
    citiesContainer.innerHTML = '';
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
  
  fetch(forecastURL).then(response => response.json())
  .then(response => {
    const forecastData = response.list;
    // get the weather data for the next 4 days
    const nextDays = forecastData.slice(0, 4);
    nextDays.forEach((day, index) => {
      const temperature = day.main.temp;
      const humidity = day.main.humidity;
      const container = document.querySelector(`#card-${index + 1}`);
      document.querySelector('.card-' + (index + 1)).innerHTML = html;
      container.innerHTML = `
      <h2>Weather for ${city}  </h2>
        <h2>Temperature: ${temperature}</h2>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} MPH</p>
        
      `;
    });
  });


  
    
});
});




