"use strict";

(function () {
  var mainMap = document.querySelector('.map');
  var resetButton = document.querySelector('.ad-form__reset');
  var pins = [];

  var onActiveMode = () => {
    mainMap.classList.remove('map--faded');
    window.form.addForm.classList.remove('ad-form--disabled');
    window.filter.updateSimillarPins(window.data.listOfRentals);
    window.form.toggleDisabledOnForm();

    var filterPins = function () {
      window.filter.updateSimillarPins(window.data.listOfRentals);
    };
    window.form.formFiltersNode.addEventListener(`change`, filterPins);
  };

  var onResetMode = function () {
    mainMap.classList.add('map--faded');
    window.form.addForm.classList.add('ad-form--disabled');
    for (var i = 0; i < pins.length; i++) {
      pins[i].parentNode.removeChild(pins[i]);
    }
    pins.splice(0, pins.length);
  };

  resetButton.addEventListener('click', onResetMode);

  window.map = {
    pins: pins,
    onActiveMode: onActiveMode,
    mainMap: mainMap,
    onResetMode: onResetMode
  };
})();
