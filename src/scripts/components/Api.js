// import { data } from "autoprefixer"

export default class Api {
  constructor({ url, headers }) {
    this._url = url
    this._headers = headers
  }

  // получить данные пользователя с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        // проверить, всё ли в порядке с ответом
        if (res.ok) {
          return res.json()
        }
        // если ошибка, то отклонить промис
        return Promise.reject(`Произошла ошибка: ${res.status}`)
      })
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Произошла ошибка: ${res.status}`)
      })
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
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Произошла ошибка: ${res.status}`)
      })
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
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Произошла ошибка: ${res.status}`)
      })
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
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Произошла ошибка: ${res.status}`)
      })
  }

  likedCard(method, id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: method,
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Произошла ошибка: ${res.status}`)
    })
  }

}