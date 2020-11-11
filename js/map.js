"use strict";

var mainMap = document.querySelector(`.map`);
var resetButton = document.querySelector(`.ad-form__reset`);
var pins = [];

var onActiveMode = () => {
  mainMap.classList.remove(`map--faded`);
  window.form.addForm.classList.remove(`ad-form--disabled`);
  window.filter.updateSimillarPins(window.data.listOfRentals);
  window.form.toggleDisabledOnForm();

  var filterPins = window.util.debounce(() => {
    window.filter.updateSimillarPins(window.data.listOfRentals);
  });
  window.form.formFiltersNode.addEventListener(`change`, filterPins);
};

var onResetMode = function () {
  mainMap.classList.add(`map--faded`);
  window.form.addForm.classList.add(`ad-form--disabled`);
  window.form.addForm.reset();
  window.images.resetImage();
  window.card.hideActiveCard();
  for (var i = 0; i < pins.length; i++) {
    pins[i].parentNode.removeChild(pins[i]);
  }
  pins.splice(0, pins.length);
};

resetButton.addEventListener(`click`, onResetMode);

window.map = {
  pins: pins,
  onActiveMode: onActiveMode,
  mainMap: mainMap,
  onResetMode: onResetMode
};
