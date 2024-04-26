import { createCard, cardLike, deleteCard } from './card.js'
import { nameInput, jobInput, profileTitle, profileDescription } from './index.js'

export function openModal(evt) {
  let popupType;

  if (evt.target.classList.contains('profile__edit-button')) {
    popupType = '.popup_type_edit';
  } else if (evt.target.classList.contains('profile__add-button')) {
    popupType = '.popup_type_new-card';
  } else if (evt.target.classList.contains('card__image')) {
    popupType = '.popup_type_image';
    const popUpImage = document.querySelector('.popup__image');
    popUpImage.src = evt.target.src;
    popUpImage.alt = evt.target.alt;
    document.querySelector('.popup__caption').textContent = evt.target.alt;
  };

  if (popupType) {
    const popup = document.querySelector(popupType);
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeOnEsc);
    document.addEventListener('mousedown', closeOnClickOutside);
    document.addEventListener('click', closeOnCloseBtn)
  };
};

function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      openedPopup.classList.remove('popup_is-opened');
      document.removeEventListener('keydown', closeOnEsc);
      resetModalInput(evt);
    };
  };
};

function closeOnClickOutside(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.target.classList.contains('popup_is-opened')) {
    openedPopup.classList.remove('popup_is-opened');
    document.removeEventListener('mousedown', closeOnClickOutside);
    resetModalInput(evt);
  };
};

function closeOnCloseBtn(evt) {
  const closingPopup = evt.target.closest('.popup');
  if (closingPopup && evt.target.classList.contains('popup__close')) {
    closingPopup.classList.remove('popup_is-opened');
    document.removeEventListener('click', closeOnCloseBtn);
    resetModalInput(evt);
  };
};

export function editProfile(evt) {
  evt.preventDefault();

  const closingPopup = evt.target.closest('.popup');
  const editFormElement = document.forms.editProfile;

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  nameInput.placeholder = profileTitle.textContent;
  jobInput.placeholder = profileDescription.textContent;

  editFormElement.reset();
  closingPopup.classList.remove('popup_is-opened');
};

export function addNewPlace(evt) {
  evt.preventDefault();

  const placesList = document.querySelector('.places__list');
  const newPlaceForm = document.forms.newPlace;
  const closingPopup = evt.target.closest('.popup');
  const newName = newPlaceForm.elements.placeName;
  const newLink = newPlaceForm.elements.link;
  
  const card = {
    name: newName.value,
    link: newLink.value
  };
  
  placesList.insertBefore(createCard(card, deleteCard, openModal, cardLike), placesList.firstChild);
  newPlaceForm.reset();
  closingPopup.classList.remove('popup_is-opened')
};

function resetModalInput(evt) {
  const targetPopup = evt.target.closest('.popup');
  if (targetPopup) {
    if (targetPopup.classList.contains('popup_type_new-card')) {
      const newPlace = document.forms.newPlace;
      newPlace.reset();
    } else if (targetPopup.classList.contains('popup_type_edit')) {
      nameInput.value = profileTitle.textContent;
      jobInput.value = profileDescription.textContent;
    };
  };
};