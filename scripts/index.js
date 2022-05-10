let page = document.querySelector('.page');
//popups
let popupProfile = page.querySelector('.popup');
let popupPhoto = page.querySelectorAll('.popup')[1];
//Кнопки
let editButton = page.querySelector('.profile__edit-button');
let popupProfileCloseButton = page.querySelector('.popup__button-close');
let popupProfileSaveButton = page.querySelector('.popup__button-save');
//
let addButton = page.querySelector('.profile__add-button')
let popupPhotoCloseButton = page.querySelectorAll('.popup__button-close')[1]
let popupPhotoSaveButton = page.querySelectorAll('.popup__button-save')[1];
//
let likeButton = page.querySelector('.element__like')
//inputs
let profileInfo = page.querySelector('.profile__info');
const elements = page.querySelector('.elements')
const element = elements.querySelector('.element')
//Темплейт
const cardTemplate = document.querySelector('#card-template')



//Открытие попапа редактирования профиля
function openPOPUPprofile() {
  popupProfile.classList.add('popup_opened')
}

function closePOPUPprofile() {
  popupProfile.classList.remove('popup_opened')
}

function editPOPUPprofile() {
  
}

editButton.addEventListener('click', openPOPUPprofile);
popupProfileCloseButton.addEventListener('click', closePOPUPprofile);


//Открытие попапа добавления фото

function openPOPUPphoto() {
  popupPhoto.classList.add('popup_opened')
}

function closePOPUPphoto() {
  popupPhoto.classList.remove('popup_opened')
}

function editPOPUPphoto() {
  
}

addButton.addEventListener('click', openPOPUPphoto);
popupPhotoCloseButton.addEventListener('click', closePOPUPphoto);

let savePhotoButton = popupPhoto.querySelector('.popup__button-save')

//Добавление карточки
function addCard(cardNameValue, cardImageValue) {
  //Объявляю темплейт
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  //Вписываю значения свойств из popup
  cardElement.querySelector('.element__text').textContent = cardNameValue;
  cardElement.querySelector('.element__image').src = cardImageValue;
  //Объявляю like, навешиваю слушатель события
  let addLike = cardElement.querySelector(".element__like");
  addLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_type_active');
  });
  //Добавляю карту в DOM
  let elementsContainer = page.querySelector('.elements');
  elementsContainer.prepend(cardElement);
  let deleteCardButton = cardElement.querySelector('.element__delete');
  deleteCardButton.addEventListener('click', function() {
    const card = deleteCardButton.closest('.element')
    card.remove()
  })
}


savePhotoButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  const picName = document.querySelector('.popup__input_type_picName');
  const picHref = document.querySelector('.popup__input_type_picHref');

  addCard(picName.value, picHref.value);

  picName.value = '';
  picHref.value = '';
});



//Удаление карточки

/*let deleteCardButton = element.querySelector('.element__delete');
deleteCardButton.addEventListener('click', deleteCard);
function deleteCard() {
  const card = deleteCardButton.closest('.element');
  card.remove();
}*/

//Карточки по умолчанию

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

initialCards.forEach((item) => {
  const newCard = addCard(item.name, item.link);
  elements.before(newCard);
});

//Редактирование профиля
/*function editProfile(cardNameValue, cardImageValue) {
  cardElement.querySelector('.element__text').textContent = cardNameValue;
  cardElement.querySelector('.element__image').src = cardImageValue;
  
  let elementsContainer = page.querySelector('.elements')
  elementsContainer.prepend(cardElement)
}


savePhotoButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  const picName = document.querySelector('.popup__input_type_picName');
  const picHref = document.querySelector('.popup__input_type_picHref');

  addCard(picName.value, picHref.value);

  picName.value = '';
  picHref.value = '';
});*/