const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
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

const buttonEdit = document.querySelector('.user__edit');
const buttonAdd = document.querySelector('.user__add');
const buttonAvatar = document.querySelector('.user__edit-avatar')
const nameInput = document.querySelector('.popup__input_type_name');
const vocationInput = document.querySelector('.popup__input_type_vocation');
const popupFormAdd = document.forms['addPlace'];
const popupFormEdit = document.forms['editUser'];
const popupFormAvatar = document.forms['editAvatar'];

const placeTemplate = '.place-template';
const placeSection = '.places__section';
const userName = '.user__name';
const userVocation = '.user__vocation';
const userAvatar = '.user__avatar';
const popupView = '.popup_type_view';

export {
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
}