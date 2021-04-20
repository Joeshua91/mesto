const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validSelector = {
  formSelector: '.popup__form', // 'селектор формы
  inputSelector: '.popup__input', // селектор инпутов
  buttonSelector: '.popup__button-save', // селектор сабмит-кнопки
  invalidButtonClass: 'popup__button-save_invalid', // класс для отключенной сабмит-кнопки
  inputErrorClass: 'popup__input_type_error', // класс для инпута с ошибкой
  errorClass: 'popup__input-error_active', // класс для самой ошибки под инпутом
};

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
// const popupView = '.popup_type_view';
// const viewPlaceCardImage = document.querySelector('.popup__image');
// const viewPlaceCardName = document.querySelector('.popup__figcaption');
const formArray = Array.from(document.querySelectorAll(validSelector.formSelector));
const popupFormAdd = document.forms['addPlace'];
const popupFormEdit = document.forms['editUser'];

export {
  initialCards,
  validSelector,
  popupFormAdd,
  popupFormEdit,
}