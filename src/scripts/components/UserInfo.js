export default class UserInfo {
  constructor({ userNameSelector, userVocationSelector, userAvatarSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._vocation = document.querySelector(userVocationSelector);
    this._avatar = document.querySelector(userAvatarSelector)
    this._id = 0;
  }

  // вернуть объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      vocation: this._vocation.textContent,
      _id: this._id,
      avatar: this._avatar
    }
  }

  // принять новые данные пользователя и добавить их на страницу
  setUserInfo({ name, vocation, _id, }) {
    this._name.textContent = name
    this._vocation.textContent = vocation
    this._id = _id
  }

  // принять новый аватар и добавить его на страницу
  setUserAvatar({ avatar }) {
    this._avatar.style.backgroundImage = `url(${avatar})`
  }
}