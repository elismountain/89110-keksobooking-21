"use strict";

const MAX_SIMILLAR_PINS_COUNT = 5;
const FILTER_DEFAULT_VALUE = `any`;

const RoomPrice = {
  LOW: 10000,
  HIGH: 50000
};

const inputBoxes = Array.from(window.form.formFiltersNode.features);


const containsValue = (objectValue, filterValue, sourceArray, element) => {
  return window.form.formFiltersNode[objectValue].value === FILTER_DEFAULT_VALUE ? true : parseInt(element.offer[filterValue], 10) === parseInt(window.form.formFiltersNode[objectValue].value, 10);
};

const filterPinsByType = (element) => {
  return window.form.formFiltersNode[`housing-type`].value === FILTER_DEFAULT_VALUE ? true : element.offer.type === window.form.formFiltersNode[`housing-type`].value;
};

const filterPinsByRooms = (pinSimilar, index, array) => {
  return containsValue(`housing-rooms`, `rooms`, array, pinSimilar);
};

const filterPinsByGuests = (pinSimilar, index, array) => {
  return containsValue(`housing-guests`, `guests`, array, pinSimilar);
};


const filterPinsByPrice = (pinSimilar) => {
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

const filterPinsByFeatures = (pinSimilar) => {
  return !inputBoxes.some((element) => {
    return element.checked && !pinSimilar.offer.features.includes(element.value);
  });
};


const updateSimillarPins = (array) => {
  const filteredOffersArray = array.filter(filterPinsByType)
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
  updateSimillarPins
};
