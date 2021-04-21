import './index.css';

import {
  initialCards,
  validSelector,
  popupFormAdd,
  popupFormEdit,
  buttonEdit,
  nameInput,
  vocationInput,
  buttonAdd,
} from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

const formValidatorEdit = new FormValidator(validSelector, popupFormEdit)
const formValidatorAdd = new FormValidator(validSelector, popupFormAdd)

const popupWithImage = new PopupWithImage('.popup_type_view')

const section = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, '.place-template', {
      handleCardClick: (item) => {
        popupWithImage.open(item)
      }
    })
    const cardElement = card.createCard()
    section.addItem(cardElement)
  }
}, '.places__section')

const userInfo = new UserInfo({
  userNameSelector: '.user__name',
  userVocationSelector: '.user__vocation'
})

const popupWithFormEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (items) => {
    userInfo.setUserInfo(items)
  }
})

const popupWithFormAdd = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (item => {
    const data = {
      name: item['title-place'],
      link: item['link-place'],
    }
    console.log(data)
    const card = new Card(data, '.place-template', {
      handleCardClick: (item) => {
        popupWithImage.open(item)
      }
    })
    const cardElement = card.createCard()
    section.addItem(cardElement)
    popupWithFormAdd.close()
  })
})

section.renderItems()

popupWithImage.setEventListeners()
popupWithFormEdit.setEventListeners()
popupWithFormAdd.setEventListeners()

buttonEdit.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name
  vocationInput.value = userInfo.getUserInfo().vocation
  formValidatorEdit.enableValidation()
  formValidatorEdit.deleteInputsError()
  popupWithFormEdit.open()
})

buttonAdd.addEventListener('click', () => {
  formValidatorAdd.enableValidation()
  formValidatorAdd.deleteInputsError()
  popupWithFormAdd.open()
})