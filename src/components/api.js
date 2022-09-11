
import {myId,elements, profileTitle, profileSubtitle, avatar} from "../index.js";
import {createCard} from "./card.js";

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
  fetch(`${config.baseURL}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then((res) => {
    return res.json();
  })
  .then((cards) => {
    console.log(cards)
    cards.forEach((card) => {
      const isLike = card.likes.some(like => like._id === myId.id);
      const newCard = createCard(card.name, card.link, card.likes.length, card.owner['_id'], card['_id'], isLike);
      elements.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}

//Функция получения данных пользователя и вставки их в профиль
function getUserInfo() {
  fetch(`${config.baseURL}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then((res) => {
    return res.json();
  })
  .then((user) => {
      profileTitle.textContent = user.name;
      profileSubtitle.textContent = user.about ;
      avatar.src = user.avatar;
      myId.id = user['_id']
      console.log(user)
      return myId;
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}

function patchUserInfo(nick, about) {
  fetch(`${config.baseURL}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: nick,
    about: about
  })
})
.then((res) => {
  checkRes(res)
})
.catch((err) => {
  console.log(err); // выводим ошибку в консоль
}); 
}

function changeAvatar(avatar){
  fetch(`${config.baseURL}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: avatar
  })
})
.then(res => checkRes(res))
.catch((err) => {
  console.log(err); // выводим ошибку в консоль
}); 
}



export{
  getInitialCards,
  getUserInfo,
  patchUserInfo,
  changeAvatar
}