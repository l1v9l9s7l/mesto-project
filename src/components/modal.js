import { popupPhoto, popupProfile,popupAvatar, popupBigPicture } from "../index.js";

const page = document.querySelector('.page');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  page.addEventListener('keydown', closeByEsc) 
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  page.removeEventListener('keydown', closeByEsc) 
}

//Функция закрытия по кнопке
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
} 

export {
  openPopup,
  closePopup,
  page
}