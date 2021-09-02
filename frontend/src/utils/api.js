class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;    
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
      headers: this._headers,
      credentials: 'include'              
    })
      .then((result) => {
        return this._checkStatus(result);
      })
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
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
        // authorization: this._token
        'Content-Type': 'application/json'
      },
      credentials: "include",
    })
      .then((result) => {
        return this._checkStatus(result);
      })
  }

  setNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: "include",      
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
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ avatar: avatar })
    })
      .then((result) => {
        return this._checkStatus(result);
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: "include",
    })
      .then((result) => {
        return this._checkStatus(result);
      })
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    })
      .then((result) => {
        return this._checkStatus(result);
      })
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
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
  url: 'https://api.backend-mesto.nomoredomains.club',  
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;



