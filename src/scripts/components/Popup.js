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
      this.close()
    }
  }

  // закрытие popup по нажатию на 'крестик' и по нажатию на overlay
  _handleClose(evt) {
    if (evt.target.classList.contains('popup__button-close') ||
      evt.target.classList.contains('popup')) {
      this.close()
    }
  }

  // слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._popup.addEventListener('click', this._handleClosePopup)
  }
}