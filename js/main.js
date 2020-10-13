'use strict';

var TITLES = ['а', 'b', 'c', 'd', 'e', 'f', 'g', 'k'];
var TYPES = ['palace', 'flat', 'house', 'bungalow'];
var TIME = ['12:00', '13:00', '14:00'];
var FACILITY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_OF_USERS = 8;

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
    if (newArr.indexOf(randomElement) !== -1) { // check for duplicates
      continue;
    }
    newArr.push(randomElement); // добавить в конец массива
  }

  return newArr;
};

var createOffer = function (indexOffer) {
  var coordinatesLocation = [getRandomNumber(0, 900), getRandomNumber(130, 630)]; // от 0 до 900
  return {
    'author': {
      'avatar': 'img/avatars/user' + String(indexOffer + 1).padStart(2, '0') + '.png'
    }, // fixed

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
      'description': '',
      'photos': []
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

// 2. У блока .map уберите класс .map--faded.

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// 3. На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте,
// и заполните их данными из массива. Итоговую разметку метки .map__pin можно взять из шаблона #pin.

var mapListElement = map.querySelector('.map__pins');
var template = document.querySelector('#pin').content;

var getMapPin = function (element) {
  var mapPin = template.querySelector('.map__pin').cloneNode(true);
  var mapPinImage = mapPin.querySelector('img');

  mapPin.style.left = element.location.x - (mapPinImage.width / 2) + 'px';
  mapPin.style.top = element.location.y - mapPinImage.height + 'px';
  mapPin.querySelector('img').setAttribute('src', element.author.avatar);

  return mapPin;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < listOfRentals.length; i++) {
  fragment.appendChild(getMapPin(listOfRentals[i]));
}

mapListElement.appendChild(fragment);
