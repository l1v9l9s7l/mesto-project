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
const page = document.querySelector('.page');
//popups
let popupProfile = page.querySelector('.popup_type_profile');
let popupPhoto = page.querySelector('.popup_type_photo');
let popupBigPicture = page.querySelector('.popup_type_big-picture');
//Кнопки
let editButton = page.querySelector('.profile__edit-button');
let popupProfileCloseButton = page.querySelector('.popup__button-close_type_profile');
let popupFormProfile = page.querySelector('.popup__form_type_profile');
let addButton = page.querySelector('.profile__add-button');
let popupPhotoCloseButton = page.querySelector('.popup__button-close_type_photo');
let popupFormPhoto = page.querySelector('.popup__form_type_photo');
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
//Темплейт
const cardTemplate = document.querySelector('#card-template');
let elementsContainer = page.querySelector('.elements');
const cardTemplateContent = document.querySelector('#card-template').content;
const closePhoto = page.querySelector('.popup__button-close_type_big-picture');
const bigPicturePhoto = popupBigPicture.querySelector('.popup__image');
const cardDescription = popupBigPicture.querySelector('.popup__description');

//Открытие/закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  profileName.value = profileTitle.innerHTML;
  profileStatus.value = profileSubtitle.innerHTML;
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

addButton.addEventListener('click', () => openPopup(popupPhoto));
editButton.addEventListener('click', () => openPopup(popupProfile));
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhoto));
closePhoto.addEventListener("click", () => {
  popupBigPicture.classList.remove("popup_opened");
});

//Создание карточки и прослушка событий
function createCard(cardNameValue, cardImageValue) {
  const cardElement = cardTemplateContent.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardElement.querySelector('.element__text').textContent = cardNameValue;
  cardElement.querySelector('.element__image').src = cardImageValue;
  //Открытие/закрытие фото
  cardImage.addEventListener("click", () => {
    bigPicturePhoto.src = cardImageValue;
    cardDescription.textContent = cardNameValue;
    popupBigPicture.classList.add("popup_opened");
  });
  //Объявляю like, навешиваю слушатель события
  let likeAdd = cardElement.querySelector(".element__like");
  likeAdd.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_type_active');
  })
  //Удаление по нажатию button
  let cardButtonDelete = cardElement.querySelector('.element__delete');
  cardButtonDelete.addEventListener('click', function() {
    const card = cardButtonDelete.closest('.element');
    card.remove();
  });
  return cardElement;
}

//Добавление карточки
function addCard(evt) {
  evt.preventDefault();
  const newCard = createCard(picName.value, picHref.value);
  elementsContainer.prepend(newCard);
  picName.value = '';
  picHref.value = '';
  closePopup(popupPhoto);
};

//Добавление карточки при срабатывании submit
popupFormPhoto.addEventListener('submit', addCard);

//Генерация из массива
initialCards.forEach((item) => {
  const newCard = createCard(item.name, item.link);
  elements.append(newCard);
})

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
popupFormProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();
  editProfile(profileName.value, profileStatus.value);
  profileName.value = profileTitle.textContent;
  profileStatus.value = profileSubtitle.textContent;
  closePopup(popupProfile);
})