import { closeSearch, formSubmit } from "./utils";

export const navSection = () => {

  document.querySelector('.section__nav').innerHTML = '';

  const template = `
    <div class="container">
      <button class="btn btn--close" data-action="close">
        <span class="span span--line"></span>
      </button>
    </div>

    <div class="container">

      <form action="" class="form" data-action='form'>

        <div class="form__item form__item--search">
          <span class="material-icons span--icon span--icon--search">
            search
          </span>
          <div class="search-box">
            <input type="text" class="input input-search" id="search-input" autocomplete="off" required maxlength="45"
              title="Can't read numbers">
            <label for="search-input" class="label">
              <span class="span span--label"> search location </span>
            </label>
          </div>
        </div>

        <div class="form__item">
          <button class="btn btn--submit" type="submit" aria-controls="search input" data-action="submit"> Search </button>
        </div>

      </form>

    </div>

    <div class="container">

      <div class="input-validation">
        <p class="par">Please fill in the field properly</p>
      </div>

    </div>

    <div class="container">

      <h3 class="location__header">
        History:
      </h3>
      
      <ul class="location__list">
      
      </ul>

  </div>
  `;

  document.querySelector('.section__nav').insertAdjacentHTML('beforeend', template);

  document.querySelector('[data-action="form"]').addEventListener('submit', formSubmit);
  document.querySelector('[data-action="submit"]').addEventListener('click', formSubmit);
  document.querySelector('[data-action="close"]').addEventListener('click', closeSearch);
};