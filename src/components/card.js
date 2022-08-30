import {cardTemplateContent, picName, picHref, elementsContainer, closePopup, bigPicturePhoto, cardDescription, openPopup} from '../index.js'
const page = document.querySelector('.page');
const popupPhoto = page.querySelector('.popup_type_photo');
const popupProfile = page.querySelector('.popup_type_profile');
const popupBigPicture = page.querySelector('.popup_type_big-picture');

//Создание карточки и прослушка событий
function createCard(cardNameValue, cardImageValue) {
  const cardElement = cardTemplateContent.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardElement.querySelector('.element__text').textContent = cardNameValue;
  cardElement.querySelector('.element__image').src = cardImageValue;
  cardElement.querySelector('.element__image').alt = cardNameValue;
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
    evt.target.classList.toggle('element__like_type_active');
  })
  //Удаление по нажатию button
  const cardButtonDelete = cardElement.querySelector('.element__delete');
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
  closePopup(popupPhoto);
  evt.target.reset() //Очистка полей формы
};

export {
  createCard,
  addCard
}