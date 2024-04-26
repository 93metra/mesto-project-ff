export function createCard(cardData, deleteCallback, imageClickCallback, likeCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button')

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener('click', function(evt) {
    deleteCallback(evt);
  });

  cardImage.addEventListener('click', function(evt) {
    imageClickCallback(evt);
  });

  likeButton.addEventListener('click', function(evt) {
    likeCallback(evt);
  });
  
  return cardElement;
};

export function cardLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
};

export function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

