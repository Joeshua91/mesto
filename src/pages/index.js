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
  popuEdit,
  popupAvatar,
  buttonAvatar,
  popupFormAvatar,
  popupAdd,
  popupConfirm,
  popupFormConfirm
} from '../scripts/utils/constants.js';

import Api from '../scripts/components/Api'
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithFormConfirm from '../scripts/components/PopupWithFormConfirm.js'

const formEditProfileValidator = new FormValidator(validSelector, popupFormEdit)
const formAddCardValidator = new FormValidator(validSelector, popupFormAdd)
const formAvatarValidator = new FormValidator(validSelector, popupFormAvatar)

const popupWithImage = new PopupWithImage(popupView)

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

const createCard = (data) => {
  const card = new Card(data, placeTemplate, {
    handleCardClick: (item) => {
      popupWithImage.open(item)
    },
    handleCardLike: (id) => {
      if (document.querySelector('.place-card__like').classList.contains('place-card__like_active')) {
        api.deleteLikeCard(id)
          .then((data) => {
            card.removeLike()
            card.countLike(data)
          })
          .catch(err => {
            console.log(`Не удалось убрать отметку 'Мне нравится'. Ошибка: ${err}.`)
          })
      } else {
        api.addLikeCard(id)
          .then((data) => {
            card.addLike()
            card.countLike(data)
          })
          .catch(err => {
            console.log(`Не удалось добавить отметку 'Мне нравится'. Ошибка: ${err}.`)
          })
      }
    }
  }, popupWithFormConfirm, userInfo.getUserInfo()._id)
  const cardElement = card.createCard()
  return cardElement
}

const popupWithFormEdit = new PopupWithForm({
  popupSelector: popuEdit,
  handleFormSubmit: (data) => {
    loading(popupFormAdd, true)
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
      .then(() => {
        popupWithFormEdit.close()
      })
      .catch(err => {
        console.log(`Ошибка: ${err}.`)
      })
      .finally(loading(popupFormAdd, false))
  }
})

const popupWithFormAvatar = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormSubmit: (data => {
    loading(popupFormAvatar, true)
    api.editUserAvatar({
      avatar: data.avatar,
    })
      .then(res => {
        userInfo.setUserAvatar({
          avatar: res.avatar,
        })
      })
      .then(() => {
        popupWithFormAvatar.close()
      })
      .catch(err => {
        console.log(`Ошибка: ${err}.`)
      })
      .finally(loading(popupFormAvatar, false))
  })
})

const popupWithFormAdd = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (data => {
    loading(popupFormAdd, true)
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
        section.renderCard()
        //section.addItem(createCard(res));
        //section.renderCard()
      })
      .then(() => {
        popupWithFormAdd.close()
      })
      .catch(err => {
        console.log(`Не удалось загрузить карточку. Ошибка: ${err}.`)
      })
      .finally(loading(popupFormAdd, false))
  })
})

const popupWithFormConfirm = new PopupWithFormConfirm({
  popupSelector: popupConfirm,
  handleFormSubmit: ({ item, id }) => {
    loading(popupFormConfirm, true)
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
      .finally(loading(popupFormConfirm, false))
  }
})

const loading = (popup, save) => {
  const buttonSave = popup.querySelector('.popup__button-save')
  if (save) {
    buttonSave.textContent = 'Сохранение...'
  } else {
    buttonSave.textContent = 'Сохранение'
  }
}

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
/*
const section = new Section({
  items: [],
  renderer: (data) => {
    createCard(data)
    //const cardElement = createCard(data)
    //section.addItem(cardElement)
  }
}, placeSection)
//section.renderItems()
*/
/*
const section = new Section({
  items: [],
  * ... *
}, placeSection);

* ... *

section.addItem(createCard(res));
*/