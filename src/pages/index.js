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
  userAvatar,
  popupView,
  buttonAvatar,
  popupFormAvatar,
} from '../scripts/utils/constants.js';

import Api from '../scripts/components/Api'
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithFormConfirm from '../scripts/components/PopupWithFormConfirm.js'

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '08704321-7bb1-4c78-b9e1-013c8abb4d8e',
    'content-Type': 'application/json'
  }
})

const userInfo = new UserInfo({
  userNameSelector: userName,
  userVocationSelector: userVocation,
  userAvatarSelector: userAvatar
})

// получить данные с сервера
api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo(
      {
        name: res.name,
        vocation: res.about,
        _id: res._id,
        avatar: res.avatar
      })
  })
  .catch(err => {
    // вывести ошибку в консоль, если данные пользователя не загрузились
    console.log(`Данные пользователя с сервера не получены. Ошибка: ${err}.`)
  })

// получить данные карточек с сервера
api.getInitialCards()
  .then(res => {
    const section = new Section({
      items: res,
      renderer: (data) => {
        const cardElement = createCard(data)
        section.addItem(cardElement)
      }
    }, placeSection)
    section.renderItems()
  })
  .catch(err => {
    console.log(`Данные карточек с сервера не получены. Ошибка: ${err}. Карточки загружены по умолчанию`)
    const section = new Section({
      items: initialCards,
      renderer: (data) => {
        const cardElement = createCard(data)
        section.addItem(cardElement)
      }
    }, placeSection)
    section.renderItems()
  })

const formEditProfileValidator = new FormValidator(validSelector, popupFormEdit)
const formAddCardValidator = new FormValidator(validSelector, popupFormAdd)
const formAvatarValidator = new FormValidator(validSelector, popupFormAvatar)

const popupWithImage = new PopupWithImage(popupView)

const createCard = (data) => {
  const card = new Card(data, placeTemplate, {
    handleCardClick: (item) => {
      popupWithImage.open(item)
    },
    handleCardLike: (method, id, likedCardCount) => {
      api.likedCard(method, id)
        .then(data => {
          likedCardCount.textContent = data.likes.length
        })
        .catch(err => {
          console.log(`Ошибка: ${err}.`)
        })
    }
  }, popupWithFormConfirm, userInfo.getUserInfo()._id)
  const cardElement = card.createCard()
  return cardElement
}

const popupWithFormEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    api.editUserInfo({
      name: data.name,
      vocation: data.vocation
    })
      .then(res => {
        userInfo.setUserInfo({
          name: res.name,
          vocation: res.about,
          _id: res._id
        })
      })
      .catch(err => {
        console.log(`Ошибка: ${err}.`)
      })

  }
})

const popupWithFormAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (data => {
    api.editUserAvatar({
      avatar: data.avatar,
    })
      .then(res => {
        userInfo.setUserAvatar({
          avatar: res.avatar,
        })
      })
      .catch(err => {
        console.log(`Ошибка: ${err}.`)
      })

  })
})

const popupWithFormAdd = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (data => {
    api.addCard({
      name: data['title-place'],
      link: data['link-place']
    })
      .then(res => {
        const section = new Section({
          items: res,
          renderer: (data) => {
            const cardElement = createCard(data)
            section.addItem(cardElement)
          }
        }, placeSection)
        section.addItem(cardElement)
      })
      .catch(err => {
        console.log(`Ошибка: ${err}.`)
      })
  })
})

const popupWithFormConfirm = new PopupWithFormConfirm({
  popupSelector: '.popup_type_confirm',
  handleFormSubmit: ({ item, id }) => {
    api.deleteCard(id)
      .then(() => {
        item.remove()
      })
      .then(() => {
        popupWithFormConfirm.close()
      })
      .catch(err => {
        console.log(`Не удалось удалить карточку. Ошибка: ${err}.`)
      })
  }
})

// переделать
/*
const popupWithFormAdd = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (item => {
    const data = {
      name: item['title-place'],
      link: item['link-place'],
    }
    const cardElement = createCard(data)

    const section = new Section({
      items: item,
      renderer: (data) => {
        const cardElement = createCard(data)
        section.addItem(cardElement)
      }
    }, placeSection)

    section.addItem(cardElement)
    popupWithFormAdd.close()
  })
})

*/


popupWithImage.setEventListeners()
popupWithFormEdit.setEventListeners()
popupWithFormAdd.setEventListeners()
popupWithFormAvatar.setEventListeners()
popupWithFormConfirm.setEventListeners()
formEditProfileValidator.enableValidation()
formAddCardValidator.enableValidation()
formAvatarValidator.enableValidation()

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

buttonAvatar.addEventListener('click', () => {
  formAvatarValidator.deleteInputsError()
  popupWithFormAvatar.open()
})