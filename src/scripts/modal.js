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
    document.addEventListener('mousedown', closePopupByClick);
  };
};

export function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup); 
    };
  };
};

export function closePopupByClick(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  const closingPopup = evt.target.closest('.popup');
  
  if (evt.target.classList.contains('popup_is-opened') || (closingPopup && evt.target.classList.contains('popup__close'))) {
    closeModal(openedPopup);
  };
};

export function closeModal(popup) {
  if (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEsc);
    document.removeEventListener('mousedown', closePopupByClick);
  };
};

