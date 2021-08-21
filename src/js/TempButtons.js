import { setTempVal, setUnit } from "./utils";

export const createTemperatureButtonsSection = () => {

  const tempValues = ['C', 'F', 'K'];

  const tempButtons = document.querySelector(".section__tempButtons");

  const template = `
    <ul class="list">
      ${
        tempValues.map(val => `
          <li class="list__item">
            <button 
              class="btn btn__temp" data-tempname="${ val }">
                <span class="span span--unit">
                  &deg${ val }
                </span>
            </button>
          </li>
        `).join('')
      }
    </ul>
  `;

  tempButtons.innerHTML = template;

  const buttonsTemp = document.querySelectorAll(".btn__temp");
  buttonsTemp[0].classList.add('btn__temp-active');

  buttonsTemp.forEach(button => {
    button.addEventListener('click', (e) => {

      buttonsTemp.forEach(btn => btn.classList.remove('btn__temp-active'));
      button.classList.add('btn__temp-active');

      const data = e.target.dataset.tempname;
      switchTemp(data);
    });
  });
};

const switchTemp = (data) => {
  switch(data) {
    case 'C':
      convertToCelsius(data);
      break;
    case 'F': 
      convertToFahrenheit(data);
      break;
    case 'K':
      convertToKelvin(data);
      break;
    default:
      console.log('default: "c" ');
  };
};

const convertToCelsius = (data) => {

  const spanUnits = document.querySelectorAll("[data-tempunit]");
  const spanValues = document.querySelectorAll("[data-tempvalue]");
  
  spanValues.forEach(spanValue => {
    if (spanValue.dataset.tempvalue === 'C') return;
    else if (spanValue.dataset.tempvalue === 'F') {
      let value = parseFloat(spanValue.innerHTML);
      value = Math.round((value - 32) * 5 /9 );
      spanValue.innerHTML = `${ value }`;
    } else if(spanValue.dataset.tempvalue === 'K') {
      let value = parseFloat(spanValue.innerHTML);
      value = Math.round(value - 273.15);
      spanValue.innerHTML = `${ value }`;
    }
  });
  
  setTempVal(spanValues, data);
  setUnit(spanUnits, data);
  
};

const convertToFahrenheit = (data) => {
 
  const spanUnits = document.querySelectorAll("[data-tempunit]");
  const spanValues = document.querySelectorAll("[data-tempvalue]");
  
  spanValues.forEach(spanValue => {
    if (spanValue.dataset.tempvalue === 'F') return;
    else if(spanValue.dataset.tempvalue === 'C') {
      let value = parseFloat(spanValue.innerHTML);
      value = Math.round(value * 9 / 5 + 32);
      spanValue.innerHTML = `${ value }`;
    } else if(spanValue.dataset.tempvalue === 'K') {
      let value = parseFloat(spanValue.innerHTML);
      value = Math.round((value - 273.15) * 1.8 + 32);
      spanValue.innerHTML = `${ value }`;
    }
  });
  
  setTempVal(spanValues, data);
  setUnit(spanUnits, data);
  
};

const convertToKelvin = (data) => {
  
  const spanUnits = document.querySelectorAll("[data-tempunit]");
  const spanValues = document.querySelectorAll("[data-tempvalue]");

  spanValues.forEach(spanValue => {
    if (spanValue.dataset.tempvalue === 'K') return;
    else if(spanValue.dataset.tempvalue === 'C') {
      let value = parseFloat(spanValue.innerHTML);
      value = Math.round(value + 273.15);
      spanValue.innerHTML = `${ value }`;
    } else if(spanValue.dataset.tempvalue === 'F') {
      let value = parseFloat(spanValue.innerHTML);
      value = Math.round((value - 32) / 1.8 + 273.15);
      spanValue.innerHTML = `${ value }`;
    }
  });
  
  setTempVal(spanValues, data);
  setUnit(spanUnits, data);
  
};
