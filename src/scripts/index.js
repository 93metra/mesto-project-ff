import '../pages/index.css';
import { initialCards } from './cards.js'
// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Темплейт карточки
// @todo: Функция создания карточки
function createCard(cardsArr, callBack) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = cardsArr.name;
  cardImage.src = cardsArr.link;
  cardImage.alt = cardsArr.name;

  deleteButton.addEventListener('click', function() {
    callBack(deleteButton);
  })

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
  placesList.append(createCard(el, deleteCard))
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

document.addEventListener('click', (evt) => {
  openModal(evt);
});


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
    closingPopup.classList.toggle('popup_is-opened')
  } 
};

document.addEventListener('click', (evt) => {
  closeOnCloseBtn(evt)
})
