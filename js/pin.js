'use strict';

(function () {
  var PIN_HEIGHT = 20;
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

  // перетаскивание

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';


      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        mapPinMain.addEventListener(`click`, onClickPreventDefault);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    getPinCoords: getPinCoords,
    mapListElement: mapListElement,
    getMapPin: getMapPin,
    initMapPinMain: initMapPinMain
  };
})();
