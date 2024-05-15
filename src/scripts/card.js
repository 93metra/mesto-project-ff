import { deleteCardApi, likeApi, unlikeApi, uploadNewCardApi, getUserInfoApi } from './api.js'

export function createCard(cardData, deleteCallback, imageClickCallback, likeCallback, userInfo) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likesCounter = cardElement.querySelector('.card__like-counter');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.id = cardData._id;
  likesCounter.textContent = cardData.likes.length;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  if (userInfo._id !== cardData.owner._id) {
    deleteButton.classList.add('delete-button_hidden');
  };

  deleteButton.addEventListener('click', function (evt) {
    deleteCallback(evt);
  });

  cardImage.addEventListener('click', function (evt) {
    imageClickCallback(evt);
  });

  likeButton.addEventListener('click', function (evt) {
    likeCallback(evt);
  });

  return cardElement;
};

export function addNewCard(evt, newPlaceForm, loaderCallback, closeModalCallback, placesList, imagePopupCallback) {
  const newCardName = newPlaceForm.elements.placeName;
  const newCardLink = newPlaceForm.elements.link;

  loaderCallback(evt, true);

  getUserInfoApi()
    .then(userInfo => {
      uploadNewCardApi(newCardName, newCardLink)
        .then(card => {
          placesList.insertBefore(createCard(card, deleteCard, imagePopupCallback, likeCard, userInfo), placesList.firstChild);
          const openedPopup = document.querySelector('.popup_is-opened');
          closeModalCallback(openedPopup);
          loaderCallback(evt, false);
        });
    })
    .catch(error => {
      console.error(error);
    });
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

export function likeCard(evt) {
  const card = evt.target.closest('.card');
  const likeButton = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-counter');
  const cardId = card.id;

  if (!likeButton.classList.contains('card__like-button_is-active')) {
    likeApi(cardId)
      .then(result => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = result.likes.length;
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    unlikeApi(cardId)
      .then(result => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = result.likes.length;
      })
      .catch(error => {
        console.error(error);
      });
  };
};

