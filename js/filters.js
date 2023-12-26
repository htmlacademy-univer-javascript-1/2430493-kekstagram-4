import { debounce, shuffleArray } from './util.js';
import { renderPhotos, removePhotos } from './pictures.js';
import { photos } from './main.js';

const FILTER_COUNT = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

const filtersForm = document.querySelector('.img-filters__form');

const availableFilters = {
  'filter-default': () => photos.slice(),
  'filter-random': () => shuffleArray(photos.slice()).slice(0, FILTER_COUNT),
  'filter-discussed': () => photos.slice().sort((firstElement, secondElement) => secondElement.comments.length - firstElement.comments.length),
};

const isButton = (evt) => evt.target.tagName === 'BUTTON';

const onFiltersFormClick = debounce((evt) => {
  if (isButton(evt)) {
    removePhotos();
    renderPhotos(availableFilters[evt.target.id]());
  }
});

const onButtonClick = (evt) => {
  if (isButton(evt)) {
    const selectedButton = filtersForm.querySelector(`.${ACTIVE_CLASS}`);

    if (selectedButton) {
      selectedButton.classList.remove(ACTIVE_CLASS);
    }

    evt.target.classList.add(ACTIVE_CLASS);
  }
};

filtersForm.addEventListener('click', onFiltersFormClick);
filtersForm.addEventListener('click', onButtonClick);
