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

/* - - - - - - - - - - */

const userName = document.querySelector('.user__name');
const userVocation = document.querySelector('.user__vocation');
const buttonEdit = document.querySelector('.user__edit');
const buttonAdd = document.querySelector('.user__add');
const popupEdit = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const vocationInput = document.querySelector('.popup__input_type_vocation');
const popupAdd = document.querySelector('.popup_type_add');
const closePopupButton = document.querySelectorAll('.popup__button-close');
const savePopupButton = document.querySelector('.popup__button-save');
const formPopupEdit = document.querySelector('.popup__form_type_edit');
const formPopupAdd = document.querySelector('.popup__form_type_add');

const openPopup = popup => {
  popup.classList.toggle('popup_opened');
};

const closePopup = popup => {
  popup.classList.toggle('popup_opened');
};

const formSubmitHandler = evt => {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userVocation.textContent = vocationInput.value;
  closePopup(popupEdit);
};

buttonEdit.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  vocationInput.value = userVocation.textContent;
  openPopup(popupEdit);
});

buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

closePopupButton.forEach(item => {
  item.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});

formPopupEdit.addEventListener('submit', formSubmitHandler);