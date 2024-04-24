import '../pages/index.css';
import { initialCards } from './cards.js'
// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Темплейт карточки
// @todo: Функция создания карточки
function createCard(cardData, deleteCallback, imageClickCallback, likeCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button')

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener('click', function() {
    deleteCallback(deleteButton);
  });

  cardImage.addEventListener('click', function(evt) {
    imageClickCallback(evt);
  });

  likeButton.addEventListener('click', function(evt) {
    likeCallback(evt)
  });

  return cardElement;
} 

// @todo: Функция удаления карточки
function deleteCard(refefenceElement) {
  // const removeElement = refefenceElement.closest('.card')
  // removeElement.remove()
  refefenceElement.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((el) => {
  placesList.append(createCard(el, deleteCard, openModal, cardLike))
})

// -----------------------------






// ============================================================

function openModal(evt) {
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
  }

  if (popupType) {
    const popup = document.querySelector(popupType);
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeOnEsc);
    document.addEventListener('click', closeOnClickOutside);
  }
}

// document.addEventListener('click', (evt) => {
//   openModal(evt);
// });


function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    openedPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEsc);
  }
};

function closeOnClickOutside(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.target.classList.contains('popup_is-opened')) {
    openedPopup.classList.remove('popup_is-opened');
    document.removeEventListener('click', closeOnClickOutside);
  }
}

function closeOnCloseBtn(evt) {
  const closingPopup = evt.target.closest('.popup');
  if (closingPopup && evt.target.classList.contains('popup__close')) {
    closingPopup.classList.remove('popup_is-opened')
  };
};

document.addEventListener('click', (evt) => {
  closeOnCloseBtn(evt);
})

const profileSection = document.querySelector('.profile')

profileSection.addEventListener('click', (evt) => {
  openModal(evt)
})

// ----------------------

// modal edit

// ----------------------

const editFormElement = document.forms.editProfile;

const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.description;

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description')

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();

  const closingPopup = evt.target.closest('.popup');
  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  nameInput.placeholder = profileTitle.textContent;
  jobInput.placeholder = profileDescription.textContent;

  editFormElement.reset()
  closingPopup.classList.remove('popup_is-opened')
}

editFormElement.addEventListener('submit', handleFormSubmit);

// ================================================

// add new card

const newPlaceForm = document.forms.newPlace;

function addNewPlace(evt) {
  evt.preventDefault()

  const closingPopup = evt.target.closest('.popup');
  const newName = newPlaceForm.elements.placeName;
  const newLink = newPlaceForm.elements.link;
  
  const card = {
    name: newName.value,
    link: newLink.value
  };

  console.log(card.name)
  console.log(card.link)
  
  placesList.insertBefore(createCard(card, deleteCard, openModal, cardLike), placesList.firstChild)
  newPlaceForm.reset()
  closingPopup.classList.remove('popup_is-opened')
}

newPlaceForm.addEventListener('submit', addNewPlace)

// ================================

// card like

function cardLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}