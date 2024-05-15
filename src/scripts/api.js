export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: 'da47ef99-39cd-4dfe-971c-0e261c6b810f',
    'Content-Type': 'application/json',
  },
};

export function getUserInfoApi() {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export function getInitialCardsApi() {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export function uploadNewUserInfoApi(nameInput, jobInput) {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export function uploadNewCardApi(newName, newLink) {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: newName.value,
      link: newLink.value
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export function deleteCardApi(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export function likeApi(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export function unlikeApi(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export function uploadNewAvatarApi(newAvatarUrl) {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: newAvatarUrl
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};