import '../pages/index.css';
import { createCard, deleteCard, likeCard, addNewCard } from './card.js'
import { openModal, closeModal } from './modal.js'
import { validationConfig, enableValidation, clearValidation } from './validation.js'
import { getUserInfoApi, getInitialCardsApi, uploadNewUserInfoApi, uploadNewAvatarApi } from './api.js'

// DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileSection = document.querySelector('.profile');
const newPlaceForm = document.forms.newPlace;
const editProfileForm = document.forms.editProfile;
const editAvatarForm = document.forms.newAvatar;
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const avatarEditIcon = document.querySelector('.avatar__edit-icon')

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

function resetModalInput() {
  const targetPopup = document.querySelector('.popup_is-opened');
  if (targetPopup) {
    if (targetPopup.classList.contains('popup_type_new-card')) {
      newPlaceForm.reset();
    } else if (targetPopup.classList.contains('popup_type_edit')) {
      nameInput.value = profileTitle.textContent;
      jobInput.value = profileDescription.textContent;
    } else if (targetPopup.classList.contains('popup_type_edit_avatar')) {
      editAvatarForm.reset();
    };
  };
};

function updateUserInfo(evt) {
  renderLoader(evt, true);

  uploadNewUserInfoApi(nameInput, jobInput)
    .then(updated => {
      profileTitle.textContent = updated.name;
      profileDescription.textContent = updated.about;
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup);
      renderLoader(evt, false);
    })
    .catch(error => {
      console.error(error);
    });
};

function editAvatar(evt) {
  const newAvatarUrl = editAvatarForm.elements.link.value;
  renderLoader(evt, true);

  uploadNewAvatarApi(newAvatarUrl)
    .then(result => {
      profileImage.src = result.avatar;
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup);
      renderLoader(evt, false);
    })
    .catch(error => {
      console.error(error);
    });
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
profileSection.addEventListener('click', (evt) => {
  let popup;

  if (evt.target.classList.contains('profile__edit-button')) {
    popup = document.querySelector('.popup_type_edit');
  } else if (evt.target.classList.contains('profile__add-button')) {
    popup = document.querySelector('.popup_type_new-card');
  } else if (evt.target.classList.contains('avatar__edit-icon')) {
    popup = document.querySelector('.popup_type_edit_avatar');
  };

  openModal(popup);
  resetModalInput();
  clearValidation(validationConfig);
});

profileImage.addEventListener('mouseover', () => {
  avatarEditIcon.classList.add('avatar__icon-visible');
});

avatarEditIcon.addEventListener('mouseout', () => {
  avatarEditIcon.classList.remove('avatar__icon-visible');
});

newPlaceForm.addEventListener('submit', (evt) => {
  addNewCard(evt, newPlaceForm, renderLoader, closeModal, placesList, openImagePopup);
});

editProfileForm.addEventListener('submit', (evt) => {
  updateUserInfo(evt);
});

editAvatarForm.addEventListener('submit', (evt) => {
  editAvatar(evt);
});

// Вызовы
enableValidation(validationConfig);

Promise.all([getUserInfoApi(), getInitialCardsApi()])
  .then(([userInfo, initialCards]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.src = userInfo.avatar;

    initialCards.forEach((card) => {
      placesList.append(createCard(card, deleteCard, openImagePopup, likeCard, userInfo));
    });
  })
  .catch(error => {
    console.error(error);
  });

