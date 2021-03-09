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

/* - - - - - - - - - - */

/* = ПЕРЕМЕННЫЕ = */

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
const placeSection = document.querySelector('.places__section');
const templatePlaceCard = document.querySelector('.place-template');
const inputPlaceTitle = formPopupAdd.querySelector('.popup__input_type_title-place');
const inputPlaceLink = formPopupAdd.querySelector('.popup__input_type_link-place');


/* = ФУНКЦИИ = */

const initialPlaces = () => {
  const initialResult = initialCards.map(createPlace);
  placeSection.append(...initialResult);
};

const openPopup = popup => {
  popup.classList.toggle('popup_opened');
};

const closePopup = popup => {
  popup.classList.toggle('popup_opened');
};

const formEditSubmitHandler = event => {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userVocation.textContent = vocationInput.value;
  closePopup(popupEdit);
};

const formAddSubmitHandler = event => {
  event.preventDefault();
  const addPlace = {
    name: '',
    link: '',
  };

  addPlace.name = inputPlaceTitle.value;
  addPlace.link = inputPlaceLink.value;

  renderPlace(addPlace);
  closePopup(popupAdd);
};

const createPlace = item => {
  const placeCard = templatePlaceCard.content.cloneNode(true);
  const placeCardImage = placeCard.querySelector('.place-card__image');
  const placeCardName = placeCard.querySelector('.place-card__name');
  const placeCardLike = placeCard.querySelector('.place-card__like');
  placeCardImage.src = item.link;
  placeCardName.textContent = item.name;
  placeCardImage.alt = placeCardName.textContent;
  placeCardLike.addEventListener('click', likeHandler);

  return placeCard;
};

const renderPlace = item => {
  placeSection.prepend(createPlace(item));
};

const likeHandler = (event) => {
  event.target.classList.toggle('place-card__like_active');
};


/* = ВЫЗОВЫ ФУНКЦИЙ = */

initialPlaces();


/* = ОБРАБОТЧИКИ СОБЫТИЙ = */

buttonEdit.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  vocationInput.value = userVocation.textContent;
  openPopup(popupEdit);
});

buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

closePopupButton.forEach(item => {
  item.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
});

formPopupEdit.addEventListener('submit', formEditSubmitHandler);
formPopupAdd.addEventListener('submit', formAddSubmitHandler);