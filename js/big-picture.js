const SUPPORTED_FILE_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png'];

const uploadFormElement = document.querySelector('.img-upload__form');
const fileInputElement = uploadFormElement.querySelector('#upload-file');
const previewImageElement = uploadFormElement.querySelector('.img-upload__preview img');
const effectsListElement = uploadFormElement.querySelector('.effects__list');
const smallImageElements = effectsListElement.querySelectorAll('span');

const handleImageUploadChange = () => {
  const selectedFile = fileInputElement.files[0];
  const fileName = selectedFile.name.toLowerCase();

  const hasValidExtension = SUPPORTED_FILE_EXTENSIONS.some((extension) => fileName.endsWith(extension));

  if (hasValidExtension) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewImageElement.src = reader.result;
      smallImageElements.forEach((thumbnail) => { thumbnail.style.backgroundImage = `url(${reader.result})`; });
    });

    reader.readAsDataURL(selectedFile);
  }
};

fileInputElement.addEventListener('change', handleImageUploadChange);
