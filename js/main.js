import { displayImages } from './pictures.js';
import './pictures.js';
import { openImageForm } from './form.js';
import './hashtags-pristine.js';
import './effects.js';
import { fetchData } from './fetch.js';
import { displayAlert } from './util.js';
import './filters.js';
import './add-photos.js';

let imageList = [];

const handleSuccess = (data) => {
  imageList = data.slice();
  displayImages(imageList);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const handleError = () => {
  displayAlert();
};

fetchData(handleSuccess, handleError);
openImageForm();

export { imageList };
