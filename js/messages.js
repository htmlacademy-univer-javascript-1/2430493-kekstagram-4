import { closeModal } from './modal.js';
import { isEscapeKey } from './utilities.js';

const documentBody = document.body;
const errorTemplate = documentBody.querySelector('#error').content.querySelector('section');
const successTemplate = document.querySelector('#success').content.querySelector('section');

const onPopupContainerClick = (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains('success__inner') || clickedElement.classList.contains('error__inner')) {
    return;
  }

  closePopup();
};

const onEscapeKeyDown = (event) => {
  event.preventDefault();
  if (isEscapeKey(event)) {
    closePopup();
  }
};

function closePopup() {
  documentBody.removeEventListener('click', onPopupContainerClick);
  document.removeEventListener('keydown', onEscapeKeyDown);
  documentBody.removeChild(documentBody.lastChild);
}

const showMessage = (messageTemplate) => {
  const message = messageTemplate.cloneNode(true);
  message.style.zIndex = 100;

  document.addEventListener('keydown', onEscapeKeyDown);
  documentBody.addEventListener('click', onPopupContainerClick);

  documentBody.appendChild(message);
};

const handleSuccess = () => {
  closeModal();
  showMessage(successTemplate);
};

const handleError = () => {
  showMessage(errorTemplate);
};

export { handleSuccess, handleError };
