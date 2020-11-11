"use strict";

var MAX_SIMILLAR_PINS_COUNT = 5;
var FILTER_DEFAULT_VALUE = `any`;

var RoomPrice = {
  LOW: 10000,
  HIGH: 50000
};


var inputBoxes = Array.from(window.form.formFiltersNode.features);

var containsValue = (objectValue, filterValue, sourceArray, element) => {
  if (window.form.formFiltersNode[objectValue].value === FILTER_DEFAULT_VALUE) {
    return true;
  } else {
    return parseInt(element.offer[filterValue], 10) === parseInt(window.form.formFiltersNode[objectValue].value, 10);
  }
};

var filterPinsByType = (element) => {
  if (window.form.formFiltersNode[`housing-type`].value === FILTER_DEFAULT_VALUE) {
    return true;
  } else {
    return element.offer.type === window.form.formFiltersNode[`housing-type`].value;
  }
};

var filterPinsByRooms = (pinSimilar, index, array) => {
  return containsValue(`housing-rooms`, `rooms`, array, pinSimilar);
};

var filterPinsByGuests = (pinSimilar, index, array) => {
  return containsValue(`housing-guests`, `guests`, array, pinSimilar);
};


var filterPinsByPrice = (pinSimilar) => {
  switch (window.form.formFiltersNode[`housing-price`].value) {
    case `low`:
      return pinSimilar.offer.price < RoomPrice.LOW;
    case `middle`:
      return pinSimilar.offer.price >= RoomPrice.LOW && pinSimilar.offer.price <= RoomPrice.HIGH;
    case `high`:
      return pinSimilar.offer.price > RoomPrice.HIGH;
    default:
      return true;
  }
};

var filterPinsByFeatures = function (pinSimilar) {
  return !inputBoxes.some(function (element) {
    return element.checked && !pinSimilar.offer.features.includes(element.value);
  });
};


var updateSimillarPins = function (array) {
  var filteredOffersArray = array.filter(filterPinsByType)
  .filter(filterPinsByRooms)
  .filter(filterPinsByGuests)
  .filter(filterPinsByPrice)
  .filter(filterPinsByFeatures)
  .slice(0, MAX_SIMILLAR_PINS_COUNT);

  window.card.hideActiveCard();
  window.pin.removePins();
  window.pin.createPins(filteredOffersArray);
};

window.filter = {
  updateSimillarPins: updateSimillarPins
};
