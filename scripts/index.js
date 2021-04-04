// import Card from './Card.js';
// import initialCards from './initial-сards.js';

/* = ПЕРЕМЕННЫЕ = */

const popupSelector = document.querySelectorAll('.popup');
const userName = document.querySelector('.user__name');
const userVocation = document.querySelector('.user__vocation');
const buttonEdit = document.querySelector('.user__edit');
const buttonAdd = document.querySelector('.user__add');
const popupEdit = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const vocationInput = document.querySelector('.popup__input_type_vocation');
const popupAdd = document.querySelector('.popup_type_add');
const closePopupButtons = document.querySelectorAll('.popup__button-close');
const formPopupEdit = document.querySelector('.popup__form_type_edit');
const formPopupAdd = document.querySelector('.popup__form_type_add');
const placeSection = document.querySelector('.places__section');
const inputPlaceTitle = formPopupAdd.querySelector('.popup__input_type_title-place');
const inputPlaceLink = formPopupAdd.querySelector('.popup__input_type_link-place');
const popupView = document.querySelector('.popup_type_view');
const viewPlaceCardImage = document.querySelector('.popup__image');
const viewPlaceCardName = document.querySelector('.popup__figcaption');

const formArray = Array.from(document.querySelectorAll(validSelector.formSelector));

const popupFormEdit = document.forms['editUser'];
const inputsSelectorFormEdit = popupFormEdit.querySelectorAll('.popup__input');
const errorInputFormEdit = popupFormEdit.querySelector('.popup__input-error');

const popupFormAdd = document.forms['addPlace'];
const inputsSelectorFormAdd = popupFormAdd.querySelectorAll('.popup__input');
const errorInputFormAdd = popupFormAdd.querySelector('.popup__input-error');
const buttonSubmitFormAdd = popupFormAdd.querySelector('.popup__button-save');

/* = ФУНКЦИИ = */

// инициализация карточек

const initialPlaces = () => {
  const initialResults = initialCards.map(createPlace);

  placeSection.append(...initialResults);
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

// обработать отдельно взятую форму
formArray.forEach((formElement) => {
  const formValidator = new FormValidator(validSelector, formElement);
  formValidator.enableValidation();
});

/* // переписать код
// очистка полей ввода с ошибкой
const deleteInputsError = (inputSelector, popup, inputErrorClass, errorClass) => {
  inputSelector.forEach((item) => {
    hideErrorMessage(popup, item, inputErrorClass, errorClass);
  });
};
*/


/* = ВЫЗОВЫ ФУНКЦИЙ = */

initialPlaces();


/* = ОБРАБОТЧИКИ СОБЫТИЙ = */

buttonEdit.addEventListener('click', () => {
  // popupFormEdit.reset(); // ???
  nameInput.value = userName.textContent;
  vocationInput.value = userVocation.textContent;
  /*
    deleteInputsError(inputsSelectorFormEdit, popupFormEdit,
      `${inputsSelectorFormEdit[0].classList[0]}_type_error`,
      `${errorInputFormEdit.classList[0]}_active`);
  */
  openPopup(popupEdit);
});

buttonAdd.addEventListener('click', () => {

  /*
  deleteInputsError(inputsSelectorFormAdd, popupFormAdd,
    `${inputsSelectorFormAdd[0].classList[0]}_type_error`,
    `${errorInputFormAdd.classList[0]}_active`);


  buttonSubmitFormAdd.classList.add('popup__button-save_invalid');
  buttonSubmitFormAdd.setAttribute('disabled', true)
*/
  popupFormAdd.reset();
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