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
  placeTemplate,
  placeSection,
  userName,
  userVocation,
  popupView
} from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

const formEditProfileValidator = new FormValidator(validSelector, popupFormEdit)
const formAddCardValidator = new FormValidator(validSelector, popupFormAdd)

const popupWithImage = new PopupWithImage(popupView)

const createCard = (data) => {
  const card = new Card(data, placeTemplate, {
    handleCardClick: (item) => {
      popupWithImage.open(item)
    }
  })
  const cardElement = card.createCard()
  return cardElement
}

const section = new Section({
  items: initialCards,
  renderer: (data) => {
    const cardElement = createCard(data)
    section.addItem(cardElement)
  }
}, placeSection)

const userInfo = new UserInfo({
  userNameSelector: userName,
  userVocationSelector: userVocation
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
    const cardElement = createCard(data)
    section.addItem(cardElement)
    popupWithFormAdd.close()
  })
})

section.renderItems()

popupWithImage.setEventListeners()
popupWithFormEdit.setEventListeners()
popupWithFormAdd.setEventListeners()
formEditProfileValidator.enableValidation()
formAddCardValidator.enableValidation()

buttonEdit.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name
  vocationInput.value = userInfo.getUserInfo().vocation
  formEditProfileValidator.deleteInputsError()
  popupWithFormEdit.open()
})

buttonAdd.addEventListener('click', () => {
  formAddCardValidator.deleteInputsError()
  popupWithFormAdd.open()
})