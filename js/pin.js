'use strict';

(function () {
  var PIN_HEIGHT = 20;
  var mapListElement = window.map.map.querySelector('.map__pins');
  var template = document.querySelector('#pin').content;
  var mapPinMain = window.map.map.querySelector('.map__pin--main');

  var getMapPin = function (element) {
    var mapPin = template.querySelector('.map__pin').cloneNode(true);
    var mapPinImage = mapPin.querySelector('img');

    mapPin.style.left = element.location.x - (mapPinImage.width / 2) + 'px';
    mapPin.style.top = element.location.y - mapPinImage.height + 'px';
    mapPin.querySelector('img').setAttribute('src', element.author.avatar);

    mapPin.addEventListener('click', function () {
      window.card.mapCard.classList.remove('hidden');
      window.card.fillCard(element, window.card.mapCard);
      mapListElement.appendChild(window.card.mapCard);
    });

    return mapPin;
  };

  var initMapPinMain = function () {

    mapPinMain.addEventListener('mousedown', function (e) {
      if (typeof e === 'object') {
        if (e.button === 0) {
          window.map.onActiveMode();
          window.form.fillForm();
        }
      }
    });

    mapPinMain.addEventListener('keydown', function (e) {
      if (typeof e === 'object') {
        if (e.keyCode === window.util.ENTER_KEYCODE) {
          window.map.onActiveMode();
          window.form.fillForm();
        }
      }
    });
  };

  var getPinCoords = function () {
    var pageNotActive = window.form.addForm.classList.contains('ad-form--disabled');
    var x = 0;
    var y = 0;
    if (pageNotActive) {
      x = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
      y = Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);
    } else {
      x = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
      y = Math.round(mapPinMain.offsetTop + PIN_HEIGHT + mapPinMain.offsetHeight);
    }
    return String(x) + ', ' + String(y);
  };

  window.pin = {
    getPinCoords: getPinCoords,
    mapListElement: mapListElement,
    getMapPin: getMapPin,
    initMapPinMain: initMapPinMain
  };
})();
