"use strict";

var mapFiltersNode = window.map.mainMap.querySelector(`.map__filters-container`);
var formFiltersNode = mapFiltersNode.querySelector(`.map__filters`);
var addForm = document.querySelector(`.ad-form`);
var inputAddress = window.card.mapCard.querySelector(`.popup__text--address`);
var formAddress = addForm.querySelector(`#address`);
var MIN_PRICE = {
  palace: 10000,
  house: 5000,
  flat: 1000,
  bungalow: 0
};

var mainNode = document.querySelector(`main`);
var successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);

var showSuccessMessage = function () {
  var successMessage = successMessageTemplate.cloneNode(true);
  mainNode.appendChild(successMessage);
  successMessage.addEventListener(`click`, () => {
    successMessage.parentNode.removeChild(successMessage);
  });
  document.addEventListener(`keydown`, function (e) {
    e.preventDefault();
    if (typeof e === `object`) {
      if (e.keyCode === window.util.ESC_KEYCODE || e.keyCode === window.util.ENTER_KEYCODE) {
        successMessage.parentNode.removeChild(successMessage);
      }
    }
  }, {
    once: true
  });
};

var onDataUploaded = function () {
  window.map.onResetMode();
  showSuccessMessage();
};

addForm.addEventListener(`submit`, (evt) => {
  window.load.upload(new FormData(addForm), onDataUploaded);
  evt.preventDefault();
});

var fillForm = function () {
  formAddress.value = window.pin.getPinCoords();
};

var toggleDisabledOnForm = () => {
  var pageNotActive = addForm.classList.contains(`ad-form--disabled`);
  Array.from(addForm.children).forEach((children) => {
    children.disabled = pageNotActive;
    children.classList.toggle(`disable-cursor`);
  });
  Array.from(formFiltersNode.children).forEach((children) => {
    children.disabled = pageNotActive;
    children.classList.toggle(`disable-cursor`);
  });
};

var inputTitle = addForm.querySelector(`#title`);

var onValidationInputTitle = function () {
  inputTitle.required = true;
  inputTitle.minLength = 30;
  inputTitle.maxLength = 100;
};

var onValidationInputAddress = function () {
  inputAddress.required = `required`;
  inputAddress.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode !== window.util.ENTER_KEYCODE) {
      evt.preventDefault();
    }
  });
};

var priceSelect = addForm.querySelectorAll(`#price`);

var onValidationInputPrice = function () {
  priceSelect.required = true;
  priceSelect.value = 1000;
  priceSelect.min = 0;
  priceSelect.max = 1000000;
};

var capacitySelect = addForm.querySelector(`#capacity`);
var roomSelect = addForm.querySelector(`#room_number`);

var disableOptions = function (options) {
  for (var i of [0, 1, 2, 3]) {
    capacitySelect.querySelector(`option[value="` + String(i) + `"]`).disabled = false;
  }
  for (i of options) {
    capacitySelect.querySelector(`option[value="` + String(i) + `"]`).disabled = true;
  }
};

var onSetRoomChangeCapacity = function () {
  if (roomSelect.value === `100`) {
    capacitySelect.querySelector(`option[value="0"]`).selected = true;
    disableOptions([1, 2, 3]);
  } else {
    capacitySelect.querySelector(`option[value="` + String(roomSelect.value) + `"]`).selected = true;
    var optionsToDisable = [0];
    for (var i = parseInt(roomSelect.value, 10) + 1; i <= 3; i++) {
      optionsToDisable.push(i);
    }
    disableOptions(optionsToDisable);
  }
  onCapasityValidation();
};

var onCapasityValidation = function () {
  if (roomSelect.value === `100` && capacitySelect.value !== `0`) {
    capacitySelect.setCustomValidity(`Не для гостей`);
  } else if (roomSelect.value === `3` && capacitySelect.value === `0`) {
    capacitySelect.setCustomValidity(`Количество гостей может быть 1, 2, 3`);
  } else if (roomSelect.value === `2` && capacitySelect.value === `0` || roomSelect.value === `2` && capacitySelect.value === `3`) {
    capacitySelect.setCustomValidity(`Количество гостей может быть 1 или 2`);
  } else if (roomSelect.value === `1` && capacitySelect.value === `0` || roomSelect.value === `1` && capacitySelect.value === `2` || roomSelect.value === `1` && capacitySelect.value === `3`) {
    capacitySelect.setCustomValidity(`Только для 1 гостя`);
  } else {
    capacitySelect.setCustomValidity('');
  }
  capacitySelect.reportValidity();
};

var onFormNodeChange = function (evt) {
  switch (evt.target) {
    case addForm.timein:
    case addForm.timeout:
      validateTimeSelects(evt);
      break;
    case addForm.type:
      validatePriceInput();
      break;
  }
};

var validatePriceInput = () => {
  addForm.price.min = MIN_PRICE[addForm.type.value];
  addForm.price.placeholder = MIN_PRICE[addForm.type.value];
};

roomSelect.addEventListener(`change`, onSetRoomChangeCapacity);
roomSelect.addEventListener(`input`, onSetRoomChangeCapacity);
addForm.addEventListener(`change`, onFormNodeChange);

var validateTimeSelects = function (evt) {
  if (evt.target === addForm.timein) {
    addForm.timeout.value = addForm.timein.value;
  } else {
    addForm.timein.value = addForm.timeout.value;
  }
};

var initForm = function () {
  onValidationInputTitle();
  onValidationInputAddress();
  formAddress.value = window.pin.getPinCoords();
  toggleDisabledOnForm();
  onValidationInputPrice();
  onCapasityValidation();
  onSetRoomChangeCapacity();
};

window.form = {
  addForm: addForm,
  formAddress: formAddress,
  fillForm: fillForm,
  roomSelect: roomSelect,
  initForm: initForm,
  toggleDisabledOnForm: toggleDisabledOnForm,
  mapFiltersNode: mapFiltersNode,
  formFiltersNode: formFiltersNode
};
