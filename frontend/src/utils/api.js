class Api {
  constructor({ url, token }) {
    this._url = url;
    this._token = token;
  }

  _checkStatus(result) {
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(`Ошибка: ${result.status}`)
    }
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then((result) => {
        return this._checkStatus(result);
      })
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, about
      })
    })
      .then((result) => {
        return this._checkStatus(result);
      })
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then((result) => {
        return this._checkStatus(result);
      })
  }

  setNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((result) => {
        return this._checkStatus(result);
      })
  }

  updateAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar: avatar })
    })
      .then((result) => {
        return this._checkStatus(result);
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
      .then((result) => {
        return this._checkStatus(result);
      })
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
      .then((result) => {
        return this._checkStatus(result);
      })
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
      .then((result) => {
        return this._checkStatus(result);
      })
  }

  like(cardId, isLiked) {
    return isLiked ? this.removeLike(cardId) : this.addLike(cardId);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: '8c6e6a0b-c97b-41fa-9ce9-e79b26e708e8'
});

export default api;



