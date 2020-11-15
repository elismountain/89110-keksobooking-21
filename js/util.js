"use strict";

const ENTER_KEYCODE = 13;
const ESC_KEYCODE = 27;
const DEBOUNCE_INTERVAL = 500;


const numDecline = function (num, nominative, genitiveSingular, genitivePlural) {
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

const debounce = function (cb) {
  const lastTimeout = null;
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
  debounce,
  numDecline,
  ENTER_KEYCODE,
  ESC_KEYCODE
};
