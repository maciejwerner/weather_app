import { searchLocationByGPS } from "./app";
import { openSearch, setTempVal, setUnit, showDate } from "./utils";
import images from '../images/*.png';

// RENDER ASIDE MENU
export const createTodayWeatherSection = (val) => {

  const data = val.consolidated_weather[0];

  document.querySelector(".section__weather").innerHTML = '';

  const template = `

    <div class="location__buttons">
    
      <button class="btn btn--search" type="button" aria-controls="Search menu" data-action='opensearch'>
        Search for places
      </button>
      
      <button class="btn btn--geo" data-action='geolocation'>
        <span class="material-icons">
          gps_fixed
        </span>
      </button>
    
    </div>

    <div class="location__information">
      
      <div class="location__image">
        <img
          src='${ images[ data.weather_state_name ]}'
          alt='${ data.weather_state_name }'
          class="img img--location" />
      </div>

      <div class="location__temp">
        <h3 class="temp-header" data-tempvalue="">
          ${
            (data.the_temp).toFixed(1)
          }
        </h3>
        <span class="span span--tempdegree" data-tempunit="">
      
        </span>
      </div>

      <div class="location__weather">
        <h4 class="weather-header">
          ${
            data.weather_state_name
          }
        </h4>
      </div>

      <div class="location__date">
        <span class="span span--today"> Today </span>
        <span class="span span--dot"> · </span>
        <span class="span span--day">
          ${
            showDate(data.applicable_date)
          }
        </span>
      </div>

      <div class="location__marker">
        <span class="material-icons span--marker ">
          place
        </span>
        <span class="span span--city">
          ${
            val.title
          }
        </span>
      </div>

    </div>
  `;

  document.querySelector(".section__weather").innerHTML = template;

  const spanUnits = document.querySelectorAll("[data-tempunit]");
  const spanValues = document.querySelectorAll("[data-tempvalue]");
  
  setTempVal(spanValues, 'C');
  setUnit(spanUnits, 'C');

  document.querySelector("[data-action='opensearch']").addEventListener('click', openSearch);
  document.querySelector("[data-action='geolocation']").addEventListener('click', searchLocationByGPS)

};


