import { deleteCardApi, likeApi, unlikeApi } from './api.js'

export function createCard(cardData, deleteCallback, imageClickCallback, likeCallback, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likesCounter = cardElement.querySelector('.card__like-counter');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likesArr = cardData.likes;

  cardElement.id = cardData._id;
  likesCounter.textContent = cardData.likes.length;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  likesArr.forEach((liker) => {
    if (liker._id === userId) {
      likeButton.classList.add('card__like-button_is-active');
    };
  });

  if (userId !== cardData.owner._id) {
    deleteButton.classList.add('delete-button_hidden');
  };

  deleteButton.addEventListener('click', function (evt) {
    deleteCallback(evt);
  });

  cardImage.addEventListener('click', function (evt) {
    imageClickCallback(evt);
  });

  likeButton.addEventListener('click', function () {
    likeCallback(likeButton, likesCounter, cardElement.id);
  });

  return cardElement;
};

export function deleteCard(evt) {
  const cardId = evt.target.closest('.card').id
  deleteCardApi(cardId)
    .then(deleted => {
      if (deleted) {
        evt.target.closest('.card').remove();
      }
    })
    .catch(error => {
      console.error(error);
    });
};

export function likeCard(likeButton, likesCounter, cardId) {
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    likeApi(cardId)
      .then(result => {
        likeButton.classList.add('card__like-button_is-active');
        likesCounter.textContent = result.likes.length;
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    unlikeApi(cardId)
      .then(result => {
        likeButton.classList.remove('card__like-button_is-active');
        likesCounter.textContent = result.likes.length;
      })
      .catch(error => {
        console.error(error);
      });
  };
};

