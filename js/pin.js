'use strict';

(function () {
  var PIN_HEIGHT = 20;
  var MIN_TOP = 130;
  var MAX_TOP = 630;
  var mapListElement = window.map.mainMap.querySelector('.map__pins');
  var template = document.querySelector('#pin').content;
  var mapPinMain = window.map.mainMap.querySelector('.map__pin--main');

  var getMapPin = function (element) {
    var mapPin = template.querySelector('.map__pin').cloneNode(true);
    var mapPinImage = mapPin.querySelector('img');

    mapPin.style.left = element.location.x - (mapPinImage.width / 2) + 'px';
    mapPin.style.top = element.location.y - mapPinImage.height + 'px';
    mapPin.querySelector('img').setAttribute('src', element.author.avatar);

    mapPin.addEventListener('click', function () {
      window.card.show(element);
      mapListElement.appendChild(window.card.mapCard);
    });

    return mapPin;
  };

  var initMapPinMain = function () {

    mapPinMain.addEventListener('mousedown', function (e) {
      if (typeof e === 'object') {
        if (e.button === 0) {
          window.load.load(onDataLoaded);
        }
      }
    });

    mapPinMain.addEventListener('mouseup', function (e) {
      if (typeof e === 'object') {
        if (e.button === 0) {
          window.form.fillForm();
        }
      }
    });

    mapPinMain.addEventListener('keydown', function (e) {
      if (typeof e === 'object') {
        if (e.keyCode === window.util.ENTER_KEYCODE) {
          window.load.load(onDataLoaded);
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

  var onDataLoaded = function (data) {
    window.data.listOfRentals = data;

    window.map.onActiveMode();
  };


  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var top = mapPinMain.offsetTop - shift.y;
      var left = mapPinMain.offsetLeft - shift.x;

      if (top < MIN_TOP) {
        top = MIN_TOP;
      } else if (top > MAX_TOP) {
        top = MAX_TOP;
      }

      var MIN_LEFT = -mapPinMain.offsetWidth / 2;
      var MAX_LEFT = window.map.mainMap.offsetWidth - mapPinMain.offsetWidth / 2;

      if (left < MIN_LEFT) {
        left = MIN_LEFT;
      } else if (left > MAX_LEFT) {
        left = MAX_LEFT;
      }

      mapPinMain.style.top = top + 'px';
      mapPinMain.style.left = left + 'px';

      window.form.fillForm();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var removePins = () => {
    var pinsNode = mapListElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let pinNode of pinsNode) {
      template.parentNode.removeChild(pinNode);
    }
  };

  window.pin = {
    getPinCoords: getPinCoords,
    mapListElement: mapListElement,
    getMapPin: getMapPin,
    initMapPinMain: initMapPinMain,
    removePins: removePins
  };
})();
