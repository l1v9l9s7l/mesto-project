const config = {
  baseURL: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '54da0c89-ce48-4884-99bf-abf92ea9ad7d',
    'Content-Type': 'application/json'
  }
}

//Функция проверки ошибки
function checkRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
}

//Функция получения карточек с сервера и применение к ним createCard
function getInitialCards() {
  return fetch(`${config.baseURL}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(checkRes)
}

//Функция получения данных пользователя и вставки их в профиль
function getUserInfo() {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(checkRes)
}

function patchUserInfo(nick, about) {
  return fetch(`${config.baseURL}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: nick,
    about: about
  })
})
.then(res => checkRes(res))
}

function changeAvatar(avatar){
  return fetch(`${config.baseURL}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: avatar
  })
})
.then(res => checkRes(res))
}

//Запрос на удаление карточки
function deleteCard(id){
  fetch(`https://nomoreparties.co/v1/plus-cohort-14/cards/${id}`, {
  method: 'DELETE',
  headers: {
    authorization: '54da0c89-ce48-4884-99bf-abf92ea9ad7d',
    'Content-Type': 'application/json'
  }
})
.then(res => checkRes(res))
}

// Запрос на добавление
function postCard(name, link){
  return fetch('https://nomoreparties.co/v1/plus-cohort-14/cards', {
  method: 'POST',
  headers: {
    authorization: '54da0c89-ce48-4884-99bf-abf92ea9ad7d',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name,
    link: link
  })
})
.then(res => checkRes(res))
}

//Запрос на лайк
function putLike(id){
  return fetch(`https://nomoreparties.co/v1/plus-cohort-14/cards/likes/${id}`, {
  method: 'PUT',
  headers: {
    authorization: '54da0c89-ce48-4884-99bf-abf92ea9ad7d',
    'Content-Type': 'application/json'
  }
})
.then(res => checkRes(res))
}

function deleteLike(id){
  return fetch(`https://nomoreparties.co/v1/plus-cohort-14/cards/likes/${id}`, {
  method: 'DELETE',
  headers: {
    authorization: '54da0c89-ce48-4884-99bf-abf92ea9ad7d',
    'Content-Type': 'application/json'
  }
})
.then(res => checkRes(res))
}


export{
  getInitialCards,
  getUserInfo,
  patchUserInfo,
  changeAvatar,
  deleteCard,
  postCard,
  putLike,
  deleteLike
}