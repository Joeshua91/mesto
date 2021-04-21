import {
  initialCards,
  validSelector,
  popupFormAdd,
  popupFormEdit,
  buttonEdit,
  nameInput,
  vocationInput,
} from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

const popupWithImage = new PopupWithImage('.popup_type_view');
popupWithImage.setEventListeners();

const formValidatorEdit = new FormValidator(validSelector, popupFormEdit);
const formValidatorAdd = new FormValidator(validSelector, popupFormAdd);

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




section.renderItems()

popupWithFormEdit.setEventListeners()

buttonEdit.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name
  vocationInput.value = userInfo.getUserInfo().vocation
  formValidatorEdit.enableValidation()
  formValidatorEdit.deleteInputsError()
  popupWithFormEdit.open()
})

/*
 // инициализация карточек
const initialPlaces = () => {
  const initialResults = initialCards.map(createPlace);

  placeSection.append(...initialResults);
};

 // создание карточки
const createPlace = (data) => {
  const card = new Card(data, '.place-template');
  const cardElement = card.createCard();

  return cardElement;
};

 // рендеринг карточек
const renderPlace = (item) => {
  placeSection.prepend(createPlace(item));
};

// открытие popup
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePressEsc);
};

// закрытие popup
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePressEsc);
};

// закрытие popup клавишей 'Esc'
const closePressEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activedPopup = document.querySelector('.popup_opened');
    closePopup(activedPopup);
  }
};

// редактирование профиля
const handleEditFormSubmit = (evt) => {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userVocation.textContent = vocationInput.value;

  closePopup(popupEdit);
};

// добавление карточки
const handleAddFormSubmit = (evt) => {
  evt.preventDefault();

  renderPlace({
    name: inputPlaceTitle.value,
    link: inputPlaceLink.value,
  });

  formPopupAdd.reset();
  closePopup(popupAdd);
};



// обработать отдельно взятую форму
formArray.forEach((formElement) => {
  const formValidator = new FormValidator(validSelector, formElement);
  formValidator.enableValidation();
});


initialPlaces();


buttonEdit.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  vocationInput.value = userVocation.textContent;

  formValidatorEdit.deleteInputsError(validSelector, popupFormEdit);

  openPopup(popupEdit);
});

buttonAdd.addEventListener('click', () => {
  popupFormAdd.reset();

  formValidatorAdd.deleteInputsError(validSelector, popupFormEdit);

  openPopup(popupAdd);
});

// закрытие popup по нажатию на 'крестик'
closePopupButtons.forEach((item) => {
  item.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});

// закрытие popup по нажатию на overlay
popupSelector.forEach((item) => {
  item.addEventListener('click', (evt) => {
    closePopup(evt.target);
  });
});

formPopupEdit.addEventListener('submit', handleEditFormSubmit);
formPopupAdd.addEventListener('submit', handleAddFormSubmit);

export {
  openPopup,
};

/*

import {
  initialCards,
  validSelector,
  popupSelector,
  userName,
  userVocation,
  buttonEdit,
  buttonAdd,
  popupEdit,
  nameInput,
  vocationInput,
  popupAdd,
  closePopupButtons,
  formPopupEdit,
  formPopupAdd,
  placeSection,
  inputPlaceTitle,
  inputPlaceLink,
  viewPlaceCardImage,
  viewPlaceCardName,
  formArray,
  popupFormAdd,
  popupFormEdit,
} from '../scripts/utils/constants.js';

*/