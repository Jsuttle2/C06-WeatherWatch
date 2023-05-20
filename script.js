// Variables to store API key and base URL
const apiKey = 'da95735ff37c487be4b2b0f2027f7f32';
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Function to get the weather data for a city
function getWeatherData(city) {
  const url = `${baseUrl}?q=${city}&appid=${apiKey}`;

  // Make an API call using fetch
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Process the retrieved data and update the UI
      displayCurrentWeather(data);
      displayForecast(data);
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}

// Function to display the current weather
function displayCurrentWeather(data) {
  // Retrieve the required data from the API response
  const city = data.city.name;
  const date = new Date(data.list[0].dt * 1000).toLocaleDateString();
  const icon = data.list[0].weather[0].icon;
  const temperature = Math.round(data.list[0].main.temp - 273.15);
  const humidity = data.list[0].main.humidity;
  const windSpeed = data.list[0].wind.speed;

  // Update the UI with the current weather data
  const currentWeather = document.getElementById('currentWeather');
  currentWeather.innerHTML = `
    <h2>${city} (${date})</h2>
    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;
}

// Function to display the 5-day forecast
function displayForecast(data) {
  // Clear the previous forecast data
const forecast = document.getElementById('forecast');
forecast.innerHTML = '';

// Loop through the forecast data and create forecast items
for (let i = 0; i < data.list.length; i += 8) {
const date = new Date(data.list[i].dt * 1000).toLocaleDateString();
const icon = data.list[i].weather[0].icon;
const temperature = Math.round(data.list[i].main.temp - 273.15);
const humidity = data.list[i].main.humidity;
const windSpeed = data.list[i].wind.speed;

// Create a forecast item and append it to the forecast container
const forecastItem = document.createElement('div');
forecastItem.classList.add('forecast-item');
forecastItem.innerHTML = `
  <h3>${date}</h3>
  <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
  <p>Temperature: ${temperature}°C</p>
  <p>Humidity: ${humidity}%</p>
  <p>Wind Speed: ${windSpeed} m/s</p>
`;
forecast.appendChild(forecastItem);
 }
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    // Clear the input field
    cityInput.value = '';
    
    if (city !== '') {
    // Call the function to get weather data for the entered city
    getWeatherData(city);

    // Store the city in local storage for search history
    saveCityToLocalStorage(city);
    }
}

// Function to save the city to local storage
function saveCityToLocalStorage(city) {
    // Retrieve the search history from local storage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
    // Add the city to the search history
    searchHistory.push(city);
    
    // Remove duplicate cities
    searchHistory = [...new Set(searchHistory)];
    
    // Save the updated search history in local storage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    
    // Update the search history UI
    updateSearchHistoryUI(searchHistory);
    }
    
    // Function to update the search history UI
    function updateSearchHistoryUI(searchHistory) {
    const searchHistoryList = document.getElementById('searchHistory');
    searchHistoryList.innerHTML = '';
    
    // Loop through the search history and create list items
    for (let i = 0; i < searchHistory.length; i++) {
    const city = searchHistory[i];

// Create a list item and append it to the search history container
const listItem = document.createElement('li');
listItem.textContent = city;
listItem.addEventListener('click', () => {
  // Call the function to get weather data for the clicked city
  getWeatherData(city);
});
searchHistoryList.appendChild(listItem);
    }
}

// Attach event listener to the form submission
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', handleFormSubmit);

// On page load, retrieve the search history from local storage and update the UI
const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
updateSearchHistoryUI(searchHistory);


// + lat + "&lon=" + lon + "&appid=b89c09787bf9106df63088418a47c76b&units=imperial';