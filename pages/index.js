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
  formArray,
  popupFormAdd,
  popupFormEdit,
} from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';


const formValidatorEdit = new FormValidator(validSelector, popupFormEdit);
const formValidatorAdd = new FormValidator(validSelector, popupFormAdd);

const section = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, '.place-template', {
      handleCardClick: (data) => {
        // прописать открытие popup (PopupWithImage)
      }
    })
    const cardElement = card.createCard()
    section.addItem(cardElement)
  }
}, '.places__section')

const renderPlace = () => {
  section.renderItems()
}

renderPlace()


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