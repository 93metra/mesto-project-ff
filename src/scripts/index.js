import '../pages/index.css';
import { initialCards } from './cards.js'
import { createCard, cardLike, deleteCard } from './card.js'
import { openModal, editProfile, addNewPlace } from './modal.js'
// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileSection = document.querySelector('.profile');
const newPlaceForm = document.forms.newPlace;
const editProfileForm = document.forms.editProfile;
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

initialCards.forEach((el) => {
  placesList.append(createCard(el, deleteCard, openModal, cardLike))
});

profileSection.addEventListener('click', (evt) => {
  openModal(evt);
});

newPlaceForm.addEventListener('submit', (evt) => {
  addNewPlace(evt);
});

editProfileForm.addEventListener('submit', editProfile);

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

export { editProfileForm as editFormElement, nameInput, jobInput, profileTitle, profileDescription }


document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    console.log(evt.target)
  }
})