/* = ПЕРЕМЕННЫЕ = */

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


/* = ФУНКЦИИ = */

const initialPlaces = () => {
  const initialResults = initialCards.map(createPlace);

  placeSection.append(...initialResults);
};

const openPopup = popup => {
  popup.classList.add('popup_opened');
};

const closePopup = popup => {
  popup.classList.remove('popup_opened');
};

const formEditSubmitHandler = evt => {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userVocation.textContent = vocationInput.value;

  closePopup(popupEdit);
};

const formAddSubmitHandler = evt => {
  evt.preventDefault();

  renderPlace({
    name: inputPlaceTitle.value,
    link: inputPlaceLink.value,
  });

  formPopupAdd.reset();
  closePopup(popupAdd);
};

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

const renderPlace = item => {
  placeSection.prepend(createPlace(item));
};

const handleLikeIcon = (evt) => {
  evt.target.classList.toggle('place-card__like_active');
};

const handleDeleteCard = (evt) => {
  evt.target.closest('.place-card').remove();
}

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

formPopupEdit.addEventListener('submit', formEditSubmitHandler);
formPopupAdd.addEventListener('submit', formAddSubmitHandler);