import { popupPhoto, popupProfile,popupAvatar, popupBigPicture } from "../index.js";

const page = document.querySelector('.page');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupPhoto);
    closePopup(popupProfile);
    closePopup(popupBigPicture);
    closePopup(popupAvatar);
  }
}

page.addEventListener('keydown', keyHandler) 

page.addEventListener('click', function(evt) { 
  if (evt.target.classList.contains('popup_opened')) {  
    closePopup(popupPhoto);
    closePopup(popupProfile);
    closePopup(popupBigPicture);
    closePopup(popupAvatar);
  }
})

export {
  openPopup,
  closePopup,
  page
}