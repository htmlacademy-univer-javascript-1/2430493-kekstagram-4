const DELAY_TIME = 500;

const KEY_CODES = {
  ESCAPE: 'Escape',
  ESC: 'Esc'
};

const delayExecution = (callback) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      callback(...args);
    }, DELAY_TIME);
  };
};

const shuffleArray = (array) => {
  for (let indexOne = array.length - 1; indexOne > 0; indexOne--) {
    const indexTwo = Math.floor(Math.random() * (indexOne + 1));
    [array[indexOne], array[indexTwo]] = [array[indexTwo], array[indexOne]];
  }
  return array;
};

const isEscapeKey = (event) => event.key === KEY_CODES.ESCAPE || event.key === KEY_CODES.ESC;

const closeOnEscKeyDown = (event, callback) => {
  if (isEscapeKey(event)) {
    callback();
  }
};

const displayAlert = () => {
  const alertMessage = document.createElement('div');
  alertMessage.style.position = 'absolute';
  alertMessage.style.left = 0;
  alertMessage.style.top = 0;
  alertMessage.style.right = 0;
  alertMessage.style.fontSize = '20px';
  alertMessage.style.backgroundColor = '#e1375f';
  alertMessage.style.padding = '15px';
  alertMessage.style.textAlign = 'center';
  alertMessage.textContent = 'Ошибка загрузки фотографий';
  document.body.append(alertMessage);
};

export { closeOnEscKeyDown, delayExecution, shuffleArray, isEscapeKey, displayAlert };
