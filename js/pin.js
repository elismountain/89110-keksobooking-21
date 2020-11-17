"use strict";

const PIN_HEIGHT = 20;
const PIN_MIN_TOP = 130;
const PIN_MAX_TOP = 630;

const mapListElement = window.map.mainMap.querySelector(`.map__pins`);
const template = document.querySelector(`#pin`).content;
const mapPinMain = window.map.mainMap.querySelector(`.map__pin--main`);

const getMapPin = (element) => {
  let mapPin = template.querySelector(`.map__pin`).cloneNode(true);
  const mapPinImage = mapPin.querySelector(`img`);

  mapPin.style.left = element.location.x - (mapPinImage.width / 2) + `px`;
  mapPin.style.top = element.location.y - mapPinImage.height + `px`;
  mapPin.querySelector(`img`).setAttribute(`src`, element.author.avatar);

  mapPin.addEventListener(`click`, () => {
    window.card.show(element);
    mapListElement.appendChild(window.card.mapCard);
  });

  return mapPin;
};

const initMapPinMain = () => {
  mapPinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      window.load.load(onDataLoaded);
    }
  });

  mapPinMain.addEventListener(`mouseup`, (evt) => {
    if (evt.button === 0) {
      window.form.fillForm();
    }
  });

  mapPinMain.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.load.load(onDataLoaded);
      window.form.fillForm();
    }
  });
};

const getPinCoords = () => {
  const pageNotActive = window.form.addForm.classList.contains(`ad-form--disabled`);
  let x = 0;
  let y = 0;
  if (pageNotActive) {
    x = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
    y = Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);
  } else {
    x = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
    y = Math.round(mapPinMain.offsetTop + PIN_HEIGHT + mapPinMain.offsetHeight);
    if (y < PIN_MIN_TOP) {
      y = PIN_MIN_TOP;
    } else if (y > PIN_MAX_TOP) {
      y = PIN_MAX_TOP;
    }
  }
  return String(x) + `, ` + String(y);
};

const onDataLoaded = (data) => {
  window.data.listOfRentals = data;
  window.map.onActiveMode();
};


mapPinMain.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    let top = mapPinMain.offsetTop - shift.y;
    let left = mapPinMain.offsetLeft - shift.x;

    const MIN_TOP = PIN_MIN_TOP - PIN_HEIGHT - mapPinMain.offsetHeight;
    const MAX_TOP = PIN_MAX_TOP - PIN_HEIGHT - mapPinMain.offsetHeight;


    if (top < MIN_TOP) {
      top = MIN_TOP;
    } else if (top > MAX_TOP) {
      top = MAX_TOP;
    }

    const MIN_LEFT = -mapPinMain.offsetWidth / 2;
    const MAX_LEFT = window.map.mainMap.offsetWidth - mapPinMain.offsetWidth / 2;

    if (left < MIN_LEFT) {
      left = MIN_LEFT;
    } else if (left > MAX_LEFT) {
      left = MAX_LEFT;
    }

    mapPinMain.style.top = top + `px`;
    mapPinMain.style.left = left + `px`;

    window.form.fillForm();
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

const createPins = (array) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    const pin = window.pin.getMapPin(array[i]);
    fragment.appendChild(pin);
  }
  window.pin.mapListElement.appendChild(fragment);
};

const removePins = () => {
  const pinsNode = mapListElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  for (let pinNode of pinsNode) {
    pinNode.parentNode.removeChild(pinNode);
  }
};

window.pin = {
  getPinCoords,
  mapListElement,
  getMapPin,
  initMapPinMain,
  removePins,
  createPins,
  mapPinMain
};
