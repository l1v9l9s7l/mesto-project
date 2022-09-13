import {cardTemplateContent, picName, picHref, elementsContainer, closePopup, bigPicturePhoto, cardDescription, openPopup, myId,savePhotoButton} from '../index.js'
import {getInitialCards, deleteCard, postCard, putLike, deleteLike} from '../components/api.js'
const page = document.querySelector('.page');
const popupPhoto = page.querySelector('.popup_type_photo');
const popupProfile = page.querySelector('.popup_type_profile');
const popupBigPicture = page.querySelector('.popup_type_big-picture');
import {renderFormLoading} from './utils.js'

function uploadLike(counter, number){
  counter.textContent = number
}

function toggleLike(button, cardId, likeNum){
  button.addEventListener('click', function(evt) {
    const card = evt.target.closest('.element');
    console.log(likeNum)
    if(evt.target.classList.contains('element__like_type_active')){
      deleteLike(cardId)
      .then((res) => {
        uploadLike(likeNum, res.likes.length)
      console.log(res.likes.length)
      evt.target.classList.remove('element__like_type_active');
      })
      .catch((err) => {
        console.log(err.message)
      })
    } else
    putLike(cardId)
    .then((res) => {
      uploadLike(likeNum, res.likes.length)
      evt.target.classList.add('element__like_type_active');
      console.log(res.likes.length)
    })
    .catch((err) => {
      console.log(err.message)
    })
  })
}

//Создание карточки и прослушка событий
function createCard(cardNameValue, cardImageValue, likeNumber, cardOwner, cardId, isLike) {
  const cardElement = cardTemplateContent.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardLike = cardElement.querySelector('.element__like');
  cardElement.querySelector('.element__text').textContent = cardNameValue;
  const likeCounter = cardElement.querySelector('.element__like-number');
  likeCounter.textContent = likeNumber;
  cardImage.src = cardImageValue;
  cardImage.alt = cardNameValue;
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
  toggleLike(likeAdd, cardId, likeCounter, likeNumber)

  //Удаление по нажатию button
  const cardButtonDelete = cardElement.querySelector('.element__delete');
  cardButtonDelete.addEventListener('click', function() {
    const card = cardButtonDelete.closest('.element');
    deleteCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
  });


  //Деактивация кнопки удаления на чужих постах
  if(myId.id !== cardOwner){
    cardButtonDelete.classList.add('element__delete_inactive')
  }

  //Отображение своего ранее нажатого лайка
  if(isLike) {
    cardLike.classList.add('element__like_type_active')
  }
  
  return cardElement;
}

//Добавление карточки
function addCard(evt) {
  evt.preventDefault();
  renderFormLoading(true, savePhotoButton, 'Создание...', 'Создать')
  postCard(picName.value, picHref.value)
  .then((data) => {
    const newCard = createCard(data.name, data.link, data.likes.length, data.owner._id, data._id, false);
    return newCard
  })
  .then((res) => {
    elementsContainer.prepend(res);
    closePopup(popupPhoto);
    evt.target.reset() //Очистка полей формы
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    renderFormLoading(false, savePhotoButton, 'Создание...', 'Создать');
  })
};

export {
  createCard,
  addCard
}