"use strict";

var mainMap = document.querySelector(`.map`);
var resetButton = document.querySelector(`.ad-form__reset`);

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
  window.pin.removePins();
};

resetButton.addEventListener(`click`, onResetMode);

window.map = {
  onActiveMode: onActiveMode,
  mainMap: mainMap,
  onResetMode: onResetMode
};
