/* = ПРОВЕРЯЕМ ПУСТЫЕ ЛИ ПОЛЯ ВВОДА = */

const allInputsEmpty = (inputList) => {
  return !inputList.some(inputElement => inputElement.value.length > 0);
};


/* = ФУНКЦИЯ НЕВАЛИДНОГО ПОЛЯ ВВОДА = */

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};


/* = ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ СОСТОЯНИЯ КНОПКИ = */

const setButtonState = (inputList, buttonElement, invalidButtonClass) => {
  // если хотя бы один input невалидный или если есть пустые поля
  if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) {
    // сделать кнопку НЕАКТИВНОЙ
    buttonElement.classList.add(invalidButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
  else {
    // сделать кнопку АКТИВНОЙ
    buttonElement.classList.remove(invalidButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};


/* = ФУНКЦИЯ ПОКАЗА СООБЩЕНИЯ ОБ ОШИБКE = */

const showErrorMessage = (formElement, inputElement, validationMessage,
  inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // ПОКАЗАТЬ сообщение об ошибке
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = validationMessage;
};

/* = ФУНКЦИЯ СКРЫТИЯ СООБЩЕНИЯ ОБ ОШИБКE = */

const hideErrorMessage = (formElement, inputElement,
  inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // УБРАТЬ сообщение об ошибке
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};


/* = ФУНКЦИЯ ПРОВЕРКИ ПОЛЯ ВВОДА НА ВАЛИДНОСТЬ = */

const checkInputValid = (validSelector, formElement, inputElement) => {
  // если поле ввода ВАЛИДНО
  if (inputElement.validity.valid) {
    // СКРЫТЬ сообщение об ошибке
    hideErrorMessage(formElement, inputElement,
      validSelector.inputErrorClass, validSelector.errorClass);
  }
  // если поле ввода НЕВАЛИДНО
  else {
    // ПОКАЗАТЬ сообщение об ошибке
    showErrorMessage(formElement, inputElement, inputElement.validationMessage,
      validSelector.inputErrorClass, validSelector.errorClass);
  }
};


/* = НАВЕШАТЬ ОБРАБОТЧИКИ ПОЛЯМ ВВОДА = */

const setInputListeners = (validSelector, formElement) => {
  // создать массив полей ввода
  const inputList = Array.from(formElement.querySelectorAll(validSelector.inputSelector));
  // найти кнопки submit
  const buttonElement = formElement.querySelector(validSelector.buttonSelector);

  // обработать отдельно взятое поле ввода
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      // проверить состояние поле ввода на валидность
      checkInputValid(validSelector, formElement, inputElement);

      // переключить состояние кнопки submit
      setButtonState(inputList, buttonElement, validSelector.invalidButtonClass);
    });
    // проверить состояние полей
    // и сделать состояние кнопки submit актуальной при загрузке страницы
    setButtonState(inputList, buttonElement, validSelector.invalidButtonClass); // ???
    // почему не работает???
    // почему консоль возвращает значение 'undefined' здесь,
    // а в предыдущем вызове функции всё ok?
    // console.log(setButtonState(inputList, buttonElement, validSelector.invalidButtonClass));
  });
};


/* = ФУНКЦИЯ ВАЛИДАЦИИ ФОРМ = */

const enableValidation = (validSelector) => {
  // создать массив всех форм
  const formList = Array.from(document.querySelectorAll(validSelector.formSelector));

  // обработать отдельно взятую форму
  formList.forEach((formElement) => {
    // отменить дефолтное поведение при 'submit'
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // навесить слушатели для полей формы
    setInputListeners(validSelector, formElement);
  });
};


/* = ВЫЗОВ ФУНКЦИИ ВАЛИДАЦИИ ФОРМ = */

enableValidation({
  formSelector: '.popup__form', // 'селектор формы
  inputSelector: '.popup__input', // селектор инпутов
  buttonSelector: '.popup__button-save', // селектор сабмит-кнопки
  invalidButtonClass: 'popup__button-save_invalid', // класс для отключенной сабмит-кнопки
  inputErrorClass: 'popup__input_type_error', // класс для инпута с ошибкой
  errorClass: 'popup__input-error_active', // класс для самой ошибки под инпутом
});