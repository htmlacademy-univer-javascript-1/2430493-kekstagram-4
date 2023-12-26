const API_URLS = {
  GET: 'https://29.javascript.pages.academy/kekstagram/data',
  POST: 'https://29.javascript.pages.academy/kekstagram'
};

const sendRequest = (onSuccess, onError, method, body) => {
  fetch(
    API_URLS[method],
    {
      method: method,
      body: body,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};

const loadData = (onSuccess, onError, method = 'GET') => sendRequest(onSuccess, onError, method);

const uploadData = (onSuccess, onError, method = 'POST', body) => sendRequest(onSuccess, onError, method, body);

export { loadData, uploadData };
