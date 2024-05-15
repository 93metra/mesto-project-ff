export function openModal(popup) {
  if (popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeOnEsc);
    document.addEventListener('mousedown', closePopupByClick);
  };
};

function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    };
  };
};

function closePopupByClick(evt) {
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

