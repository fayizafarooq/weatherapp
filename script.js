const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".inputCity");
const card=document.querySelector(".card");
const apiKey="72dfa7e9650831b2565c02734dfe1d0f" ;

weatherForm.addEventListener("submit", async event=>{
  event.preventDefault();
  const city=cityInput.value;
  if(city){
    try{
      const weatherData= await getWeatherdata(city);
      displayWeatherInfo(weatherData);
    }
    catch(error){
      console.error(error);
      displayError(error);
    }
  }
  else{
    displayError("Please enter a city");
  }
})

async function getWeatherdata(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
  const response= await fetch(apiUrl);
  if(!response.ok){
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
}

function formatTime(unix) {
  return new Date(unix * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function displayWeatherInfo(data){
  const {name:city,
          main:{temp,humidity},
          weather:[{description,id}],
          wind:{speed}}=data;

  card.textContent="";
  card.style.display="flex";

  const cityDisplay=document.createElement("h1");
  const tempDisplay=document.createElement("p");
  const humidityDisplay=document.createElement("p");
  const descDisplay=document.createElement("p");
  const windDisplay=document.createElement("p");
  const weatherEmoji=document.createElement("h1");

  //TEXT CONTENT
  cityDisplay.textContent=city;
  tempDisplay.textContent=`${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent="Humidity: "+humidity+"%";
  descDisplay.textContent=description;
  weatherEmoji.textContent=getWeatherEmoji(id);
  windDisplay.textContent = `Wind: ${(speed * 3.6).toFixed(1)} km/h`;
  

//CLASS LIST
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji")
  windDisplay.classList.add("windDisplay");
  

//APPENDING
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
  card.appendChild(windDisplay);
}
function getWeatherEmoji(weatherId){
  switch(true){
    case (weatherId>=200 && weatherId < 300):
      return "⛈️";
    case (weatherId>=300 && weatherId < 400):
      return "🌦️";
    case (weatherId>=500 && weatherId < 600):
      return "🌧️";
    case (weatherId>=600 && weatherId < 700):
      return "❄️";
    case (weatherId>=700 && weatherId < 700):
      return "🌫️";
    case (weatherId=== 800):
      return "☀️";
    case (weatherId>=801 && weatherId < 801):
      return "☁️";
    default:
      return "🌥️";
  }
}

function displayError(message){
  const errorDisplay=document.createElement("p");
  errorDisplay.textContent=message;
  errorDisplay.classList.add("errorDisplay");
  card.textContent="";
  card.style.display="flex";
  card.appendChild(errorDisplay);
}



