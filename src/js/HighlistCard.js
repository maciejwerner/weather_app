export const createItemHightlightsSection = (val, index) => {

  const highlistItems = document.querySelector(".section__highlist");
  highlistItems.innerHTML = '';

  const data = val.consolidated_weather[index];

  const template = `
    <ul class="list list__highlistItems">

      <!-- WIND -->
      <li class="list__item">
        <div class="hightlights__item">
          <h3 class="item__title"> wind status </h3>
          <h4 class="item__detail">
            ${
              (data.wind_speed).toFixed(1)
            }
            <span class="span span--detailval"> mph </span>
          </h4>
          <div class="item--compass">
            <span class="span span--compass">
              <span class="material-icons icon__compass" style='transform: rotate(${ (data.wind_direction).toFixed() }deg);'>
                near_me
              </span>
            </span>
            <span class="span">
              ${
                data.wind_direction_compass
              }
            </span>
          </div>
        </div>
      </li>

      <!-- HUMIDITY -->
      <li class="list__item">
        <div class="hightlights__item">
          <h3 class="item__title"> humidity </h3>
          <h4 class="item__detail">
            ${
              data.humidity
            }
            <span class="span span--detailval">%</span>
          </h4>
          <div class="item__percent">
            <span class="span span--percent"> 0 </span>
            <span class="span span--percent"> 50 </span>
            <span class="span span--percent"> 100 </span>
          </div>
          <div class="item__percent--bar">
            <span class="span span--percent--bar" style="width: ${ data.humidity }%;"> </span>
          </div>
        
        </div>
      </li>

      <!-- VISIBILITY -->
      <li class="list__item">
        <div class="hightlights__item">
          <h3 class="item__title"> visibility </h3>
          <h4 class="item__detail">
            ${
              (data.visibility).toFixed(1)
            }
            <span class="span span--detailval">miles</span>
          </h4>
        </div>
      </li>

      <!-- AIR PRESSURE -->
      <li class="list__item">
        <div class="hightlights__item">
          <h3 class="item__title"> air presure </h3>
          <h4 class="item__detail">
            ${
              data.air_pressure
            }
            <span class="span span--detailval">mb</span>
          </h4>
        </div>
      </li>

    </ul>
  `;

  highlistItems.insertAdjacentHTML('beforeend', template);
};