
const searchForm = document.getElementById('searchCity');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const city = searchForm.elements.search.value;
  const APIKey = "7f90550ecbce4a56347e8acc00c6fbc2";
  const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

  fetch(queryURL).then(response => response.json())
  .then(response => {
    console.log(response);
  });
});









