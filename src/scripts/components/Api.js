export default class Api {
  constructor({ url, headers }) {
    this._url = url
    this._headers = headers
  }

  _fixPromise(res) {
    // проверить, всё ли в порядке с ответом
    if (res.ok) {
      return res.json()
    }
    // если ошибка, то отклонить промис
    return Promise.reject(`Произошла ошибка: ${res.status}`)
  }

  // получить данные пользователя с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._fixPromise(res))
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._fixPromise(res))
  }

  // редактировать профиль
  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${data.name}`,
        about: `${data.vocation}`
      })
    })
      .then(res => this._fixPromise(res))
  }

  // сменить аватар
  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${data.avatar}`
      })
    })
      .then(res => this._fixPromise(res))
  }

  // добавить карточку
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${data.name}`,
        link: `${data.link}`
      })
    })
      .then(res => this._fixPromise(res))
  }

  likedCard(method, id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: method,
      headers: this._headers
    })
      .then(res => this._fixPromise(res))
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._fixPromise(res))
  }
}