export default class Card {
  constructor(data, cardSelector, { handleCardClick, handleCardLike }) {
    this._link = data.link
    this._name = data.name
    this._id = data._id
    this._likes = data.likes.length
    this._owner = data._owner

    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
    this._handleCardLike = handleCardLike

    this._item = this._getTemplate()
    this.placedImage = this._item.querySelector('.place-card__image')
    this.placedName = this._item.querySelector('.place-card__name')
    this.likedCard = this._item.querySelector('.place-card__like')
    this.likedCardCount = this._item.querySelector('.place-card__like-count')
    this.likedCardActive = 'place-card__like_active'
    this.deletedCard = this._item.querySelector('.place-card__delete')
  }

  // Клонировать элемент карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.place-card').cloneNode(true);

    return cardElement;
  };

  // Создать карточку
  createCard() {
    this.placedImage.src = this._link;
    this.placedName.textContent = this._name;
    this.likedCardCount.textContent = this._likes
    this._setEventListeners();

    return this._item;
  };

  // Навесить слушатели событий
  _setEventListeners() {
    this.likedCard.addEventListener('click', (evt) => {
      this._handleLikeIcon(evt);
    });

    this.deletedCard.addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);
    });

    this.placedImage.addEventListener('click', () => {
      this._handlePreviewPicture();
    });
  };

  // Добавить возможность ставить отметку "Нравится"
  _handleLikeIcon() {
    if (this.likedCard.classList.contains(this.likedCardActive)) {
      this._handleCardLike('DELETE', this._id, this.likedCardCount)
      this.likedCard.classList.remove(this.likedCardActive)
    } else {
      this._handleCardLike('PUT', this._id, this.likedCardCount)
      this.likedCard.classList.add(this.likedCardActive)
    }
  };

  // Добавить возможность удалять карточку
  _handleDeleteCard(evt) {
    evt.target.closest('.place-card').remove();
  };

  // Показать картинку из карточки
  _handlePreviewPicture() {
    this._handleCardClick({
      name: this._name,
      link: this._link
    })
  };
};