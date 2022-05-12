let page = document.querySelector('.page');
//popups
let popupProfile = page.querySelector('.popup');
let popupPhoto = page.querySelectorAll('.popup')[1];
let popupBigPicture = page.querySelectorAll('.popup')[2];
//Кнопки
let editButton = page.querySelector('.profile__edit-button');
let popupProfileCloseButton = page.querySelector('.popup__button-close');
let popupProfileSaveButton = page.querySelector('.popup__button-save');
//
let addButton = page.querySelector('.profile__add-button');
let popupPhotoCloseButton = page.querySelectorAll('.popup__button-close')[1];
let popupPhotoSaveButton = page.querySelectorAll('.popup__button-save')[1];
let likeButton = page.querySelector('.element__like');
//inputs
let profileInfo = page.querySelector('.profile__info');
const profileName = document.querySelector('.popup__input_type_name');
const profileStatus = document.querySelector('.popup__input_type_status');
const picName = document.querySelector('.popup__input_type_picName');
const picHref = document.querySelector('.popup__input_type_picHref');
//profile
let profileTitle = profileInfo.querySelector('.profile__title');
let profileSubtitle = profileInfo.querySelector('.profile__subtitle');
//elements
const elements = page.querySelector('.elements');
const element = elements.querySelector('.element');
//Темплейт
const cardTemplate = document.querySelector('#card-template');



//Открытие/закрытие попапа редактирования профиля
function openPOPUPprofile() {
  popupProfile.classList.add('popup_opened');
  profileName.value = profileTitle.innerHTML;
  profileStatus.value = profileSubtitle.innerHTML;
}
function closePOPUPprofile() {
  popupProfile.classList.remove('popup_opened');
}
editButton.addEventListener('click', openPOPUPprofile);
popupProfileCloseButton.addEventListener('click', closePOPUPprofile);

//Открытие/закрытие попапа добавления фото
function openPOPUPphoto() {
  popupPhoto.classList.add('popup_opened');
}
addButton.addEventListener('click', openPOPUPphoto);
function closePOPUPphoto() {
  popupPhoto.classList.remove('popup_opened');
}
popupPhotoCloseButton.addEventListener('click', closePOPUPphoto);

//Открытие/закрытие попапа BigPicture
function openPopupBigPicture() {
  popupBigPicture.classList.add('popup_opened');
}
function closePopupBigPicture() {
  popupBigPicture.classList.remove('popup_opened');
}

//Добавление карточки
function addCard(cardNameValue, cardImageValue) {
  //Объявляю темплейт
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const closePhoto = page.querySelectorAll('.popup__button-close')[2];
  const bigPicturePhoto = popupBigPicture.querySelector('.popup__image');
  const cardDescription = popupBigPicture.querySelector('.popup__description');
  cardElement.querySelector('.element__text').textContent = cardNameValue;
  cardElement.querySelector('.element__image').src = cardImageValue;
  //Открытие/закрытие фото
  cardImage.addEventListener("click", () => {
    bigPicturePhoto.src = cardImageValue;
    cardDescription.textContent = cardNameValue;
    popupBigPicture.classList.add("popup_opened");
  });
  closePhoto.addEventListener("click", () => {
    popupBigPicture.classList.remove("popup_opened");
  });
  //Объявляю like, навешиваю слушатель события
  let addLike = cardElement.querySelector(".element__like");
  addLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_type_active');
  })
  //Добавляю карту в DOM
  let elementsContainer = page.querySelector('.elements');
  elementsContainer.prepend(cardElement);
  //Удаление по нажатию button
  let deleteCardButton = cardElement.querySelector('.element__delete');
  deleteCardButton.addEventListener('click', function() {
    const card = deleteCardButton.closest('.element');
    card.remove();
  });
  return cardElement;
}

//Кнопка сохранения фото, обработчик события
popupPhotoSaveButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  addCard(picName.value, picHref.value);
  picName.value = '';
  picHref.value = '';
  closePOPUPphoto();
});

//Изменение профиля
function editProfile(profileTitleValue, profileSubtitleValue) {
  //Вписываю значения свойств из popup
  let profileTitle = profileInfo.querySelector('.profile__title');
  let profileSubtitle = profileInfo.querySelector('.profile__subtitle');
  profileTitle.textContent = profileTitleValue;
  profileSubtitle.textContent = profileSubtitleValue ;
  return profileInfo;
}
//Прописываю работу кнопки сохранения профиля
popupProfileSaveButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  editProfile(profileName.value, profileStatus.value);
  profileName.value = profileTitle.innerHTML;
  profileStatus.value = profileSubtitle.innerHTML;
  closePOPUPprofile();
})

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
  elements.append(newCard);
})