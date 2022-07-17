const page = document.querySelector('.page');
const popupPhoto = page.querySelector('.popup_type_photo');
const popupProfile = page.querySelector('.popup_type_profile');
const popupBigPicture = page.querySelector('.popup_type_big-picture');

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
  }
}

page.addEventListener('keydown', keyHandler) 

page.addEventListener('click', function(evt) { 
  if (evt.target.classList.contains('popup_opened')) {  
    closePopup(popupPhoto);
    closePopup(popupProfile);
    closePopup(popupBigPicture);
  }
})

export {
  openPopup,
  closePopup,
  page
}