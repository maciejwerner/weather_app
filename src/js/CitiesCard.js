import { getDataByCity } from "./app";
import { closeSearch } from "./utils";

// HISTORY LOCATION
export const createHistoryList = (arr) => {
  const locationList = document.querySelector(".location__list");
  locationList.innerHTML = '';

  const template = `
    ${
      arr.map(item => `
        <li class="list-li">
          <button class="btn btn--list" type="button" data-name="${ item }">
            <span class="span span--city"> ${ item } </span>
            <span class="material-icons span--icon span--icon--arrow">
              chevron_right
            </span>
          </button>
        </li>
      `
      ).join("")
    }
  `;

  locationList.insertAdjacentHTML('beforeend', template);

  const citiesButtons = document.querySelectorAll(".btn--list");

  citiesButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      let data = e.target.dataset.name;
      
      getDataByCity(data);
      closeSearch();
    });
  });
  
};

export const historyList = (arr) => {
  const arrayData = arr.reduce((acc, reducer) => {
    if (!acc.includes(reducer)) {
      acc.push(reducer);
    }
    return acc;
  }, []);

  createHistoryList(arrayData);
};
