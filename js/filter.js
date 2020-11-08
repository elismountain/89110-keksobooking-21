"use strict";

var MAX_SIMILLAR_PINS_COUNT = 5;
var FILTER_DEFAULT_VALUE = 'any';

var RoomPrice = {
  LOW: 10000,
  HIGH: 50000
};

var formFiltersNode = window.form.mapFiltersNode.querySelector('.map__filters');

var inputBoxes = Array.from(formFiltersNode.features);
// console.log(inputBoxes);

var containsValue = (objectValue, filterValue, sourceArray, newArray) => {
  if (window.form.formFiltersNode[objectValue].value === FILTER_DEFAULT_VALUE) {
    return sourceArray;
  } else {
    return parseInt(newArray.offer[filterValue], 10) === parseInt(window.form.formFiltersNode[objectValue].value, 10);
  }
};

var filterPinsByType = (element, array) => {
  if (window.form.formFiltersNode[`housing-type`].value === FILTER_DEFAULT_VALUE) {
    return array;
  } else {
    return element.offer.type === window.form.formFiltersNode[`housing-type`].value;
  }
};

var filterPinsByRooms = (pinSimmillar, index, array) => {
  return containsValue(`housing-rooms`, `rooms`, array, pinSimmillar);
};

var filterPinsByGuests = (pinSimmillar, index, array) => {
  return containsValue(`housing-guests`, `guests`, array, pinSimmillar);
};


var filterPinsByPrice = (pinSimmillar, index, array) => {
  switch (window.form.formFiltersNode[`housing-price`].value) {
    case `low`:
      return pinSimmillar.offer.price < RoomPrice.LOW;
    case `middle`:
      return pinSimmillar.offer.price >= RoomPrice.LOW && pinSimmillar.offer.price <= RoomPrice.HIGH;
    case `high`:
      return pinSimmillar.offer.price > RoomPrice.HIGH;
    default:
      return array;
  }
};

var filterPinsByFeatures = function (pinSimmillar) {
  return !inputBoxes.some(function (element) {
    return element.checked && !pinSimmillar.offer.features.includes(element.value);
  });
};

window.filter = {
  formFiltersNode: formFiltersNode,
  updateSimillarPins: (array) => {
    var filteredOffersArray = array.filter(filterPinsByType)
    .filter(filterPinsByRooms)
    .filter(filterPinsByGuests)
    .filter(filterPinsByPrice)
    .filter(filterPinsByFeatures)
    .slice(0, MAX_SIMILLAR_PINS_COUNT);

    window.card.mapCard.querySelector('.popup__close').addEventListener('click', function () {
      window.card.mapCard.parentNode.removeChild(window.card.mapCard);
    });
    window.map.mainMap.addEventListener('keydown', function (e) {
      if (typeof e === 'object') {
        if (e.keyCode === window.util.ESC_KEYCODE) {
          window.card.mapCard.parentNode.removeChild(window.card.mapCard);
        }
      }
    });
    window.pin.removePins();
    window.map.initMapPinMain(filteredOffersArray);
    window.card.addForm(filteredOffersArray);
  }
};
