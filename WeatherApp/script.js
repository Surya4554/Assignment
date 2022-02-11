const config = {
    cUrl:"https://api.countrystatecity.in/v1/countries",
    cKey:"NGRWWXZFb0phZGh5UU5rdFFkNkVySlhEazRIclJSMkE3Y1hiT042NQ==",
    wUrl:"http://api.openweathermap.org/data/2.5/",
    wKey:"c1e0374795f1eeb72dccad1acc5e6efa",
};

const getCountries = async (fieldName, ...args) => {
    let apiEndPoint;
    switch(fieldName){
        case 'countries':
            apiEndPoint = config.cUrl;
            break;
        case 'states':
            apiEndPoint = `${config.cUrl}/${args[0]}/states`;
            break;
        case 'cities':        
            apiEndPoint = `${config.cUrl}/${args[0]}/states/${args[1]}/cities`;
        default:    
    }
    const response = await fetch(apiEndPoint, {headers:{"X-CSCAPI-KEY":config.cKey }, });
    if(response.status != 200){
        throw new error(`Something went wrong, status code: ${response.status}`);
    }
    const countries = await response.json();
    return countries;
};

const getWeather = async (cityName, ccode, units = "metric") => {
   const apiEndPoint = `${config.wUrl}weather?q=${cityName},${ccode.toLowerCase()}&APPID=${config.wKey}&units=${units}`;
   
   try {
            const response = await fetch(apiEndPoint);
            if(response.status != 200){
                if(response.status == 404){
                        weatherDiv.innerHTML = `<div class="alert-danger>
                                            <h3>Oops!! No data available...</h3>
                                        </div>"`
                    }else{
                    throw new Error(`Something went wrong, status code: ${response.status}`);
                }
            }
            const weather = await response.json();
            return weather;
    }catch(error){
        console.log(error);
   }
};

const getDateTime = (unixTimeStamp) =>{
    const milliseconds = unixTimeStamp *1000;
    const dateObject = new Date(milliseconds);
    const options = {
        weekday: "long",   year: "numeric",    month:"long",     day:"numeric",
    };
    const humanDateFormate = dateObject.toLocaleDateString('en-US',options)
     return humanDateFormate;
}

const tempCard = (val, unit = "cel") => {
    const flag = unit == "far" ? "°F" : "°C";
    return `<div id="tempcard">
    <h6 class="card-subtitle mb2 ${unit}">${val.temp}</h6>
    <p class="card-text">Feels Like: ${val.temp} ${flag}</p>
    <p class="card-text">Max: ${val.temp_max} ${flag}, Min: ${val.temp_min} ${flag}</p>
</div>`;
};

const displayWeather = (data) => {
    const weatherWidget = `<div class="card">
    <div class="card-body">
        <h5 class="card-title">${data.name}, ${data.sys.country} <span class="float-end units"><a href="#" class="unitlink active" data-unit="cel">°C</a> | <a href="#" class="unitlink" data-unit="far">°F</a></span> 
        </h5>
        <p>${getDateTime(data.dt)}</p>
        <div id="tempcard">${tempCard(data.main)}</div>
        ${data.weather.map((w) => `<div id="img-container"> ${w.main} <img src="https://openweathermap.org/img/wn/${w.icon}.png " /></div>
        <p> ${w.description} </p>`).join("\n")}
    </div>
</div>`;
  weatherDiv.innerHTML = weatherWidget; 

}

const getLoader = ()=>{
    return `<div class="spinner-grow text-info" role="status">
    <span class="visually-hidden">Loading.........</span>
    </div>`;
};

const countriesListDropDown = document.querySelector('#countrylist');
const statesListDropDown = document.querySelector('#statelist');
const citiesListDropDown = document.querySelector('#citylist');
const weatherDiv = document.querySelector('#weatherwidget');

document.addEventListener("DOMContentLoaded", async () => {
    const countries = await getCountries("countries");
    let countriesOptions = "";
    if(countries){
         countriesOptions += `<option value="">Country</option>`;
         countries.forEach((country) => {
             countriesOptions += `<option value="${country.iso2}">${country.name}</option>`;   
         });
         countriesListDropDown.innerHTML = countriesOptions;
    }

    // list state option
    countriesListDropDown.addEventListener('change', async function(){
          const selectedCountryCode = this.value;
         const states = await getCountries("states", selectedCountryCode);
         let statesOptions = "";
         if(states){
            statesOptions += `<option value="">State</option>`;
            states.forEach((state) => {
                statesOptions += `<option value="${state.iso2}">${state.name}</option>`;   
            });
            statesListDropDown.innerHTML = statesOptions;
            statesListDropDown.disabled = false;
         }
    });
    // list cities option
    statesListDropDown.addEventListener('change', async function(){
        const selectedCountryCode = countriesListDropDown.value;
        const selectedStateCode = this.value;
        const cities = await getCountries("cities", selectedCountryCode, selectedStateCode);
        let citiesOptions = "";
         if(cities){
            citiesOptions += `<option value="">City</option>`;
            cities.forEach((city) => {
                citiesOptions += `<option value="${city.name}">${city.name}</option>`;   
            });
            citiesListDropDown.innerHTML = citiesOptions;
            citiesListDropDown.disabled = false;
         }
    });
    citiesListDropDown.addEventListener('change', async function(){
        const selectedCountryCode = countriesListDropDown.value;
        const selectedCity = this.value;
        weatherDiv.innerHTML = getLoader();
        const weatherInfo = await getWeather(selectedCity,selectedCountryCode);
        displayWeather(weatherInfo);
    });

    // change celcius to farenhiet or farenhiet to celcius
    document.addEventListener('click', async (e) =>{
        if(e.target.classList.contains("unitlink")){
            const unitValue = e.target.getAttribute("data-unit");
            const selectedCountryCode = countriesListDropDown.value;
            const selectedCity = citiesListDropDown.value;
            const unitFlag = unitValue == "far" ? "imperial" : "metric";
            const weatherInfo = await getWeather(selectedCity,selectedCountryCode,unitFlag);
            
            const weatherTemp = tempCard(weatherInfo.main, unitValue);
            document.querySelector("#tempcard").innerHTML = weatherTemp;
            document.querySelectorAll(".unitlink").forEach((link) =>{
                 link.classList.remove("active");
            });
            e.target.classList.add("active");
        }
    });
});