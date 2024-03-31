// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Темплейт карточки
// @todo: Функция создания карточки
function addCard(cardTitle, cardImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').src = cardImage;
  cardElement.querySelector('.card__image').alt = `На изображении ` + cardTitle;

  deleteButton.addEventListener('click', function() {
    deleteCard(deleteButton);
  })

  placesList.append(cardElement);
}

// @todo: Функция удаления карточки
function deleteCard(referenceElement) {
  const cardToRemove = referenceElement.closest('.card');
  cardToRemove.remove()
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  addCard(item.name, item.link);
})
