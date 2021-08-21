import { createItemHightlightsSection } from "./HighlistCard";
import { showDate } from "./utils";

export const createHighlistButtonsSection = (val) => {

  const data = val.consolidated_weather;

  const hightlightsButtons = document.querySelector(".section__highlistButtons");
  hightlightsButtons.innerHTML = '';

  const template = `
    <ul class="list list__highlistButtons">
      ${
        data.map((item, index) => `
          <li class="list__item" >
            <button class="btn btn__day" data-id="${ item.id }" data-index="${ index }">
              <span class="span span__btn-day"> 
                ${ 
                  (index === 0) ? 'Today' : (index === 1) ? 'Tommorow' : showDate(item.applicable_date) 
                }
              </span>
            </button>
          </li>
          `
        ).join('')
      }
    </ul>
  `;

  hightlightsButtons.insertAdjacentHTML('beforeend', template);

  const dayButtons = document.querySelectorAll(".btn__day");
  dayButtons[0].classList.add('btn__day-active');

  dayButtons.forEach(button => {
    button.addEventListener('click', (e) => {

      dayButtons.forEach(btn => btn.classList.remove('btn__day-active'));
      button.classList.add('btn__day-active');

      const dataIndex = e.target.dataset.index;
      createItemHightlightsSection(val, dataIndex);
    });
  });
};