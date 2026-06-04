
let isCelsius=true,currentWeather,currentForecast;
const $=id=>document.getElementById(id);

$('searchBtn').onclick=searchWeather;
$('cityInput').addEventListener('keypress',e=>{if(e.key==='Enter')searchWeather()});

async function searchWeather(){
 const city=$('cityInput').value.trim();
 if(!city)return;
 $('weather').innerHTML='<div class="spinner"></div>';
 currentWeather=await getWeather(city);
 currentForecast=await getForecast(city);
 renderWeather(); renderForecast();
}

function renderWeather(){
 let t=currentWeather.main.temp;
 if(!isCelsius)t=t*9/5+32;
 $('weather').innerHTML=`<div class="weather-card">
 <h2>${currentWeather.name}, ${currentWeather.sys.country}</h2>
 <h1>${t.toFixed(1)}°${isCelsius?'C':'F'}</h1>
 <p>${currentWeather.weather[0].description}</p>
 <div class="details">
 <div class="detail">Humidity ${currentWeather.main.humidity}%</div>
 <div class="detail">Wind ${currentWeather.wind.speed} m/s</div>
 <div class="detail">Pressure ${currentWeather.main.pressure} hPa</div>
 <div class="detail">Feels Like ${currentWeather.main.feels_like}°C</div>
 </div></div>`;
}
function renderForecast(){
 let h='<div class="forecast">';
 for(let i=0;i<5;i++){
  const item=currentForecast.list[i*8]; if(!item) continue;
  h+=`<div class="day"><h3>${new Date(item.dt_txt).toLocaleDateString('en-US',{weekday:'short'})}</h3><p>${item.main.temp}°C</p><p>${item.weather[0].main}</p></div>`;
 }
 $('forecast').innerHTML=h+'</div>';
}
$('unitBtn').onclick=()=>{isCelsius=!isCelsius;if(currentWeather){renderWeather();renderForecast();}};
$('themeBtn').onclick=()=>document.body.classList.toggle('dark');
$('clearBtn').onclick=()=>{$('cityInput').value='';$('weather').innerHTML='';$('forecast').innerHTML='';};
