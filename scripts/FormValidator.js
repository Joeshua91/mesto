export const validSelector = {
  formSelector: '.popup__form', // 'селектор формы
  inputSelector: '.popup__input', // селектор инпутов
  buttonSelector: '.popup__button-save', // селектор сабмит-кнопки
  invalidButtonClass: 'popup__button-save_invalid', // класс для отключенной сабмит-кнопки
  inputErrorClass: 'popup__input_type_error', // класс для инпута с ошибкой
  errorClass: 'popup__input-error_active', // класс для самой ошибки под инпутом
};

export class FormValidator {
  constructor(validSelector, formElement) {
    this._formSelector = validSelector.formSelector;
    this._inputSelector = validSelector.inputSelector;
    this._buttonSelector = validSelector.buttonSelector;
    this._invalidButtonClass = validSelector.invalidButtonClass;
    this._inputErrorClass = validSelector.inputErrorClass;
    this._errorClass = validSelector.errorClass;

    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector)); // массив полей ввода
    this._buttonElement = formElement.querySelector(this._buttonSelector); // кнопки submit
  };

  /* = ФУНКЦИЯ ВАЛИДАЦИИ ФОРМ = */
  enableValidation() {
    // отменить дефолтное поведение при 'submit'
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    // навесить слушатели для полей формы
    this._setEventListeners();
  };

  /* = НАВЕСИТЬ ОБРАБОТЧИКИ ПОЛЯМ ВВОДА = */

  _setEventListeners() {
    // обработать отдельно взятое поле ввода
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // проверить состояние поле ввода на валидность
        this._checkInputValid(inputElement);
        // переключить состояние кнопки submit
        this._setButtonState(this._inputList, this._buttonElement);
      });
      // проверить состояние полей
      // и сделать состояние кнопки submit актуальной при загрузке страницы
      this._setButtonState(this._inputList, this._buttonElement);
    });
  };

  /* = ФУНКЦИЯ ПРОВЕРКИ ПОЛЯ ВВОДА НА ВАЛИДНОСТЬ = */
  _checkInputValid(inputElement) {
    // если поле ввода ВАЛИДНО
    if (inputElement.validity.valid) {
      // СКРЫТЬ сообщение об ошибке
      this._hideErrorMessage(inputElement);
    }
    // если поле ввода НЕВАЛИДНО
    else {
      // ПОКАЗАТЬ сообщение об ошибке
      this._showErrorMessage(inputElement, inputElement.validationMessage);
    }
  };

  /* = ФУНКЦИЯ СКРЫТИЯ СООБЩЕНИЯ ОБ ОШИБКE = */
  _hideErrorMessage(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    // СКРЫТЬ сообщение об ошибке
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  /* = ФУНКЦИЯ ПОКАЗА СООБЩЕНИЯ ОБ ОШИБКE = */
  _showErrorMessage(inputElement, validationMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    // ПОКАЗАТЬ сообщение об ошибке
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = validationMessage;
  };

  /* = ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ СОСТОЯНИЯ КНОПКИ = */
  _setButtonState(inputList, buttonElement) {
    // если хотя бы один input невалидный |или| есть пустые поля
    if (this._hasInvalidInput(inputList) || this._allInputsEmpty(inputList)) {
      // сделать кнопку НЕАКТИВНОЙ
      this._buttonElement.classList.add(this._invalidButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    }
    else {
      // сделать кнопку АКТИВНОЙ
      this._buttonElement.classList.remove(this._invalidButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  };

  /* = ФУНКЦИЯ НЕВАЛИДНОГО ПОЛЯ ВВОДА = */
  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  };

  /* = ПРОВЕРИТЬ ПУСТЫЕ ЛИ ПОЛЯ ВВОДА = */
  _allInputsEmpty(inputList) {
    return !inputList.some(inputElement => inputElement.value.length > 0);
  };

  /* = ФУНКЦИЯ ОЧИСТКИ ПОЛЕЙ ВВОДА С ОШИБКОЙ = */
  deleteInputsError() {
    // сделать кнопку НЕАКТИВНОЙ
    this._buttonElement.classList.add(this._invalidButtonClass);
    this._buttonElement.setAttribute('disabled', true);

    this._inputList.forEach((inputElement) => {
      this._hideErrorMessage(inputElement);
    });
  };
};