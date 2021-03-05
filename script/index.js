/* МАССИВЫ */

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

const placeSection = document.querySelector('.places__section');

function renderPlace() {
  const result = initialCards.map(function (item) {
    return `
      <li class="place-card">
        <img class="place-card__image" src="${item.link}" alt="${item.name}">
        <div class="place-card__wrapper">
          <h2 class="place-card__name">${item.name}</h2>
          <button class="place-card__like" type="button" aria-label="like"></button>
        </div>
      </li>
    `
  }).join('');

  placeSection.insertAdjacentHTML('afterbegin', result)
}

renderPlace();

/* ПЕРЕМЕННЫЕ */

const showPopupEditButton = document.querySelector('.user__edit'); // кнопка Edit profile
const popupEdit = document.querySelector('.popup_type_edit'); // popup Edit

const closePopupButton = document.querySelector('.popup__button-close'); // крестик на popup
const savePopupButton = document.querySelector('.popup__button-save'); // кнопка "Сохранить" на popup

const userName = document.querySelector('.user__name');
const userVocation = document.querySelector('.user__vocation');
const nameInput = document.querySelector('.popup__input_type_name');
const vocationInput = document.querySelector('.popup__input_type_vocation');

const formElement = document.querySelector('.popup__form');

/* ФУНКЦИИ */

function togglePopupEdit() {
  if (!popupEdit.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    vocationInput.value = userVocation.textContent;
  }
  popupEdit.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userVocation.textContent = vocationInput.value;
  togglePopupEdit();
}

/* ОБРАБОТЧИКИ СОБЫТИЙ */
showPopupEditButton.addEventListener('click', togglePopupEdit);
closePopupButton.addEventListener('click', togglePopupEdit);
formElement.addEventListener('submit', formSubmitHandler);


/* - - - - - - - - - - */
/*
const showPopupAddButton = document.querySelector('.user__add'); // кнопка Add profile
const popupAdd = document.querySelector('.popup_type_add'); // popup Add

function togglePopupAdd() {
  popupAdd.classList.toggle('popup_opened');
}

showPopupAddButton.addEventListener('click', togglePopupAdd);
closePopupButton.addEventListener('click', togglePopupAdd);

*/

// переделать всё
// popup переписать с модификаторами,
// иначе открываются оба попапа
