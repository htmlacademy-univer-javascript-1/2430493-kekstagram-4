import { isEscapeKey } from './util.js';
import { initRadios, resetFilters } from './effects.js';
import { pristine } from './hashtags-pristine.js';
import { uploadData } from './fetch.js';
import { onSuccess, onError } from './messages.js';

const ZOOM_SETTINGS = {
  MIN: 25,
  MAX: 100,
  step: 25,
};

const bodyElement = document.body;
const uploadFormElement = bodyElement.querySelector('.img-upload__form');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const imagePreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
const fileUploadElement = uploadFormElement.querySelector('#upload-file');
const closeFormButton = uploadFormElement.querySelector('#upload-cancel');
const minusZoomButton = uploadFormElement.querySelector('.scale__control--smaller');
const plusZoomButton = uploadFormElement.querySelector('.scale__control--bigger');
const zoomControlValueElement = uploadFormElement.querySelector('.scale__control--value');
const mainImageElement = uploadFormElement.querySelector('.img-upload__preview img');
const submitButton = uploadFormElement.querySelector('.img-upload__submit');

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  uploadData(onSuccess, onError, 'POST', new FormData(evt.target));
};

const openUploadForm = () => {
  closeFormButton.addEventListener('click', onCloseFormButtonClick);
  document.addEventListener('keydown', onCloseFormEscKeyDown);

  fileUploadElement.addEventListener('change', onFileUploadChange);
  zoomControlValueElement.value = '100%';
  uploadFormElement.addEventListener('submit', onUploadFormSubmit);
};

const changeZoom = (factor = 1) => {
  let size = parseInt(zoomControlValueElement.value, 10) + (ZOOM_SETTINGS.step * factor);

  if (size < ZOOM_SETTINGS.MIN) {
    size = ZOOM_SETTINGS.MIN;
  }

  if (size > ZOOM_SETTINGS.MAX) {
    size = ZOOM_SETTINGS.MAX;
  }

  zoomControlValueElement.value = `${size}%`;
  imagePreviewElement.style.transform = `scale(${size / 100})`;
};

const onMinusZoomButtonClick = () => {
  changeZoom(-1);
};

const onPlusZoomButtonClick = () => {
  changeZoom();
};

const removeEvents = () => {
  closeFormButton.removeEventListener('click', onCloseFormButtonClick);
  document.removeEventListener('keydown', onCloseFormEscKeyDown);
  uploadFormElement.removeEventListener('submit', onUploadFormSubmit);

  minusZoomButton.removeEventListener('click', onMinusZoomButtonClick);
  plusZoomButton.removeEventListener('click', onPlusZoomButtonClick);
};

const closeUploadForm = () => {
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  removeEvents();

  closeFormButton.removeEventListener('click', onCloseFormButtonClick);
  document.removeEventListener('keydown', onCloseFormEscKeyDown);

  uploadFormElement.reset();
  resetFilters();

  submitButton.disabled = false;

  pristine.reset();

  zoomControlValueElement.value = '100%';
  imagePreviewElement.style.transform = 'scale(100%)';
};

function onCloseFormButtonClick(evt) {
  evt.preventDefault();
  closeUploadForm();
}

function onCloseFormEscKeyDown(evt) {
  if (isEscapeKey(evt) &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description') &&
    !bodyElement.querySelector('.error')) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const changeImages = () => {
  const file = fileUploadElement.files[0];
  const fileUrl = URL.createObjectURL(file);

  mainImageElement.src = fileUrl;
};

const initZoomButtons = () => {
  minusZoomButton.addEventListener('click', onMinusZoomButtonClick);
  plusZoomButton.addEventListener('click', onPlusZoomButtonClick);
};

function onFileUploadChange() {
  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  openUploadForm();
  changeImages();

  closeFormButton.addEventListener('click', onCloseFormButtonClick);

  document.addEventListener('keydown', onCloseFormEscKeyDown);
  initZoomButtons();
  initRadios();
}

export { openUploadForm, closeUploadForm };
