// Отображение загрузки
function renderFormLoading(isLoading, submitButton, saving, save){
  if(isLoading) {
    submitButton.textContent = saving
  } else {
    submitButton.textContent = save
  }
}

export {
  renderFormLoading,
}