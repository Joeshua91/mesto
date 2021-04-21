export default class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // Клонировать элемент карточки
  _getTemplate = () => {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.place-card').cloneNode(true);

    return cardElement;
  };

  // Создать карточку
  createCard = () => {
    this._item = this._getTemplate();

    this._item.querySelector('.place-card__image').src = this._link;
    this._item.querySelector('.place-card__image').alt = this._name;
    this._item.querySelector('.place-card__name').textContent = this._name;

    this._setEventListeners();

    return this._item;
  };

  // Навесить слушатели событий
  _setEventListeners = () => {
    this._item.querySelector('.place-card__like').addEventListener('click', (evt) => {
      this._handleLikeIcon(evt);
    });

    this._item.querySelector('.place-card__delete').addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);
    });

    this._item.querySelector('.place-card__image').addEventListener('click', () => {
      this._handlePreviewPicture();
    });
  };

  // Добавить возможность ставить отметку "Нравится"
  _handleLikeIcon = (evt) => {
    evt.target.classList.toggle('place-card__like_active');
  };

  // Добавить возможность удалять карточку
  _handleDeleteCard = (evt) => {
    evt.target.closest('.place-card').remove();
  };

  // Показать картинку из карточки
  _handlePreviewPicture = () => {
    this._handleCardClick({
      name: this._name,
      link: this._link
    })
  };
};