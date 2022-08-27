//import {enableValidation, } from './src/components/validate.js'
import { openPopup, closePopup, page } from './components/modal.js';
import { createCard, addCard } from './components/card.js';
import { enableValidation, toggleButtonState } from './components/validate.js';
import './pages/index.css';


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
//page
// const page = document.querySelector('.page');
//popups
const popup = page.querySelector('.popup')
const popupProfile = page.querySelector('.popup_type_profile');
const popupAvatar = page.querySelector('.popup_type_avatar');
const popupPhoto = page.querySelector('.popup_type_photo');
const popupBigPicture = page.querySelector('.popup_type_big-picture');
//Кнопки
const editButton = page.querySelector('.profile__edit-button');
const popupProfileCloseButton = page.querySelector('.popup__button-close_type_profile');
const popupAvatarCloseButton = page.querySelector('.popup__button-close_type_avatar');
const popupFormProfile = page.querySelector('.popup__form_type_profile');
const addButton = page.querySelector('.profile__add-button');
const popupPhotoCloseButton = page.querySelector('.popup__button-close_type_photo');
const popupFormPhoto = page.querySelector('.popup__form_type_photo');
const avatar = page.querySelector('.profile__avatar')
const savePhotoButton = document.querySelector('.popup__button-save_type_photo')
//inputs
const profileInfo = page.querySelector('.profile__info');
const profileName = document.querySelector('.popup__input_type_name');
const profileStatus = document.querySelector('.popup__input_type_status');
const picName = document.querySelector('.popup__input_type_picName');
const picHref = document.querySelector('.popup__input_type_picHref');
const inputs = document.querySelectorAll('.popup__input');
//profile
const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');
//elements
const elements = page.querySelector('.elements');
//Темплейт
const cardTemplate = document.querySelector('#card-template');
const elementsContainer = page.querySelector('.elements');
const cardTemplateContent = document.querySelector('#card-template').content;
const closePhoto = page.querySelector('.popup__button-close_type_big-picture');
const bigPicturePhoto = popupBigPicture.querySelector('.popup__image');
const cardDescription = popupBigPicture.querySelector('.popup__description');

//Открытие/закрытие попапов
addButton.addEventListener('click', () => {openPopup(popupPhoto); toggleButtonState(inputs, savePhotoButton)});
avatar.addEventListener('click', () => openPopup(popupAvatar));
editButton.addEventListener('click', () => {
profileName.value = profileTitle.textContent;
profileStatus.value = profileSubtitle.textContent;
openPopup(popupProfile);
});
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhoto));
popupAvatarCloseButton.addEventListener('click', () => closePopup(popupAvatar));
closePhoto.addEventListener("click", () => {
  closePopup(popupBigPicture);
});

//Добавление карточки при срабатывании submit
popupFormPhoto.addEventListener('submit', addCard);



//Изменение профиля
function editProfile(profileTitleValue, profileSubtitleValue) {
  //Вписываю значения свойств из popup
  const profileTitle = profileInfo.querySelector('.profile__title');
  const profileSubtitle = profileInfo.querySelector('.profile__subtitle');
  profileTitle.textContent = profileTitleValue;
  profileSubtitle.textContent = profileSubtitleValue ;
  return profileInfo;
}

//Прописываю работу кнопки сохранения профиля
popupFormProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();
  editProfile(profileName.value, profileStatus.value);
  profileName.value = profileTitle.textContent;
  profileStatus.value = profileSubtitle.textContent;
  closePopup(popupProfile);
})

//Валидация
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
})

//Генерация из массива
initialCards.forEach((item) => {
  const newCard = createCard(item.name, item.link);
  elements.append(newCard);
})

//Функция получения карточек с сервера и применение к ним createCard
function getInitialCards() {
  fetch('https://nomoreparties.co/v1/plus-cohort-14/cards', {
    method: 'GET',
    headers: {
      authorization: '54da0c89-ce48-4884-99bf-abf92ea9ad7d'
    }
  })
    .then((res) => {
    return res.json();
  })
  .then((cards) => {
    cards.forEach((card) => {
      const newCard = createCard(card.name, card.link);
      elements.append(newCard);
    });
  });
}

getInitialCards();



export {
  page,
  popup,
  cardTemplateContent,
  picName,
  picHref,
  elementsContainer,
  closePopup,
  bigPicturePhoto,
  cardDescription,
  openPopup,
  popupProfile,
  popupAvatar,
  popupPhoto,
  popupBigPicture,
}

