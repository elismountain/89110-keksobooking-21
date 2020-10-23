'use strict';

var TITLES = [' Большая квартира', 'Маленькая квартира', 'Огромный дом', 'Маленький дом', 'Гостевой дом', 'Квартира на чердаке', 'Квартира в подвале', 'Хостел на 100 человек'];
var TYPES = ['palace', 'flat', 'house', 'bungalow'];
var TIME = ['12:00', '13:00', '14:00'];
var FACILITY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_OF_USERS = 8;
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var PIN_HEIGHT = 20;
var MIN_PRICE = {
  palace: 10000,
  house: 5000,
  flat: 1000,
  bungalow: 0
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
};

var getRandomArray = function (arr) { // случайное количесвто элементов без повторений
  var newArr = [];
  var newArrLen = getRandomNumber(1, arr.length); // пока длина меньше чем у arr (FACILITY)

  while (newArr.length < newArrLen) {
    var randomElement = getRandomElement(arr);
    if (newArr.indexOf(randomElement) === -1) { // check for duplicates
      newArr.push(randomElement); // добавить в конец массива
    }
  }

  return newArr;
};

var createOffer = function (indexOffer) {
  var coordinatesLocation = [getRandomNumber(0, 900), getRandomNumber(130, 630)];
  return {
    'author': {
      'avatar': 'img/avatars/user' + String(indexOffer + 1).padStart(2, '0') + '.png'
    },

    'offer': {
      'title': TITLES[indexOffer],
      'address': coordinatesLocation[0] + ',' + coordinatesLocation[1],
      'price': getRandomNumber(0, 1000000),
      'type': getRandomElement(TYPES),
      'rooms': getRandomNumber(1, 10),
      'guests': getRandomNumber(1, 10),
      'checkin': getRandomElement(TIME),
      'checkout': getRandomElement(TIME),
      'features': getRandomArray(FACILITY),
      'description': 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
      'photos': getRandomArray(PHOTOS),
    },

    'location': {
      'x': coordinatesLocation[0],
      'y': coordinatesLocation[1]
    }
  };
};

var addObjects = function (numberOfObjects) {
  var objects = [];

  for (var i = 0; i < numberOfObjects; i++) {
    objects.push(createOffer(i));
  }
  return objects;
};

var listOfRentals = addObjects(NUMBER_OF_USERS);

var map = document.querySelector('.map');

var mapFiltersNode = map.querySelector(`.map__filters-container`);
var formFiltersNode = mapFiltersNode.querySelector(`.map__filters`);

// 3. На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте,

var mapListElement = map.querySelector('.map__pins');
var template = document.querySelector('#pin').content;

var fillCard = function (element, mapCard) {
  var getValueTypeOffer = function () {
    if (element.offer.type === 'palace') {
      return 'Дворец';
    } else if (element.offer.type === 'flat') {
      return 'Квартира';
    } else if (element.offer.type === 'house') {
      return 'Дом';
    } else {
      return 'Бунгало';
    }
  };

  var createPhotosFragment = function (photosList) {
    var photosFragment = document.createDocumentFragment();
    var templatePhoto = mapCard.querySelector('.popup__photo');
    templatePhoto.parentNode.removeChild(templatePhoto);

    photosList.forEach(function (photo) {
      var photoItem = document.createElement('img');
      photoItem.className = 'popup__photo';
      photoItem.width = 45;
      photoItem.height = 40;
      photoItem.alt = 'Фотография жилья';
      photoItem.src = photo;

      photosFragment.appendChild(photoItem);
    });

    return photosFragment;
  };

  var numDecline = function (num, nominative, genitiveSingular, genitivePlural) {
    if (num > 10 && (Math.round((num % 100) / 10) === 1)) {
      return genitivePlural;
    } else {
      switch (num % 10) {
        case 1:
          return nominative;
        case 2:
        case 3:
        case 4:
          return genitiveSingular;
        default:
          return genitivePlural;
      }
    }
  };

  var popupPhotos = mapCard.querySelector('.popup__photos');
  popupPhotos.appendChild(createPhotosFragment(element.offer.photos));

  mapCard.querySelector('.popup__title').textContent = element.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = element.offer.address;
  mapCard.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').textContent = getValueTypeOffer();
  mapCard.querySelector('.popup__text--capacity').textContent = element.offer.rooms + numDecline(element.offer.rooms, ' комната', ' комнаты', ' комнат') + ' для ' + element.offer.guests + numDecline(element.offer.guests, ' гостя', ' гостей', ' гостей');
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
  mapCard.querySelector('.popup__description').textContent = element.offer.description;
  mapCard.querySelector('.popup__avatar').setAttribute('src', element.author.avatar);
};

var createCard = function () {
  var cardTemplate = document.querySelector('#card').content;
  var mapCard = cardTemplate.querySelector('.map__card').cloneNode(true);
  fillCard(listOfRentals[0], mapCard);
  mapCard.querySelector('.popup__close').addEventListener('click', function () {
    mapCard.parentNode.removeChild(mapCard);
  });
  map.addEventListener('keydown', function (e) {
    if (typeof e === 'object') {
      if (e.keyCode === ESC_KEYCODE) {
        mapCard.parentNode.removeChild(mapCard);
      }
    }
  });

  var before = document.querySelector('.map__filters-container');
  var nodeParent = before.parentNode;
  nodeParent.insertBefore(mapCard, before);
  return mapCard;
};

var mapCard = createCard();
mapCard.classList.add('hidden');


