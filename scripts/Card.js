export class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
  }

  // Клонировать элемент карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector)
      .content.querySelector('.place-card').cloneNode(true);

    return cardElement;
  };


  // Создать карточку


  // Навесить слушатели событий


  // Добавить возможность ставить отметку "Нравится"


  // Добавить возможность удалять карточку



}