import '../pages/index.css';
import { initialCards } from './cards.js'
import { createCard, cardLike, deleteCard } from './card.js'
import { openModal, closeModal, closePopupByClick, closeOnEsc } from './modal.js'

// DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileSection = document.querySelector('.profile');
const newPlaceForm = document.forms.newPlace;
const editProfileForm = document.forms.editProfile;
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Создание стартовых карточек 
initialCards.forEach((el) => {
  placesList.append(createCard(el, deleteCard, openImagePopup, cardLike))
});

// Обработчики
profileSection.addEventListener('click', (evt) => {
  openModal(evt);
  resetModalInput();
});

newPlaceForm.addEventListener('submit', (evt) => {
  const openedPopup = document.querySelector('.popup_is-opened');
  addNewPlace(evt);
  closeModal(openedPopup);
});

editProfileForm.addEventListener('submit', (evt) => {
  const openedPopup = document.querySelector('.popup_is-opened');
  editProfile(evt);
  closeModal(openedPopup);
});

// Функции
function openImagePopup(evt) {
  const popUpImage = document.querySelector('.popup__image');
  popUpImage.src = evt.target.src;
  popUpImage.alt = evt.target.alt;
  document.querySelector('.popup__caption').textContent = evt.target.alt;

  const popup = document.querySelector('.popup_type_image');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeOnEsc);
  document.addEventListener('mousedown', closePopupByClick);
};

function editProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
};

function addNewPlace(evt) {
  evt.preventDefault();

  const newName = newPlaceForm.elements.placeName;
  const newLink = newPlaceForm.elements.link;
  
  const card = {
    name: newName.value,
    link: newLink.value
  };
  
  placesList.insertBefore(createCard(card, deleteCard, openModal, cardLike), placesList.firstChild);
};

function resetModalInput() {
  const targetPopup = document.querySelector('.popup_is-opened');
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