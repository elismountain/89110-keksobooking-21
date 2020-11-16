"use strict";

const mapFiltersNode = window.map.mainMap.querySelector(`.map__filters-container`);
const formFiltersNode = mapFiltersNode.querySelector(`.map__filters`);
const addForm = document.querySelector(`.ad-form`);
const inputAddress = window.card.mapCard.querySelector(`.popup__text--address`);
const formAddress = addForm.querySelector(`#address`);
const capacitySelect = addForm.querySelector(`#capacity`);
const roomSelect = addForm.querySelector(`#room_number`);
const priceSelect = addForm.querySelectorAll(`#price`);
const mainNode = document.querySelector(`main`);
const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const inputTitle = addForm.querySelector(`#title`);

const IMPUT_TITLE_MIN_LENGTH = 30;
const IMPUT_TITLE_MAX_LENGTH = 100;
const IMPUT_PRICE_MIN_LENGTH = 0;
const IMPUT_PRICE_MAX_LENGTH = 1000000;


const MIN_PRICE = {
  palace: 10000,
  house: 5000,
  flat: 1000,
  bungalow: 0
};

const ROOMS_DISABLED = {
  "1": [0, 2, 3],
  "2": [0, 3],
  "3": [0],
  "100": [1, 2, 3]
};

const showSuccessMessage = function () {
  const successMessage = successMessageTemplate.cloneNode(true);
  mainNode.appendChild(successMessage);
  successMessage.addEventListener(`click`, () => {
    successMessage.parentNode.removeChild(successMessage);
  });
  document.addEventListener(`keydown`, function (e) {
    e.preventDefault();
    if (e.keyCode === window.util.ESC_KEYCODE || e.keyCode === window.util.ENTER_KEYCODE) {
      successMessage.parentNode.removeChild(successMessage);
    }
  }, {
    once: true
  });
};

const onDataUploaded = function () {
  window.map.onResetMode();
  showSuccessMessage();
};

addForm.addEventListener(`submit`, (evt) => {
  window.load.upload(new FormData(addForm), onDataUploaded);
  evt.preventDefault();
});

const fillForm = function () {
  formAddress.value = window.pin.getPinCoords();
};

const toggleDisabledOnForm = () => {
  const pageNotActive = addForm.classList.contains(`ad-form--disabled`);
  Array.from(addForm.children).forEach((children) => {
    children.disabled = pageNotActive;
    children.classList.toggle(`disable-cursor`);
  });
  Array.from(formFiltersNode.children).forEach((children) => {
    children.disabled = pageNotActive;
    children.classList.toggle(`disable-cursor`);
  });
};


const onValidationInputTitle = function () {
  inputTitle.required = true;
  inputTitle.minLength = IMPUT_TITLE_MIN_LENGTH;
  inputTitle.maxLength = IMPUT_TITLE_MAX_LENGTH;
};

const onValidationInputAddress = function () {
  inputAddress.required = `required`;
  inputAddress.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode !== window.util.ENTER_KEYCODE) {
      evt.preventDefault();
    }
  });
};


const onValidationInputPrice = function () {
  priceSelect.required = true;
  priceSelect.value = 1000;
  priceSelect.min = IMPUT_PRICE_MIN_LENGTH;
  priceSelect.max = IMPUT_PRICE_MAX_LENGTH;
};

const disableOptions = function (optionsToDisable) {
  const options = capacitySelect.querySelectorAll(`option`);

  options.forEach((option) => {
    option.disabled = optionsToDisable.includes(parseInt(option.value, 10));
  });
};

const onSetRoomChangeCapacity = function () {

  let rooms = parseInt(roomSelect.value, 10);
  capacitySelect.querySelector(`option[value="` + String(rooms % 100) + `"]`).selected = true;

  disableOptions(ROOMS_DISABLED[roomSelect.value]);
  onCapasityValidation();
};

const onCapasityValidation = function () {
  if (roomSelect.value === `100` && capacitySelect.value !== `0`) {
    capacitySelect.setCustomValidity(`Не для гостей`);
  } else if (roomSelect.value === `3` && capacitySelect.value === `0`) {
    capacitySelect.setCustomValidity(`Количество гостей может быть 1, 2, 3`);
  } else if (roomSelect.value === `2` && capacitySelect.value === `0` || roomSelect.value === `2` && capacitySelect.value === `3`) {
    capacitySelect.setCustomValidity(`Количество гостей может быть 1 или 2`);
  } else if (roomSelect.value === `1` && capacitySelect.value === `0` || roomSelect.value === `1` && capacitySelect.value === `2` || roomSelect.value === `1` && capacitySelect.value === `3`) {
    capacitySelect.setCustomValidity(`Только для 1 гостя`);
  } else {
    capacitySelect.setCustomValidity(``);
  }
  capacitySelect.reportValidity();
};

const onFormNodeChange = function (evt) {
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

const validatePriceInput = () => {
  addForm.price.min = MIN_PRICE[addForm.type.value];
  addForm.price.placeholder = MIN_PRICE[addForm.type.value];
};

roomSelect.addEventListener(`change`, onSetRoomChangeCapacity);
roomSelect.addEventListener(`input`, onSetRoomChangeCapacity);
addForm.addEventListener(`change`, onFormNodeChange);

const validateTimeSelects = function (evt) {
  if (evt.target === addForm.timein) {
    addForm.timeout.value = addForm.timein.value;
  } else {
    addForm.timein.value = addForm.timeout.value;
  }
};

const initForm = function () {
  onValidationInputTitle();
  onValidationInputAddress();
  formAddress.value = window.pin.getPinCoords();
  toggleDisabledOnForm();
  onValidationInputPrice();
  onCapasityValidation();
  onSetRoomChangeCapacity();
};

window.form = {
  addForm,
  formAddress,
  fillForm,
  roomSelect,
  initForm,
  toggleDisabledOnForm,
  mapFiltersNode,
  formFiltersNode
};
