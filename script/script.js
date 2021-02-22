/* объявляем переменные */

let showPopupEditButton = document.querySelector('#button-edit'); // кнопка Edit profile
let popup = document.querySelector('.popup'); //
let closePopupButton = document.querySelector('.popup__button-close'); // крестик на popup
let savePopupButton = document.querySelector('.popup__button-save'); // кнопка "Сохранить" на popup


/* функция вызова popup */

function togglePopup(event) {
  popup.classList.toggle('popup_opened');
}

/* считыватели открытия и закрытия popup */

showPopupEditButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);
savePopupButton.addEventListener('click', togglePopup);

let userName = document.querySelector('.user__name');
let userVocation = document.querySelector('.user__vocation');
let nameInput = document.querySelector('.popup__input_type_name');
let vocationInput = document.querySelector('.popup__input_type_vocation');

/* заполнение value в форме */
nameInput.value = userName.textContent;
vocationInput.value = userVocation.textContent;

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

/* Обработчик «отправки» формы */
function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userVocation.textContent = vocationInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);