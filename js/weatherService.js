
async function getWeather(city){
 const r=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
 const d=await r.json();
 if(!r.ok) throw new Error(d.message);
 return d;
}
async function getForecast(city){
 const r=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
 const d=await r.json();
 if(!r.ok) throw new Error(d.message);
 return d;
}
