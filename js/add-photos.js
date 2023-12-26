const SUPPORTED_FILE_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const fileInput = uploadForm.querySelector('#upload-file');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');
const effectsContainer = uploadForm.querySelector('.effects__list');
const smallThumbnails = effectsContainer.querySelectorAll('span');

const handleImageUploadChange = () => {
  const selectedFile = fileInput.files[0];
  const fileName = selectedFile.name.toLowerCase();

  const hasValidExtension = SUPPORTED_FILE_EXTENSIONS.some((extension) => fileName.endsWith(extension));

  if (hasValidExtension) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imagePreview.src = reader.result;
      smallThumbnails.forEach((thumbnail) => { thumbnail.style.backgroundImage = `url(${reader.result})`; });
    });

    reader.readAsDataURL(selectedFile);
  }
};

fileInput.addEventListener('change', handleImageUploadChange);
