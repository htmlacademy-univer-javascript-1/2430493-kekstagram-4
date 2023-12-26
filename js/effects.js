const DEFAULT_EFFECT_LEVEL = 100;
const MIN_EFFECT_VALUE = 0;
const EFFECTS_STEP = 0.1;
const MAX_GRAYSCALE = 1;
const MAX_SEPIA = 1;
const MAX_BLUR = 3;
const MIN_BRIGHTNESS = 1;
const MAX_BRIGHTNESS = 3;

const Slider = {
  MIN: 10,
  MAX: 100,
};

const uploadFormElement = document.querySelector('.img-upload__form');
const sliderElement = uploadFormElement.querySelector('.effect-level__slider');
const sliderUploadElement = uploadFormElement.querySelector('.img-upload__effect-level');
const currentSliderElement = uploadFormElement.querySelector('.effect-level__value');
const filterRadiosElements = uploadFormElement.querySelectorAll('.effects__item');
const mainPictureElement = uploadFormElement.querySelector('.img-upload__preview img');

let currentEffectValue = document.querySelector('.effects__radio').value;

currentSliderElement.value = DEFAULT_EFFECT_LEVEL;

const Effects = {
  none: 0,
  chrome: {
    filter: 'grayscale',
    range: { min: MIN_EFFECT_VALUE, max: MAX_GRAYSCALE },
    step: EFFECTS_STEP,
    measurementUnit: '',
  },
  sepia: {
    filter: 'sepia',
    range: { min: MIN_EFFECT_VALUE, max: MAX_SEPIA },
    step: EFFECTS_STEP,
    measurementUnit: '',
  },
  marvin: {
    filter: 'invert',
    range: { min: MIN_EFFECT_VALUE, max: DEFAULT_EFFECT_LEVEL },
    step: 1,
    measurementUnit: '%',
  },
  phobos: {
    filter: 'blur',
    range: { min: MIN_EFFECT_VALUE, max: MAX_BLUR },
    step: EFFECTS_STEP,
    measurementUnit: 'px',
  },
  heat: {
    filter: 'brightness',
    range: { min: MIN_BRIGHTNESS, max: MAX_BRIGHTNESS },
    step: EFFECTS_STEP,
    measurementUnit: '',
  },
};

const applySliderValue = () => {
  if (currentEffectValue !== 'none') {
    const effect = Effects[currentEffectValue];
    mainPictureElement.style.filter = `${effect.filter}(${sliderElement.noUiSlider.get()}${effect.measurementUnit})`;
    currentSliderElement.value = `${parseFloat(sliderElement.noUiSlider.get())}${effect.measurementUnit}`;
  } else {
    mainPictureElement.style.filter = '';
  }
};

const changeSlider = (newEffect) => {
  const effect = Effects[newEffect];
  if (effect !== 0) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effect.range.min,
        max: effect.range.max,
      },
      start: effect.range.max,
      step: effect.step,
    });
    sliderUploadElement.classList.remove('visually-hidden');
    applySliderValue();
  } else {
    sliderUploadElement.classList.add('visually-hidden');
    mainPictureElement.style.filter = '';
  }
};

const onNoUiSliderChange = () => {
  applySliderValue();
};

const onRadioChange = (evt) => {
  currentEffectValue = evt.currentTarget.querySelector('.effects__radio').value;
  changeSlider(currentEffectValue);
};

const resetFilters = () => {
  filterRadiosElements.forEach((filter) => {
    filter.removeEventListener('change', onRadioChange);
  });

  mainPictureElement.style.filter = 'none';
  sliderElement.noUiSlider.off('change', onNoUiSliderChange);
};

const initRadios = () => {
  sliderElement.noUiSlider.on('change', onNoUiSliderChange);
  sliderUploadElement.classList.add('visually-hidden');
  filterRadiosElements.forEach((filter) => {
    filter.addEventListener('change', onRadioChange);
  });
  mainPictureElement.style.filter = 'none';
};

noUiSlider.create(sliderElement, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },

  start: Slider.MAX,
  step: Slider.MIN,
  connect: 'lower',
});

export { initRadios, resetFilters };
