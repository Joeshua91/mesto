import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._formPopup = this._popup.querySelector('.popup__form')
    this._inputList = this._formPopup.querySelectorAll('.popup__input')
    this._handleSubmit = this._handleSubmitForm.bind(this)
  }

  // собрать данные всех полей формы
  _getInputValues = () => {
    const inputValues = {}
    this._inputList.forEach(input => inputValues[input.name] = input.value)
    return inputValues
  }

  // перезаписать родительский метод и обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener('submit', this._handleSubmit)
  }

  // обработчик сабмита формы
  _handleSubmitForm = (evt) => {
    evt.preventDefault()
    this._handleFormSubmit(this._getInputValues())
    this.close(this._popup)
  }

  // перезаписать родительский метод и сбросить форму при закрытии popup
  close = () => {
    super.close()
    this._formPopup.reset()
  }


}