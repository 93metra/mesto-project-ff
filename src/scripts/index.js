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
  cardImage.alt = `На изображении ` + cardsArr.name;

  deleteButton.addEventListener('click', function() {
    callBack(deleteButton);
  })

  return cardElement;
} 

// @todo: Функция удаления карточки
function deleteCard(refefenceElement) {
  const removeElement = refefenceElement.closest('.card')
  removeElement.remove()
}

// @todo: Вывести карточки на страницу
initialCards.forEach((el) => {
  placesList.append(createCard(el, deleteCard))
})
