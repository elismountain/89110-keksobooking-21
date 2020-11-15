"use strict";

const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const fillCard = function (element, mapCard) {
  const getValueTypeOffer = function () {
    if (element.offer.type === `palace`) {
      return `Дворец`;
    } else if (element.offer.type === `flat`) {
      return `Квартира`;
    } else if (element.offer.type === `house`) {
      return `Дом`;
    } else {
      return `Бунгало`;
    }
  };

  const createPhotosFragment = function (photosList) {
    const photosFragment = document.createDocumentFragment();

    photosList.forEach(function (photo) {
      const photoItem = document.createElement(`img`);
      photoItem.className = `popup__photo`;
      photoItem.width = 45;
      photoItem.height = 40;
      photoItem.alt = `Фотография жилья`;
      photoItem.src = photo;

      photosFragment.appendChild(photoItem);
    });

    return photosFragment;
  };

  const showFeatures = function () {
    for (let i = 0; i < features.length; i++) {
      const featureIcon = mapCard.querySelectorAll(`.popup__feature--` + features[i])[0];
      if (element.offer.features.includes(features[i])) {
        featureIcon.classList.remove(`hidden`);
      } else {
        featureIcon.classList.add(`hidden`);
      }
    }
  };

  showFeatures();


  const popupPhotos = mapCard.querySelector(`.popup__photos`);
  while (popupPhotos.firstChild) {
    popupPhotos.removeChild(popupPhotos.firstChild);
  }
  popupPhotos.appendChild(createPhotosFragment(element.offer.photos));

  mapCard.querySelector(`.popup__title`).textContent = element.offer.title;
  mapCard.querySelector(`.popup__text--address`).textContent = element.offer.address;
  mapCard.querySelector(`.popup__text--price`).textContent = element.offer.price + `₽/ночь`;
  mapCard.querySelector(`.popup__type`).textContent = getValueTypeOffer();
  mapCard.querySelector(`.popup__text--capacity`).textContent = element.offer.rooms + window.util.numDecline(element.offer.rooms, ` комната`, ` комнаты`, ` комнат`) + ` для ` + element.offer.guests + window.util.numDecline(element.offer.guests, ` гостя`, ` гостей`, ` гостей`);
  mapCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + element.offer.checkin + `, выезд до ` + element.offer.checkout;
  mapCard.querySelector(`.popup__description`).textContent = element.offer.description;
  mapCard.querySelector(`.popup__avatar`).setAttribute(`src`, element.author.avatar);
};


const createCard = function () {
  const cardTemplate = document.querySelector(`#card`).content;
  const mapCard = cardTemplate.querySelector(`.map__card`).cloneNode(true);
  mapCard.querySelector(`.popup__close`).addEventListener(`click`, function () {
    hideActiveCard();
  });


  const filtersContainer = document.querySelector(`.map__filters-container`);
  const nodeParent = filtersContainer.parentNode;
  nodeParent.insertBefore(mapCard, filtersContainer);
  return mapCard;
};

const mapCard = createCard();
mapCard.classList.add(`hidden`);

const show = function (element) {
  mapCard.classList.remove(`hidden`);
  fillCard(element, mapCard);

  const onKeyDown = function (e) {
    if (e.keyCode === window.util.ESC_KEYCODE) {
      hideActiveCard();
    }
    window.map.mainMap.removeEventListener(`keydown`, onKeyDown);
  };

  window.map.mainMap.addEventListener(`keydown`, onKeyDown);
};

const hideActiveCard = function () {
  mapCard.classList.add(`hidden`);
};

window.card = {
  createCard,
  fillCard,
  mapCard,
  show,
  hideActiveCard
};
