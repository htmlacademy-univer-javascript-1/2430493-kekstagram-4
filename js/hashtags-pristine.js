const MAX_SYMBOLS_ALLOWED = 20;
const MAX_HASHTAGS_ALLOWED = 5;
const MAX_COMMENTS_LENGTH_ALLOWED = 140;

const uploadFormElement = document.querySelector('.img-upload__form');
const submitButtonElement = document.querySelector('#upload-submit');
const descriptionInputElement = document.querySelector('.text__description');

const pristineForm = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error'
}, true);

const hashtagInputElement = document.querySelector('.text__hashtags');

let errorMessage = '';

const getErrorMessage = () => errorMessage;

const handleHashtags = (value) => {
  errorMessage = '';

  const inputValue = value.toLowerCase().trim();

  if (!inputValue) {
    return true;
  }

  const inputArray = inputValue.split(/\s+/);

  if (inputArray.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS_ALLOWED),
      error: `Максимальная длина одного хэш-тега ${MAX_SYMBOLS_ALLOWED} символов, включая решётку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS_ALLOWED,
      error: `Нельзя указать больше ${MAX_HASHTAGS_ALLOWED} хэш-тегов`,
    },
    {
      check: inputArray.some((item) => !/^#[A-Za-zА-Яа-яЁё0-9]{0,19}$/.test(item)),
      error: 'Хэш-тег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristineForm.addValidator(hashtagInputElement, handleHashtags, getErrorMessage, 2, false);

const validateInputFields = () => {
  if (pristineForm.validate()) {
    submitButtonElement.disabled = false;
  } else {
    submitButtonElement.disabled = true;
  }
};

const validateDescriptionInput = (value) => value.length <= MAX_COMMENTS_LENGTH_ALLOWED;
pristineForm.addValidator(descriptionInputElement, validateDescriptionInput, 'Не более 140 символов');

hashtagInputElement.addEventListener('input', validateInputFields);
descriptionInputElement.addEventListener('input', validateInputFields);
uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristineForm.validate();
});

export { pristineForm };