var getMapPin = function (element) {
  var mapPin = template.querySelector('.map__pin').cloneNode(true);
  var mapPinImage = mapPin.querySelector('img');

  mapPin.style.left = element.location.x - (mapPinImage.width / 2) + 'px';
  mapPin.style.top = element.location.y - mapPinImage.height + 'px';
  mapPin.querySelector('img').setAttribute('src', element.author.avatar);

  mapPin.addEventListener('click', function () {
    mapCard.classList.remove('hidden');
    fillCard(element, mapCard);
    mapListElement.appendChild(mapCard);
  });

  return mapPin;
};

// 10. Личный проект: доверяй, но проверяй (часть 1)

var mapPinMain = map.querySelector('.map__pin--main');
var addForm = document.querySelector('.ad-form');
var inputAddress = mapCard.querySelector('.popup__text--address');
var formAddress = addForm.querySelector('#address');

// заполнение формы

var fillForm = function () {
  formAddress.value = getPinCoords();
};

// активация на левую кнопку мыши

var toggleDisabledOnForm = () => {
  var pageNotActive = addForm.classList.contains('ad-form--disabled');
  Array.from(addForm.children).forEach((children) => {
    children.disabled = pageNotActive;
    children.classList.toggle('disable-cursor');
  });
  Array.from(formFiltersNode.children).forEach((children) => {
    children.disabled = pageNotActive;
    children.classList.toggle('disable-cursor');
  });
};

var onActiveMode = () => {
  map.classList.remove('map--faded');
  addForm.classList.remove('ad-form--disabled');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < listOfRentals.length; i++) {
    fragment.appendChild(getMapPin(listOfRentals[i]));
  }
  mapListElement.appendChild(fragment);
  toggleDisabledOnForm();
};

mapPinMain.addEventListener('mousedown', function (e) {
  if (typeof e === 'object') {
    if (e.button === 0) {
      onActiveMode();
      fillForm();
    }
  }
});

// активация на таб
mapPinMain.addEventListener('keydown', function (e) {
  if (typeof e === 'object') {
    if (e.keyCode === ENTER_KEYCODE) {
      onActiveMode();
      fillForm();
    }
  }
});

// title input validation
var inputTitle = addForm.querySelector('#title');

var onValidationInputTitle = function () {
  inputTitle.required = true;
  inputTitle.minLength = 30;
  inputTitle.maxLength = 100;
};

onValidationInputTitle();


var onValidationInputAddress = function () {
  inputAddress.required = 'required';
  inputAddress.addEventListener('keydown', function (evt) {
    if (evt.keyCode !== ENTER_KEYCODE) {
      evt.preventDefault();
    }
  });
};
onValidationInputAddress();


var getPinCoords = function () {
  var pageNotActive = addForm.classList.contains('ad-form--disabled');
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

formAddress.value = getPinCoords();
toggleDisabledOnForm();


// validation price
var priceSelect = addForm.querySelectorAll('#price');

var onValidationInputPrice = function () {
  priceSelect.required = true;
  priceSelect.value = 1000;
  priceSelect.min = 0;
  priceSelect.max = 1000000;
};

onValidationInputPrice();


var capacitySelect = addForm.querySelector('#capacity');
var roomSelect = addForm.querySelector('#room_number');

var disableOptions = function (options) {
  for (var i of [0, 1, 2, 3]) {
    capacitySelect.querySelector('option[value="' + String(i) + '"]').disabled = false;
  }
  for (i of options) {
    capacitySelect.querySelector('option[value="' + String(i) + '"]').disabled = true;
  }
};


var onSetRoomChangeCapacity = function () {
  if (roomSelect.value === '100') {
    capacitySelect.querySelector('option[value="0"]').selected = true;
    disableOptions([1, 2, 3]);
  } else {
    capacitySelect.querySelector('option[value="' + String(roomSelect.value) + '"]').selected = true;
    var optionsToDisable = [0];
    for (var i = parseInt(roomSelect.value, 10) + 1; i <= 3; i++) {
      optionsToDisable.push(i);
    }
    disableOptions(optionsToDisable);
  }
};

onSetRoomChangeCapacity();

roomSelect.addEventListener('change', function () {
  onSetRoomChangeCapacity();
});

roomSelect.addEventListener('input', onSetRoomChangeCapacity);

var onCapasityValidation = function () {
  if (roomSelect.value === '100' && capacitySelect.value !== '0') {
    capacitySelect.setCustomValidity('Не для гостей');
  } else if (roomSelect.value === '3' && capacitySelect.value === '0') {
    capacitySelect.setCustomValidity('Количество гостей может быть 1, 2, 3');
  } else if (roomSelect.value === '2' && capacitySelect.value === '0' || roomSelect.value === '2' && capacitySelect.value === '3') {
    capacitySelect.setCustomValidity('Количество гостей может быть 1 или 2');
  } else if (roomSelect.value === '1' && capacitySelect.value === '0' || roomSelect.value === '1' && capacitySelect.value === '2' || roomSelect.value === '1' && capacitySelect.value === '3') {
    capacitySelect.setCustomValidity('Только для 1 гостя');
  } else {
    capacitySelect.setCustomValidity('');
  }
  capacitySelect.reportValidity();
};

onCapasityValidation();

// цена по типу жилья
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

addForm.addEventListener('change', onFormNodeChange);


var validatePriceInput = () => {
  addForm.price.min = MIN_PRICE[addForm.type.value];
  addForm.price.placeholder = MIN_PRICE[addForm.type.value];
};

// timein time out

var validateTimeSelects = function (evt) {
  if (evt.target === addForm.timein) {
    addForm.timeout.value = addForm.timein.value;
  } else {
    addForm.timein.value = addForm.timeout.value;
  }
};
