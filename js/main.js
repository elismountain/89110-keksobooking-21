'use strict';

var TITLES = []; // где взять названия, в разметке не вижу
var TYPES = ['palace', 'flat', 'house', 'bungalow'];
var TIME = ['12:00', '13:00', '14:00']; // нужно только время или чекин чекаут , повторяются цифры
var FACILITY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_OF_USERS = 8;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
};

var getRandomArray = function (arr) { // эту функцию я стырила, но не до концапоняла, как оа работает
  var newArr = [];
  while (newArr.length < arr.length) {
    var randomElement = getRandomElement(arr);
    if (newArr.indexOf(randomElement) !== -1) {
      continue;
    }
    newArr.push(randomElement);
  }
  newArr = newArr.slice(0, getRandomNumber(0, newArr.length));
  return newArr;
};

var createOffer = function (indexOffer) {
  var coordinatesLocation = [getRandomNumber(300, 900), getRandomNumber(130, 630)]; // размер блока 1 координаты я не могу найти , поставила произвольные
  return {
    'author': {
      'avatar': 'img/avatars/user' + (indexOffer + 1) + '.png'
    }, // как это правильно можно записать ?

    'offer': {
      'title': TITLES[indexOffer],
      'address': coordinatesLocation[0] + ',' + coordinatesLocation[1],
      'price': getRandomNumber(0, 1000000),
      'type': getRandomElement(TYPES),
      'rooms': getRandomNumber(1, 10), // сколько комнат?
      'guests': getRandomNumber(1, 10), // тоже самое, где взять количество гостей
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
  var Objects = [];

  for (var i = 0; i < numberOfObjects; i++) {
    Objects.push(createOffer(i));
  }

  return Objects;
};

var listOfRentals = addObjects(NUMBER_OF_USERS);

// 2. У блока .map уберите класс .map--faded.

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// 3. На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте,
// и заполните их данными из массива. Итоговую разметку метки .map__pin можно взять из шаблона #pin.

var pins = document.querySelectorAll('.map__pin');
var mapTemplate = document.querySelector('#pin').content;
