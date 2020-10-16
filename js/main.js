'use strict';

var TITLES = [' Большая квартира', 'Маленькая квартира', 'Огромный дом', 'Маленький дом', 'Гостевой дом', 'Квартира на чердаке', 'Квартира в подвале', 'Хостел на 100 человек'];
var TYPES = ['palace', 'flat', 'house', 'bungalow'];
var TIME = ['12:00', '13:00', '14:00'];
var FACILITY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_OF_USERS = 8;
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
      'photos': getRandomElement(PHOTOS),
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

  mapCard.querySelector('.popup__title').textContent = element.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = element.offer.address;
  mapCard.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').textContent = getValueTypeOffer();
  mapCard.querySelector('h4').nextElementSibling.textContent = element.offer.rooms + ' для ' + element.offer.guests + 'гостей';
  mapCard.querySelector('.popup__features').previousElementSibling.textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
  mapCard.querySelector('.popup__description').textContent = element.offer.description;
  mapCard.querySelector('.popup__avatar').setAttribute('src', element.author.avatar);
  mapCard.querySelector('.popup__photos').setAttribute('src', element.offer.photos);

};

var createCard = function () {
  var cardTemplate = document.querySelector('#card').content;
  var mapCard = cardTemplate.querySelector('.map__card').cloneNode(true);
  fillCard(listOfRentals[0], mapCard);
  mapCard.querySelector('.popup__close').addEventListener('click', function () {
    mapCard.parentNode.removeChild(mapCard);
  });
  var before = document.querySelector('.map__filters-container');
  var nodeParent = before.parentNode;
  nodeParent.insertBefore(mapCard, before);

  return mapCard;
};

var mapCard = createCard();

var getMapPin = function (element) {
  var mapPin = template.querySelector('.map__pin').cloneNode(true);
  var mapPinImage = mapPin.querySelector('img');

  mapPin.style.left = element.location.x - (mapPinImage.width / 2) + 'px';
  mapPin.style.top = element.location.y - mapPinImage.height + 'px';
  mapPin.querySelector('img').setAttribute('src', element.author.avatar);

  mapPin.addEventListener('click', function () {
    fillCard(element, mapCard);
    mapListElement.appendChild(mapCard);
  });

  return mapPin;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < listOfRentals.length; i++) {
  fragment.appendChild(getMapPin(listOfRentals[i]));
}

mapListElement.appendChild(fragment);
