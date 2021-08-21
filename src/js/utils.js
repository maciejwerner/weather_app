import { getDataByCity } from "./app";
import { navSection } from "./NavCard";
import { createTodayWeatherSection } from "./TodayCard";
import { createTemperatureButtonsSection } from "./TempButtons";
import { createForecastSection } from "./ForecastDaysCard";
import { createHighlistButtonsSection } from "./HighlistButtons";
import { createItemHightlightsSection } from "./HighlistCard";

// FORM SUBMIT
export const formSubmit = (e) => {
  e.preventDefault();

  const input = document.getElementById("search-input");
  const inputVal = input.value.trim().toLowerCase();

  if (inputVal !== "") getDataByCity(inputVal);
  
  closeSearch();
  document.querySelector('.form').reset();
};

export const setTempVal = (elements, unit) => {
  elements.forEach(el => el.setAttribute("data-tempvalue", `${ unit }`));
};

export const setUnit = (elements, unit) => {
  elements.forEach(el => el.setAttribute("data-tempunit", `${ unit }`));
  elements.forEach(el => el.innerHTML = `&deg${unit}`);
};

// CLOSE / OPEN NAVIGATION
export const openSearch = () => {
  const nav = document.querySelector('.section__nav');
  nav.classList.add("active__nav");
};

export const closeSearch = () => {
  const nav = document.querySelector('.section__nav');
  nav.classList.remove("active__nav");
};

// TOOGLE LOADING
export const toogleLoader = (boolean) => {
  const loader = document.querySelector(".loader");
  if (boolean === true) loader.classList.add("loader--active");
  else if (boolean === false ) loader.classList.remove("loader--active");
};

// DAY FUNCTION
export const showDate = (date) => {

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = new Date(date).getDay();
  const dayNumber = new Date(date).getDate();
  const monthName = new Date(date).getMonth();

  return `${days[dayName]}, ${dayNumber} ${months[monthName]}`;
};

// RENDER ALL CARDS
export const renderAllCards = (val, arr ) => {
  navSection();
  createTodayWeatherSection(val);
  createTemperatureButtonsSection();
  createForecastSection(val);
  createHighlistButtonsSection(val);
  createItemHightlightsSection(val, 0);
};