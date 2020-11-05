'use strict';

(function () {
  var TITLES = [' Большая квартира', 'Маленькая квартира', 'Огромный дом', 'Маленький дом', 'Гостевой дом', 'Квартира на чердаке', 'Квартира в подвале', 'Хостел на 100 человек'];
  var TYPES = ['palace', 'flat', 'house', 'bungalow'];
  var TIME = ['12:00', '13:00', '14:00'];
  var FACILITY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var NUMBER_OF_USERS = 8;
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var createOffer = function (indexOffer) {
    var coordinatesLocation = [window.util.getRandomNumber(0, 900), window.util.getRandomNumber(130, 630)];
    return {
      'author': {
        'avatar': 'img/avatars/user' + String(indexOffer + 1).padStart(2, '0') + '.png'
      },

      'offer': {
        'title': TITLES[indexOffer],
        'address': coordinatesLocation[0] + ',' + coordinatesLocation[1],
        'price': window.util.getRandomNumber(0, 1000000),
        'type': window.util.getRandomElement(TYPES),
        'rooms': window.util.getRandomNumber(1, 10),
        'guests': window.util.getRandomNumber(1, 10),
        'checkin': window.util.getRandomElement(TIME),
        'checkout': window.util.getRandomElement(TIME),
        'features': window.util.getRandomArray(FACILITY),
        'description': 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
        'photos': window.util.getRandomArray(PHOTOS),
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

  var listOfRentals = [];

  // addObjects(NUMBER_OF_USERS);

  window.data = {
    listOfRentals: listOfRentals,
  };
})();
