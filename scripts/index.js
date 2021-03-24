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
const templatePlaceCard = document.querySelector('.place-template');
const inputPlaceTitle = formPopupAdd.querySelector('.popup__input_type_title-place');
const inputPlaceLink = formPopupAdd.querySelector('.popup__input_type_link-place');
const popupView = document.querySelector('.popup_type_view');
const viewPlaceCardImage = document.querySelector('.popup__image');
const viewPlaceCardName = document.querySelector('.popup__figcaption');
//const errorInput = document.querySelector('.popup__input-error');
//const errorInputActive = document.querySelector('.popup__input-error_active');


/* = ФУНКЦИИ = */

// инициализация карточек
const initialPlaces = () => {
  const initialResults = initialCards.map(createPlace);

  placeSection.append(...initialResults);
};

// открытие popup
const openPopup = popup => {
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
const handleEditFormSubmit = evt => {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userVocation.textContent = vocationInput.value;

  closePopup(popupEdit);
};

// добавление карточки
const handleAddFormSubmit = evt => {
  evt.preventDefault();

  renderPlace({
    name: inputPlaceTitle.value,
    link: inputPlaceLink.value,
  });

  formPopupAdd.reset();
  closePopup(popupAdd);
};

// создание карточки
const createPlace = item => {
  const placeCard = templatePlaceCard.content.cloneNode(true);
  const placeCardImage = placeCard.querySelector('.place-card__image');
  const placeCardName = placeCard.querySelector('.place-card__name');
  const placeCardLike = placeCard.querySelector('.place-card__like');
  const placeCardDelete = placeCard.querySelector('.place-card__delete');

  placeCardImage.src = item.link;
  placeCardName.textContent = item.name;
  placeCardImage.alt = placeCardName.textContent;
  placeCardLike.addEventListener('click', handleLikeIcon);
  placeCardDelete.addEventListener('click', handleDeleteCard);
  placeCardImage.addEventListener('click', () => {
    handlePreviewPicture(item);
  });

  return placeCard;
};

// рендеринг карточек
const renderPlace = item => {
  placeSection.prepend(createPlace(item));
};

// активация 'лайка'
const handleLikeIcon = (evt) => {
  evt.target.classList.toggle('place-card__like_active');
};

// удаление карточки
const handleDeleteCard = (evt) => {
  evt.target.closest('.place-card').remove();
}

// показ картинки из карточки
const handlePreviewPicture = item => {
  viewPlaceCardImage.src = item.link;
  viewPlaceCardImage.alt = item.name;
  viewPlaceCardName.textContent = item.name;

  openPopup(popupView);
}


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

closePopupButtons.forEach(item => {
  item.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});

// закрытие popup по нажатию на overlay
popupSelector.forEach(item => {
  item.addEventListener('click', (evt) => {
    closePopup(evt.target);
  });
});

formPopupEdit.addEventListener('submit', handleEditFormSubmit);
formPopupAdd.addEventListener('submit', handleAddFormSubmit);