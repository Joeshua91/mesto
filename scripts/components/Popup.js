export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._closeEsc = this._handleEscClose.bind(this)
    this._handleClosePopup = this._handleClose.bind(this)
  }

  // открытие popup
  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._closeEsc)
  }

  // закрытие popup
  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._closeEsc);
  }

  // закрытие popup клавишей 'Esc'
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close(this._popup)
    }
  }

  // закрытие popup по нажатию на 'крестик' и по нажатию на overlay
  _handleClose = (evt) => {
    if (evt.target.classList.contains('popup__button-close') ||
      evt.target.classList.contains('popup')) {
      this.close(this._popup)
    }
  }

  // слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._popup.addEventListener('click', this._handleClosePopup)
  }
}

/* // открытие popup
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePressEsc);
};

/* // закрытие popup
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePressEsc);
};
*/

/* // закрытие popup клавишей 'Esc'
const closePressEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activedPopup = document.querySelector('.popup_opened');
    closePopup(activedPopup);
  }
};
*/

/* // закрытие popup по нажатию на 'крестик'
closePopupButtons.forEach((item) => {
  item.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});
*/

/* // закрытие popup по нажатию на overlay
popupSelector.forEach((item) => {
  item.addEventListener('click', (evt) => {
    closePopup(evt.target);
  });
});
*/