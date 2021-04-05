const form = document.querySelector(".form");
const submitBtn = document.querySelector(".btn--submit");
const loader = document.querySelector(".loader");
const inputValidation = document.querySelector(".input-validation");
const nav = document.querySelector(".navigation");
const btnClose = document.querySelector(".btn--close");
const btnSearch = document.querySelector(".btn--search");
const btnGeo = document.querySelector(".btn--geo");

btnGeo.addEventListener("click", searchLocationByGPS);
btnClose.addEventListener("click", closeSearch);
btnSearch.addEventListener("click", openSearch);
form.addEventListener("submit", searchLocation);
submitBtn.addEventListener("click", searchLocation);

const cors = "https://cors-anywhere-venky.herokuapp.com/"
const url = `${cors}https://www.metaweather.com/api/`;

let city = "london";
const citiesArr = [];

const tempButtons = [
  {
    symbol: "C",
    description: "celsius"
  },
  {
    symbol: "F",
    description: "fahrenheit",
  },
  {
    symbol: "K",
    description: "kelvin",
  }
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// GET DATA BY CITY
// GENERAL FORM OF FUNCTION 
async function getDataByCity(val) {
  openLoading();
  try {
    const api = await fetch(`${url}/location/search/?query=${val}`);
    const result = await api.json();

    const {title, woeid} = result[0];
    citiesArr.unshift(title);

    inputValidation.classList.remove("validation-false");

    getDataByWoeid(woeid);
    
  } catch (err) {
    inputValidation.classList.add("validation-false");
  } finally {
    closeLoading();
  }
}
getDataByCity(city);

// GET DATA BY WOEID
async function getDataByWoeid(val) {
  const data = await fetch(`${url}/location/${val}/`);
  const result = await data.json();

  historyList(citiesArr);
  renderAllCards(result);
}

// GET DATA BY GPS
async function getDataByGPS(lat, long) {
  const data = await fetch(`${url}location/search/?lattlong=${lat},${long}`);
  const result = await data.json();

  const {title} = result[0];
  getDataByCity(title);
}


// RENDER ALL CARDS
function renderAllCards(val) {
  createAsideMain(val);
  createTemperatureButtons();
  createForecast(val);
  createHighlistButtons(val);
  createHightlights(val);
  createFooter();
}

// RENDER ASIDE MENU
function createAsideMain(val) {
  return document.querySelector(".location__information").innerHTML = `
    <div class="location__image">
      <img src="images/weather-${val.consolidated_weather[0].weather_state_name}.png" alt="weather" class="img img--location">
    </div>

    <div class="location__temp">
      <h3 class="temp-header" data-tempunit="celsius">
        ${(val.consolidated_weather[0].the_temp).toFixed(1)} 
      </h3>
      <span class="span span--tempdegree">
        &deg${tempButtons[0].symbol}
      </span>
    </div>

    <div class="location__weather">
      <h4 class="weather-header">${val.consolidated_weather[0].weather_state_name}</h4>
    </div>

    <div class="location__date">
      <span class="span span--today">Today</span>
      <span class="span span--dot"> · </span>
      <span class="span span--day"> ${showDate(val.consolidated_weather[0].applicable_date)}</span>
    </div>

    <div class="location__marker">
      <span class="span span--marker fas fa-map-marker-alt">
      </span>
      <span class="span span--city">${val.title}</span>
    </div>
  `;
}

// RENDER  TEMPERATURE BUTTONS 
function createTemperatureButtons() {
  const tempButtonsDiv = document.querySelector(".temp__buttons");

  const buttons = tempButtons.map(button => {
    return `
      <button class="btn btn--temp" data-name="${button.description}">
        <span class="span span--unit"> &deg${button.symbol} </span>
      </button>
    `
  }).join("");

  tempButtonsDiv.innerHTML = buttons;

  const buttonsTemp = document.querySelectorAll(".btn--temp");

  const celsiusBtn = document.querySelector("[data-name='celsius']");
  const fahrenheitBtn = document.querySelector("[data-name='fahrenheit']");
  const kelvinBtn = document.querySelector("[data-name='kelvin']");

  celsiusBtn.addEventListener("click", convertToCelsius);
  fahrenheitBtn.addEventListener("click", convertToFahrenheit);
  kelvinBtn.addEventListener("click", convertToKelvin);

  markActiveTempBtn(buttonsTemp);
  return tempButtonsDiv;
}

function markActiveTempBtn(buttons) {
  buttons[0].classList.add("btn--temp-active");

  buttons.forEach(btn => btn.addEventListener("click", () => {
    buttons.forEach(item => item.classList.remove("btn--temp-active"));
    btn.classList.add("btn--temp-active");
  }));
}


let index = 1
// RENDER FORECAST
function createForecast(val) {
  const forecastContainer = document.querySelector(".forecast__container");

  const forecastDays = val.consolidated_weather.slice(1);

  let fiveDays = forecastDays.map((day, index) => {
    return `
      <div class="forecast__item" data-index="${index}">
        <span class="span span--forecastday"> ${index === 0 ? "Tommorow" : showDate(day.applicable_date)}</span>
        <div class="forecast__item--image">
          <img src="images/weather-${day.weather_state_name}.png" alt="cloud" class="img img--forecast">
        </div>
        <div class="forecast__item--temp">
          <div>
            <span class="span span--maxtemp" data-tempunit="celsius">
              ${(day.max_temp).toFixed(1)}
            </span>
            <span class="span span--maxtemp ">
              &deg${tempButtons[0].symbol}
            </span>
          </div>
          <div>
            <span class="span span--mintemp" data-tempunit="celsius">
              ${(day.min_temp).toFixed(1)}
            </span>
            <span class="span span--mintemp">
              &deg${tempButtons[0].symbol}
            </span>
          </div>
        </div>
      </div>
    `
  }).join("");

  return forecastContainer.innerHTML = fiveDays;
}

// RENDER HIGHLIGHTS
function createHightlights(val) {
  const highlistWrapper = document.querySelector(".hightlights__wrapper");

  return highlistWrapper.innerHTML = `
    <div class="hightlights__item">
      <h3 class="item__title"> wind status </h3>
      <h4 class="item__detail"> ${(val.consolidated_weather[0].wind_speed).toFixed(1)}
        <span class="span span--detailval"> mph </span>
      </h4>
      <div class="item--compass"> 
        <span class="span"> </span>
        <span class="span"> ${val.consolidated_weather[0].wind_direction_compass} </span>
      </div>

    </div>

    <div class="hightlights__item">
      <h3 class="item__title"> humidity </h3>
      <h4 class="item__detail"> ${val.consolidated_weather[0].humidity}
        <span class="span span--detailval">%</span>
      </h4>

      <div class="item__percent">
        <span class="span span--percent"> 0 </span>
        <span class="span span--percent"> 50 </span>
        <span class="span span--percent"> 100 </span>
      </div>

      <div class="item__percent--bar">
        <span class="span span--percent--bar" style="width: ${val.consolidated_weather[0].humidity}%;"> </span>
      </div>
      
    </div>

    <div class="hightlights__item">
      <h3 class="item__title"> visibility </h3>
      <h4 class="item__detail"> ${(val.consolidated_weather[0].visibility).toFixed(1)}
        <span class="span span--detailval">miles</span>
      </h4>

    </div>

    <div class="hightlights__item">
      <h3 class="item__title"> air presure </h3>
      <h4 class="item__detail"> ${val.consolidated_weather[0].air_pressure}
        <span class="span span--detailval">mb</span>
      </h4>

    </div>
  `;
}

// RENDER HIGHLIGHTS BUTTONS
function createHighlistButtons(val) {

  const data = val.consolidated_weather;
  const hightlightsList = document.querySelector(".hightlights_list");

  const dayBtns = data.map(( btn,index ) => {

    let btnDate = ""

    if (index === 0) btnDate = "Today" ;
    else if (index === 1) btnDate = "Tommorow";
    else btnDate = showDate(btn.applicable_date);

    return `
      <li data-index="${ index }">
        <button class="btn btn--day" data-id="${ btn.id }">
          <span class="span span--btn-day"> ${ btnDate } </span>
        </button>
      </li>
    `;
  }).join("");

  hightlightsList.innerHTML = dayBtns;

  const dayItems = document.querySelectorAll(".btn--day");
  markActiveBtn(dayItems, data);
  return hightlightsList;  
}

// MARK ACTIVE HIGHLIGHTS DAY BUTTON
function markActiveBtn(dayItems ,data) {
  dayItems[0].classList.add("btn--day-active");

  dayItems.forEach(item => item.addEventListener("click", e => {
    const itemId = e.target.dataset.id;
    const itemCard = data.filter(({ id }) => id == itemId);

    dayItems.forEach(item => item.classList.remove("btn--day-active"));
    item.classList.add("btn--day-active");

    createItemHightlights(itemCard);
  }));
}

// RENDER ITEM HIGHLIGHTS
function createItemHightlights(val) {
  const highlistWrapper = document.querySelector(".hightlights__wrapper");

  return highlistWrapper.innerHTML = `
    <div class="hightlights__item">
      <h3 class="item__title"> wind status </h3>
      <h4 class="item__detail"> ${(val[0].wind_speed).toFixed(1)}
        <span class="span span--detailval"> mph </span>
      </h4>
      <div class="item--compass"> 
        <span class="span"> </span>
        <span class="span"> ${val[0].wind_direction_compass} </span>
      </div>

    </div>

    <div class="hightlights__item">
      <h3 class="item__title"> humidity </h3>
      <h4 class="item__detail"> ${val[0].humidity}
        <span class="span span--detailval">%</span>
      </h4>

      <div class="item__percent">
        <span class="span span--percent"> 0 </span>
        <span class="span span--percent"> 50 </span>
        <span class="span span--percent"> 100 </span>
      </div>

      <div class="item__percent--bar">
        <span class="span span--percent--bar" style="width: ${val[0].humidity}%;"> </span>
      </div>
      
    </div>

    <div class="hightlights__item">
      <h3 class="item__title"> visibility </h3>
      <h4 class="item__detail"> ${(val[0].visibility).toFixed(1)}
        <span class="span span--detailval">miles</span>
      </h4>

    </div>

    <div class="hightlights__item">
      <h3 class="item__title"> air presure </h3>
      <h4 class="item__detail"> ${val[0].air_pressure}
        <span class="span span--detailval">mb</span>
      </h4>

    </div>
  `;
}

// RENDER FOOTER
function createFooter() {
  return document.querySelector(".footer").innerHTML = `
    <span class="span span--footer"> created by </span>
    <a href="https://github.com/maciejwerner/weather_app" target="_blank" class="link link--footer"> <strong>Maciej Werner</strong></a>
    <span class="span span--footer"> - </span>
    <a href="https://devchallenges.io/" target="_blank" class="link link--footer"> devChallenges.io</a>
  `;
}

// FORM SUBMIT
function searchLocation(e) {
  e.preventDefault();

  const input = document.querySelector(".input-search")
  const inputVal = input.value.trim().toLowerCase();

  if (inputVal !== "") getDataByCity(inputVal);
  
  closeSearch();
  form.reset();
}

// HISTORY LOCATION
function historyList(arr) {

  const arrayData = arr.reduce((acc, reducer) => {
    if (!acc.includes(reducer)) {
      acc.push(reducer);
    }
    return acc;
  }, []);

  createHistoryList(arrayData);
}

function createHistoryList(arr) {
  const locationList = document.querySelector(".location__list");

  const items = arr.map(item => {
    return `
      <li class="list-li">
        <button class="btn btn--list" type="button" data-name="${item}">
          <span class="span span--city"> ${item} </span>
          <span class="span span--icon span--icon--arrow fas fa-angle-right"></span>
        </button>
      </li>
    `
  }).join("");

  locationList.innerHTML = items;

  const citiesButtons = document.querySelectorAll(".btn--list");

  citiesButtons.forEach(btn => btn.addEventListener("click", e => {
    let city = e.target.dataset.name;
    getDataByCity(city);
    closeSearch();
  }));
}


// CLOSE / OPEN NAVIGATION
function openSearch() {
  nav.classList.add("active-nav");
}
function closeSearch() {
  nav.classList.remove("active-nav");
}

// CLOSE / OPEN LOADING
function openLoading() {
  loader.classList.remove("close-loader");
}
function closeLoading() {
  loader.classList.add("close-loader");
}

// DAY FUNCTION
function showDate(date) {
  const dayName = new Date(date).getDay();
  const dayNumber = new Date(date).getDate();
  const monthName = new Date(date).getMonth()

  return `${days[dayName]}, ${dayNumber} ${months[monthName]}`;
}

// CONVERT DEGREES
function convertToCelsius() {
  const spanTemps = document.querySelectorAll("[data-tempunit]");
 
  spanTemps.forEach(span => {
    if(span.dataset.tempunit === "celsius") {
      return;
    }
    else if (span.dataset.tempunit === "fahrenheit"){
      let val = parseFloat(span.innerHTML);
      val = Math.round((val - 32) * 5 /9 );
      const nextEl = span.nextElementSibling;
      return (span.innerHTML = `${val}`, span.dataset.tempunit = 'celsius', nextEl.innerHTML = `&degC`);
    } else if (span.dataset.tempunit === "kelvin") {
      let val = parseFloat(span.innerHTML);
      val = Math.round(val - 273.15);
      const nextEl = span.nextElementSibling;
      return (span.innerHTML = `${val}`, span.dataset.tempunit = 'celsius', nextEl.innerHTML = `&degC`);
    }
  }) 
}

function convertToFahrenheit() {
  const spanTemps = document.querySelectorAll("[data-tempunit]");

  spanTemps.forEach(span => {
    if (span.dataset.tempunit === "fahrenheit") {
      return;
    }
    else if (span.dataset.tempunit === "celsius") {
      let val = parseFloat(span.innerHTML);
      val = Math.round(val * 9 / 5 + 32);
      const nextEl = span.nextElementSibling;
      return (span.innerHTML = `${val}`, span.dataset.tempunit = 'fahrenheit', nextEl.innerHTML = `&degF`);
    } else if (span.dataset.tempunit === "kelvin") {
      let val = parseFloat(span.innerHTML);
      val = Math.round((val - 273.15) * 1.8 + 32);
      const nextEl = span.nextElementSibling;
      return (span.innerHTML = `${val}`, span.dataset.tempunit = 'fahrenheit', nextEl.innerHTML = `&degF`);
    }
  })
}

function convertToKelvin() {
  const spanTemps = document.querySelectorAll("[data-tempunit]");

  spanTemps.forEach(span => {
    if (span.dataset.tempunit === "kelvin") {
      return;
    }
    else if (span.dataset.tempunit === "fahrenheit") {
      let val = parseFloat(span.innerHTML);
      val = Math.round((val - 32) / 1.8 + 273.15);
      const nextEl = span.nextElementSibling;
      return (span.innerHTML = `${val}`, span.dataset.tempunit = 'kelvin', nextEl.innerHTML = `&degK`);
    } else if (span.dataset.tempunit === "celsius") {
      let val = parseFloat(span.innerHTML);
      val = Math.round(val + 273.15);
      const nextEl = span.nextElementSibling;
      return (span.innerHTML = `${val}`, span.dataset.tempunit = 'kelvin', nextEl.innerHTML = `&degK`);
    }
  })
}

// GEOLOCATION
function searchLocationByGPS() {
  if( 'geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    alert("Your browser doesn't support geolocation method!");
  }
}

function setPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  getDataByGPS(lat, long);
}