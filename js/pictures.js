import { showFullImage } from './full-image.js';

const photoTemplate = document.querySelector('#photo').content.querySelector('.photo');
const fragment = document.createDocumentFragment();

const renderPhoto = (photoData) => {
  const { url, description, comments, likes } = photoData;
  const photoElement = photoTemplate.cloneNode(true);

  const imageElement = photoElement.querySelector('.photo__image');
  const commentsElement = photoElement.querySelector('.photo__comments');
  const likesElement = photoElement.querySelector('.photo__likes');

  imageElement.src = url;
  imageElement.alt = description;
  commentsElement.textContent = comments.length;
  likesElement.textContent = likes;

  const onPhotoElementClick = (event) => {
    event.preventDefault();
    showFullImage(photoData);
  };

  photoElement.addEventListener('click', onPhotoElementClick);

  fragment.append(photoElement);
};

const renderPhotos = (photoDataArray) => {
  const photoContainer = document.querySelector('.photos');

  photoDataArray.forEach((photoData) => {
    renderPhoto(photoData);
  });

  photoContainer.appendChild(fragment);
};

const removePhotos = () => {
  document.querySelectorAll('.photo').forEach((photoElement) => photoElement.remove());
};

export { renderPhotos, removePhotos };
