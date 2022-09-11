import {cardTemplateContent, picName, picHref, elementsContainer, closePopup, bigPicturePhoto, cardDescription, openPopup, myId,savePhotoButton,renderFormLoading} from '../index.js'
const page = document.querySelector('.page');
const popupPhoto = page.querySelector('.popup_type_photo');
const popupProfile = page.querySelector('.popup_type_profile');
const popupBigPicture = page.querySelector('.popup_type_big-picture');


//Создание карточки и прослушка событий
function createCard(cardNameValue, cardImageValue, likeNumber, cardOwner, cardId, isLike) {
  const cardElement = cardTemplateContent.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardLike = cardElement.querySelector('.element__like');
  cardElement.querySelector('.element__text').textContent = cardNameValue;
  cardElement.querySelector('.element__like-number').textContent = likeNumber;
  cardElement.querySelector('.element__image').src = cardImageValue;
  cardElement.querySelector('.element__image').alt = cardNameValue;
  cardElement.querySelector('.element__id').textContent = cardId;
  //Открытие/закрытие фото
  cardImage.addEventListener("click", () => {
    bigPicturePhoto.src = cardImageValue;
    bigPicturePhoto.alt = cardNameValue;
    cardDescription.textContent = cardNameValue;
    openPopup(popupBigPicture);
  });
  //Объявляю like, навешиваю слушатель события
  const likeAdd = cardElement.querySelector(".element__like");

  likeAdd.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('element__like_type_active')){
      deleteLike(cardId)
      evt.target.classList.remove('element__like_type_active');
    } else
    putLike(cardId)
    evt.target.classList.add('element__like_type_active');
  })

  //Удаление по нажатию button
  const cardButtonDelete = cardElement.querySelector('.element__delete');
  cardButtonDelete.addEventListener('click', function() {
    const card = cardButtonDelete.closest('.element');
    deleteCard(cardId)
    card.remove();
  });
  //Деактивация кнопки удаления на чужих постах
  if(myId !== cardOwner){
    cardButtonDelete.classList.add('element__delete_inactive')
  }


  //Отображение своего ранее нажатого лайка

  if(isLike) {
    cardLike.classList.add('element__like_type_active')
  }
  
  return cardElement;
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
.then((res) => {
  return res.json();
})
}

// Запрос на добавление
function postCard(name, link){
  fetch('https://nomoreparties.co/v1/plus-cohort-14/cards', {
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
.then((res) => {
  return res.json();
})
}

//Добавление карточки
function addCard(evt) {
  evt.preventDefault();
  renderFormLoading(true, savePhotoButton)
  const newCard = createCard(picName.value, picHref.value);
  elementsContainer.prepend(newCard);
  closePopup(popupPhoto);
  postCard(picName.value, picHref.value);
  evt.target.reset() //Очистка полей формы
};

//Запрос на лайк
function putLike(id){
  fetch(`https://nomoreparties.co/v1/plus-cohort-14/cards/likes/${id}`, {
  method: 'PUT',
  headers: {
    authorization: '54da0c89-ce48-4884-99bf-abf92ea9ad7d',
    'Content-Type': 'application/json'
  }
})
}

function deleteLike(id){
  fetch(`https://nomoreparties.co/v1/plus-cohort-14/cards/likes/${id}`, {
  method: 'DELETE',
  headers: {
    authorization: '54da0c89-ce48-4884-99bf-abf92ea9ad7d',
    'Content-Type': 'application/json'
  }
})
}

function uploadLike(id){
  fetch(`https://nomoreparties.co/v1/plus-cohort-14/cards`, {
  method: 'GET',
  headers: {
    authorization: '54da0c89-ce48-4884-99bf-abf92ea9ad7d',
  }
})
  .then((res) => {
    return res.json();
  })
  .then((cards) => {
    cards.forEach((card) => {
      console.log(card['likes'].length)
    });
  })
}

export {
  createCard,
  addCard
}