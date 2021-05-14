export default class Card {
  constructor(data, cardSelector, { handleCardClick, handleCardLike, handleCardDelete },
    //popupWithFormConfirm,
    userInfo) {
    this._link = data.link
    this._name = data.name
    this._id = data._id
    this._likes = data.likes
    this._owner = data.owner

    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
    this._handleCardLike = handleCardLike
    this._handleCardDelete = handleCardDelete

    this._item = this._getTemplate()
    this._placedImage = this._item.querySelector('.place-card__image')
    this._placedName = this._item.querySelector('.place-card__name')
    this._likedCard = this._item.querySelector('.place-card__like')
    this._likedCardCount = this._item.querySelector('.place-card__like-count')
    this._likedCardActive = 'place-card__like_active'
    this._deletedCard = this._item.querySelector('.place-card__delete')

    //this._popupWithFormConfirm = popupWithFormConfirm
    this._userId = userInfo
  }

  // Клонировать элемент карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.place-card').cloneNode(true);

    return cardElement;
  };

  // Создать карточку
  createCard() {
    this._placedImage.src = this._link;
    this._placedName.textContent = this._name;
    this._likedCardCount.textContent = this._likes.length
    this._setEventListeners();

    if (this._owner._id != this._userId) {
      this._deletedCard.remove()
    }

    if (this._likes.filter(item => item._id === this._userId).length > 0) {
      this._likedCard.classList.add(this._likedCardActive)
    }

    return this._item;
  };

  // Навесить слушатели событий
  _setEventListeners() {
    this._likedCard.addEventListener('click', () => {
      this._handleLikeIcon();
    });

    this._deletedCard.addEventListener('click', () => {
      this._handleCardDelete({
        item: this._item,
        id: this._id
      });
    });

    this._placedImage.addEventListener('click', () => {
      this._handlePreviewPicture();
    });
  };

  // Добавить возможность ставить отметку "Нравится"
  _handleLikeIcon() {
    if (this._likedCard.classList.contains(this._likedCardActive)) {
      this._handleCardLike(this._id, this._likedCardCount)
    } else {
      this._handleCardLike(this._id, this._likedCardCount)
    }
  };

  removeLike() {
    this._likedCard.classList.remove(this._likedCardActive)
  }

  addLike() {
    this._likedCard.classList.add(this._likedCardActive)
  }

  countLike(data) {
    this._likedCardCount.textContent = data.likes.length
  }

  // Добавить возможность удалять карточку
  /*
  _handleDeleteCard(popup) {
    popup.open({
      item: this._item,
      id: this._id
    })
  };
*/

  // Показать картинку из карточки
  _handlePreviewPicture() {
    this._handleCardClick({
      name: this._name,
      link: this._link
    })
  };
};