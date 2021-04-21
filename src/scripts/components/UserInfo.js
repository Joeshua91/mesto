export default class UserInfo {
  constructor({ userNameSelector, userVocationSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._vocation = document.querySelector(userVocationSelector);
  }

  // вернуть объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      vocation: this._vocation.textContent
    }
  }

  // принять новые данные пользователя и добавить их на страницу
  setUserInfo({ name, vocation }) {
    this._name.textContent = name
    this._vocation.textContent = vocation
  }
}