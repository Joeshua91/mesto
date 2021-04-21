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

  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener('submit', this._handleSubmit)
  }

  _handleSubmitForm = (evt) => {
    evt.preventDefault()
    this._handleFormSubmit(this._getInputValues())
    this.close(this._popup)
  }

  close = () => {
    super.close()
    this._formPopup.reset()
  }


}