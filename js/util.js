'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomElement = function (arr) {
    return arr[getRandomNumber(0, arr.length)];
  };

  var getRandomArray = function (arr) {
    var newArr = [];
    var newArrLen = getRandomNumber(1, arr.length);

    while (newArr.length < newArrLen) {
      var randomElement = getRandomElement(arr);
      if (newArr.indexOf(randomElement) === -1) {
        newArr.push(randomElement);
      }
    }
    return newArr;
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

  var debounce = function (cb) {
    var lastTimeout = null;
    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    debounce: debounce,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getRandomArray: getRandomArray,
    numDecline: numDecline,
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
