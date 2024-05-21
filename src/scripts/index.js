import '../pages/index.css';
import { createCard, deleteCard, likeCard } from './card.js'
import { openModal, closeModal } from './modal.js'
import { enableValidation, clearValidation } from './validation.js'
import { getUserInfoApi, getInitialCardsApi, uploadNewUserInfoApi, uploadNewAvatarApi, uploadNewCardApi } from './api.js'

// DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const newPlaceButton = document.querySelector('.profile__add-button')
const newPlaceForm = document.forms.newPlace;
const editProfileForm = document.forms.editProfile;
const editAvatarForm = document.forms.newAvatar;
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const avatarEditIcon = document.querySelector('.avatar__edit-icon')

// Объявления
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

// Функции
function openImagePopup(evt) {
  const popUpImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  popUpImage.src = evt.target.src;
  popUpImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;

  const popup = document.querySelector('.popup_type_image');
  openModal(popup);
};

function addNewCard(evt) {
  const newCardName = newPlaceForm.elements.placeName;
  const newCardLink = newPlaceForm.elements.link;
  renderLoader(evt, true);

  uploadNewCardApi(newCardName, newCardLink)
    .then(card => {
      placesList.insertBefore(createCard(card, deleteCard, openImagePopup, likeCard, card.owner._id), placesList.firstChild);
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      renderLoader(evt, false)
    })
};

function updateUserInfo(evt) {
  renderLoader(evt, true);

  uploadNewUserInfoApi(nameInput, jobInput)
    .then(updated => {
      profileTitle.textContent = updated.name;
      profileDescription.textContent = updated.about;
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      renderLoader(evt, false)
    })
};

function editAvatar(evt) {
  const newAvatarUrl = editAvatarForm.elements.link.value;
  renderLoader(evt, true);

  uploadNewAvatarApi(newAvatarUrl)
    .then(result => {
      profileImage.src = result.avatar;
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      renderLoader(evt, false)
    })
};

function renderLoader(evt, param) {
  const saveButton = evt.submitter;
  if (param) {
    saveButton.textContent = 'Сохранение...';
  } else {
    saveButton.textContent = 'Сохранить';
  };
};

// Обработчики
// Edit avatar
profileImage.addEventListener('mouseover', () => {
  avatarEditIcon.classList.add('avatar__icon-visible');
});

avatarEditIcon.addEventListener('mouseout', () => {
  avatarEditIcon.classList.remove('avatar__icon-visible');
});

avatarEditIcon.addEventListener('click', () => {
  const popup = document.querySelector('.popup_type_edit_avatar');
  editAvatarForm.reset();
  clearValidation(validationConfig);
  openModal(popup);
});

editAvatarForm.addEventListener('submit', (evt) => {
  editAvatar(evt);
});

// Edit profile
profileEditButton.addEventListener('click', () => {
  const popup = document.querySelector('.popup_type_edit');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(validationConfig);
  openModal(popup);
});

editProfileForm.addEventListener('submit', (evt) => {
  updateUserInfo(evt);
});

// Add new place
newPlaceButton.addEventListener('click', () => {
  const popup = document.querySelector('.popup_type_new-card');
  newPlaceForm.reset();
  clearValidation(validationConfig);
  openModal(popup);
});

newPlaceForm.addEventListener('submit', (evt) => {
  addNewCard(evt);
});

// Вызовы
enableValidation(validationConfig);

Promise.all([getUserInfoApi(), getInitialCardsApi()])
  .then(([userInfo, initialCards]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.src = userInfo.avatar;

    initialCards.forEach((card) => {
      placesList.append(createCard(card, deleteCard, openImagePopup, likeCard, userInfo._id));
    });
  })
  .catch(error => {
    console.error(error);
  });

