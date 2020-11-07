"use strict";

(function () {
  var mainMap = document.querySelector('.map');
  var resetButton = document.querySelector('.ad-form__reset');
  var pins = [];

  var onActiveMode = () => {
    mainMap.classList.remove('map--faded');
    window.form.addForm.classList.remove('ad-form--disabled');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.listOfRentals.length; i++) {
      var pin = window.pin.getMapPin(window.data.listOfRentals[i]);
      fragment.appendChild(pin);
      pins.push(pin);
    }
    window.pin.mapListElement.appendChild(fragment);
    window.form.toggleDisabledOnForm();
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
    onActiveMode: onActiveMode,
    mainMap: mainMap,
    onResetMode: onResetMode
  };
})();
