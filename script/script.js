let showPopupEditButton = document.querySelector('.user__edit'); // кнопка Edit profile
let popup = document.querySelector('.popup'); //
let closePopupButton = document.querySelector('.popup__button-close'); // крестик на popup
let savePopupButton = document.querySelector('.popup__button-save'); // кнопка "Сохранить" на popup

let userName = document.querySelector('.user__name');
let userVocation = document.querySelector('.user__vocation');
let nameInput = document.querySelector('.popup__input_type_name');
let vocationInput = document.querySelector('.popup__input_type_vocation');

let formElement = document.querySelector('.popup__form');

function togglePopup() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    vocationInput.value = userVocation.textContent;
  }
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userVocation.textContent = vocationInput.value;
  togglePopup();
}

showPopupEditButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);