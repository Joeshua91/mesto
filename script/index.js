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
const popupView = document.querySelector('.popup_type_view');


/* = ФУНКЦИИ = */

const initialPlaces = () => {
  const initialResult = initialCards.map(createPlace);

  placeSection.append(...initialResult);
};

const togglePopup = popup => {
  popup.classList.toggle('popup_opened');
};

const formEditSubmitHandler = e => {
  e.preventDefault();

  userName.textContent = nameInput.value;
  userVocation.textContent = vocationInput.value;

  togglePopup(popupEdit);
};

const formAddSubmitHandler = e => {
  e.preventDefault();

  const addPlace = {
    name: '',
    link: '',
  };

  addPlace.name = inputPlaceTitle.value;
  addPlace.link = inputPlaceLink.value;

  renderPlace(addPlace);
  togglePopup(popupAdd);
};

const createPlace = i => {
  const placeCard = templatePlaceCard.content.cloneNode(true);
  const placeCardImage = placeCard.querySelector('.place-card__image');
  const placeCardName = placeCard.querySelector('.place-card__name');
  const placeCardLike = placeCard.querySelector('.place-card__like');
  const placeCardDelete = placeCard.querySelector('.place-card__delete');

  placeCardImage.src = i.link;
  placeCardName.textContent = i.name;
  placeCardImage.alt = placeCardName.textContent;
  placeCardLike.addEventListener('click', likeHandler);
  placeCardDelete.addEventListener('click', deleteHandler);
  placeCardImage.addEventListener('click', () => {
    viewPlaceCard(i);
  });

  return placeCard;
};

const renderPlace = i => {
  placeSection.prepend(createPlace(i));
};

const likeHandler = (e) => {
  e.target.classList.toggle('place-card__like_active');
};

const deleteHandler = (e) => {
  e.target.parentElement.remove();
}

const viewPlaceCard = i => {
  const viewPlaceCardImage = document.querySelector('.popup__image');
  const viewPlaceCardName = document.querySelector('.popup__figcaption');

  viewPlaceCardImage.src = i.link;
  viewPlaceCardImage.alt = i.name;
  viewPlaceCardName.textContent = i.name;

  togglePopup(popupView);
}


/* = ВЫЗОВЫ ФУНКЦИЙ = */

initialPlaces();


/* = ОБРАБОТЧИКИ СОБЫТИЙ = */

buttonEdit.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  vocationInput.value = userVocation.textContent;

  togglePopup(popupEdit);
});

buttonAdd.addEventListener('click', () => {
  togglePopup(popupAdd);
});

closePopupButton.forEach(i => {
  i.addEventListener('click', (e) => {
    togglePopup(e.target.closest('.popup'));
  });
});

formPopupEdit.addEventListener('submit', formEditSubmitHandler);
formPopupAdd.addEventListener('submit', formAddSubmitHandler);