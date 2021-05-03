export default class Api {
  constructor({ url, headers }) {
    this._url = url
    this._headers = headers
  }

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
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

}

/*
.then(res => res.json())
  .then((result) => {
    console.log(result);
  })
*/