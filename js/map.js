"use strict";

(function () {
  var mainMap = document.querySelector('.map');

  var onActiveMode = () => {
    mainMap.classList.remove('map--faded');
    window.form.addForm.classList.remove('ad-form--disabled');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.listOfRentals.length; i++) {
      fragment.appendChild(window.pin.getMapPin(window.data.listOfRentals[i]));
    }
    window.pin.mapListElement.appendChild(fragment);
    window.form.toggleDisabledOnForm();
  };

  window.map = {
    onActiveMode: onActiveMode,
    mainMap: mainMap
  };
})();
