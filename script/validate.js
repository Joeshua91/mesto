/* = ПРОВЕРЯЕМ ПУСТЫЕ ЛИ ПОЛЯ ВВОДА = */
const allInputsEmpty = (inputList) => {
  return !inputList.some(inputElement => inputElement.value.length > 0);
};

/* = ФУНКЦИЯ НЕВАЛИДНОГО ПОЛЯ ВВОДА = */
const hasInvalidInput = (inputList) => {
  return !inputList.some(inputElement => inputElement.validity.valid);
};

/* = ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ СОСТОЯНИЯ КНОПКИ = */
const toogleButtonState = (inputList, buttonElement) => {
  // если хотя бы один input невалидный или если есть пустые поля
  if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) {
    // делаем кнопку НЕАКТИВНОЙ
    buttonElement.classList.add('popup__button-save_invalid');
    buttonElement.setAttribute('disabled', true);
  }
  else {
    // иначе делаем кнопку АКТИВНОЙ
    buttonElement.classList.remove('popup__button-save_invalid');
    buttonElement.removeAttribute('disabled');
  }
};

/* = ФУНКЦИЯ ПОКАЗА ОШИБКИ = */
const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // показываем ошибку
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add('popup__input-error_active');
};

/* = УБИРАЕМ ПОКАЗ ОБ ОШИБКE = */
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // убираем показ ошибки
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
};

/* = ФУНКЦИЯ ПРОВЕРКИ ПОЛЯ ВВОДА НА ВАЛИДНОСТЬ = */
const checkInput = (formElement, inputElement) => {
  // если поле ввода ВАЛИДНО
  if (inputElement.validity.valid) {
    // УБИРАЕМ сообщение об ошибке
    hideInputError(formElement, inputElement);
  }
  // если поле ввода НЕВАЛИДНО
  else {
    // ПОКАЗЫВАЕМ сообщение об ошибке
    showInputError(formElement, inputElement);
  }
};

/* = НАВЕШИВАЕМ ОБРАБОТЧИКИ ПОЛЯМ ВВОДА = */
const setInputListeners = (formElement) => {
  // массив полей ввода
  const inputList = Array.from(
    formElement.querySelectorAll('.popup__input')
  );

  // кнопка submit
  const buttonElement = formElement.querySelector('.popup__button-save');

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      // проверяем состояние поля на валидность
      checkInput(formElement, inputElement);
      // переключаем состояние кнопки submit
      toogleButtonState(inputList, buttonElement);
    });

    toogleButtonState(inputList, buttonElement);
  });
};

/* = ФУНКЦИЯ ВАЛИДАЦИИ ФОРМ = */
const enableValidation = () => {
  // массив всех форм
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    // слушатель для полей формы
    setInputListeners(formElement);
  }
  )
};

enableValidation(
  /*
  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button-save',
  invalidButtonClass: 'popup__button-save_invalid'
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}
*/
);