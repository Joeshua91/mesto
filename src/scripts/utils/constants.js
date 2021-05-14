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

const popupFormAdd = document.querySelector('.popup__form_type_add')
const popupFormEdit = document.querySelector('.popup__form_type_edit')
const popupFormAvatar = document.querySelector('.popup__form_type_avatar')
const popupFormConfirm = document.querySelector('.popup__form_type_confirm')

const placeTemplate = '.place-template';
const placeSection = '.places__section';
const userName = '.user__name';
const userVocation = '.user__vocation';
const userAvatar = '.user__avatar';
const popupView = '.popup_type_view';
const popuEdit = '.popup_type_edit';
const popupAvatar = '.popup_type_avatar';
const popupAdd = '.popup_type_add';
const popupConfirm = '.popup_type_confirm';

export {
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
}