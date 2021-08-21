import { setTempVal, setUnit, showDate } from "./utils";
import images from '../images/*.png';

// RENDER FORECAST
export const createForecastSection = (val) => {

  const forecastDays = document.querySelector(".section__forecastDays");
  forecastDays.innerHTML = '';

  const data = val.consolidated_weather.slice(1);

  const template = `
    <ul class="list list__days">
      ${
        data.map((item, index) => `
          <li class="list__item">
            <div class="forecast__item" data-index="${ index }">
              <span class="span span--forecastday"> 
                ${
                  index === 0 ? "Tommorow" : showDate(item.applicable_date)
                }
              </span>

              <div class="forecast__item--image">
                <img 
                  src='${ images[item.weather_state_name ] }'
                  alt="${ item.weather_state_name }" 
                  class="img img--forecast" />
              </div>

              <div class="forecast__item--temp">
                <div>
                  <span class="span span--maxtemp" data-tempvalue="">
                    ${
                      (item.max_temp).toFixed(1)
                    }
                  </span>
                  <span class="span span--maxtemp" data-tempunit="">
                    
                  </span>
                </div>
                <div>
                  <span class="span span--mintemp" data-tempvalue="">
                    ${
                      (item.min_temp).toFixed(1)
                    }
                  </span>
                  <span class="span span--mintemp" data-tempunit="">
                    
                  </span>
                </div>
              </div>
            </div>
          </li>
          `
        ).join('')
      }
    </ul>
  `;

  forecastDays.innerHTML = template;

  const spanUnits = document.querySelectorAll("[data-tempunit]");
  const spanValues = document.querySelectorAll("[data-tempvalue]");
  
  setTempVal(spanValues, 'C');
  setUnit(spanUnits, 'C');
};