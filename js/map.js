"use strict";

const mainMap = document.querySelector(`.map`);
const resetButton = document.querySelector(`.ad-form__reset`);
const DEFAULT_PRICE = `1000`;

const onActiveMode = () => {
  mainMap.classList.remove(`map--faded`);
  window.form.addForm.classList.remove(`ad-form--disabled`);
  window.filter.updateSimillarPins(window.data.listOfRentals);
  window.form.toggleDisabledOnForm();

  const filterPins = window.util.debounce(() => {
    window.filter.updateSimillarPins(window.data.listOfRentals);
  });
  window.form.formFiltersNode.addEventListener(`change`, filterPins);
};


const resetMainPin = () => {
  const centerTop = (mainMap.offsetHeight) / 2;
  const centerLeft = (mainMap.offsetWidth - window.pin.mapPinMain.offsetWidth) / 2;
  window.pin.mapPinMain.style.top = centerTop + `px`;
  window.pin.mapPinMain.style.left = centerLeft + `px`;
};

const onResetMode = () => {
  mainMap.classList.add(`map--faded`);
  window.form.addForm.classList.add(`ad-form--disabled`);
  window.form.toggleDisabledOnForm();
  window.form.addForm.reset();
  window.images.resetImage();
  window.card.hideActiveCard();
  window.pin.removePins();
  window.form.addForm.price.placeholder = DEFAULT_PRICE;
  window.form.addForm.price.min = DEFAULT_PRICE;
  resetMainPin();
  window.form.fillForm();
};

resetButton.addEventListener(`click`, onResetMode);

window.map = {
  onActiveMode,
  mainMap,
  onResetMode
};
