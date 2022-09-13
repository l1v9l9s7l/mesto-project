import './pages/index.css';

//import {enableValidation, } from './src/components/validate.js'
import { openPopup, closePopup, page } from './components/modal.js';
import { createCard, addCard } from './components/card.js';
import { enableValidation, toggleButtonState } from './components/validate.js';
import { getInitialCards, getUserInfo, patchUserInfo, changeAvatar } from './components/api.js';
import {renderFormLoading} from './components/utils.js'
import './pages/index.css';

//popups
const popups = document.querySelectorAll('.popup');
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
const editAvatarButton = page.querySelector('.profile__avatar-overlay')
const avatarSaveButton = document.querySelector('.popup__button-save_type_avatar');
const profileSaveButton = document.querySelector('.popup__button-save_type_profile');
const savePhotoButton = document.querySelector('.popup__button-save_type_photo')
//inputs
const profileInfo = page.querySelector('.profile__info');
const profileName = document.querySelector('.popup__input_type_name');
const profileStatus = document.querySelector('.popup__input_type_status');
const picName = document.querySelector('.popup__input_type_picName');
const picHref = document.querySelector('.popup__input_type_picHref');
const cardFormInputs = document.querySelectorAll('.popup__input');
const avatarLink = document.querySelector('#avatar-input')
//profile
const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');
//avatar
const profileAvatarForm = document.querySelector('#form-edit-avatar');
//elements
const elements = page.querySelector('.elements');
//Темплейт
const cardTemplate = document.querySelector('#card-template');
const elementsContainer = page.querySelector('.elements');
const cardTemplateContent = document.querySelector('#card-template').content;
const closePhoto = page.querySelector('.popup__button-close_type_big-picture');
const bigPicturePhoto = popupBigPicture.querySelector('.popup__image');
const cardDescription = popupBigPicture.querySelector('.popup__description');
const myId = {
  id: ''
}
//Открытие/закрытие попапов

//Универсальное закрытие попапов
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup_opened')){
      closePopup(popup)
    };
    if(evt.target.classList.contains('popup__button-close')){
      closePopup(popup)
    };
  });
})

//Открытие попапов
addButton.addEventListener('click', () => {openPopup(popupPhoto); toggleButtonState(cardFormInputs, savePhotoButton,validationSettings)});
editAvatarButton.addEventListener('click', () => {openPopup(popupAvatar), toggleButtonState(cardFormInputs, avatarSaveButton,validationSettings)});
editButton.addEventListener('click', () => {
  profileName.value = profileTitle.textContent;
  profileStatus.value = profileSubtitle.textContent;
  openPopup(popupProfile);
});

//Добавление карточки при срабатывании submit
popupFormPhoto.addEventListener('submit', addCard);

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  inactiveButton:'popup__button-save_inactive'
}

//Валидация
enableValidation(validationSettings)

//Генерация из массива
Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    avatar.src = user.avatar;
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    myId.id = user['_id']
    cards.forEach((card) => {
      const isLike = card.likes.some(like => like._id === myId.id);
      const newCard = createCard(card.name, card.link, card.likes.length, card.owner['_id'], card['_id'], isLike);
      elements.append(newCard);
    });
    return myId;
  })
  .catch(err => {
    console.log(err);
  });

//Прописываю работу кнопки сохранения профиля
popupFormProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();
  editProfile(profileName.value, profileStatus.value);
})

//Изменение профиля
function editProfile(profileTitleValue, profileSubtitleValue) {
  //Вписываю значения свойств из popup
  renderFormLoading(true, profileSaveButton, 'Сохранение...', 'Сохранить')
  patchUserInfo(profileTitleValue, profileSubtitleValue )
  .then(()=>{
    profileTitle.textContent = profileTitleValue;
    profileSubtitle.textContent = profileSubtitleValue ;
    closePopup(popupProfile);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    renderFormLoading(false, profileSaveButton, 'Сохранение...', 'Сохранить');
  })
  return profileInfo;
}

const handleProfileAvatarSubmit = (evt) => {
  renderFormLoading(true, avatarSaveButton, 'Сохранение...', 'Сохранить')
  evt.preventDefault();
  changeAvatar(avatarLink.value)
  .then((res) => { 
    evt.target.reset()
    avatar.src = res.avatar
    closePopup(popupAvatar)
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    renderFormLoading(false, avatarSaveButton, 'Сохранение...', 'Сохранить');
  })
}

profileAvatarForm.addEventListener("submit", handleProfileAvatarSubmit)

export {
  page,
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
  validationSettings,
  myId,
  savePhotoButton,
  elements,
  profileTitle,
  profileSubtitle,
  avatar
}

