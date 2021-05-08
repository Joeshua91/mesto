import PopupWithForm from './PopupWithForm.js'

export default class PopupWithFormConfirm extends PopupWithForm {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(item) {
    super.open()
    this._item = item
  }

  _handleSubmitForm(evt) {
    evt.preventDefault()
    this._handleFormSubmit(this._item)
    super.close()
  }
}