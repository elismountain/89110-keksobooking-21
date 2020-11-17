"use strict";

const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const OFFER_TYPES = {
  "palace": `Дворец`,
  "flat": `Квартира`,
  "house": `Дом`,
  "bungalow": `Бунгало`
};

const PHOTO_HEIGHT = 40;
const PHOTO_WIDTH = 45;
const PHOTO_ALT = `Фотография жилья`;

const fillCard = (element, mapCard) => {
  const getValueTypeOffer = () => {
    return OFFER_TYPES[element.offer.type];
  };

  const createPhotosFragment = (photosList) => {
    const photosFragment = document.createDocumentFragment();

    photosList.forEach((photo) => {
      const photoItem = document.createElement(`img`);
      photoItem.className = `popup__photo`;
      photoItem.width = PHOTO_WIDTH;
      photoItem.height = PHOTO_HEIGHT;
      photoItem.alt = PHOTO_ALT;
      photoItem.src = photo;

      photosFragment.appendChild(photoItem);
    });

    return photosFragment;
  };

  const showFeatures = () => {
    for (let i = 0; i < FEATURES.length; i++) {
      const featureIcon = mapCard.querySelectorAll(`.popup__feature--` + FEATURES[i])[0];
      if (element.offer.features.includes(FEATURES[i])) {
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


const createCard = () => {
  const cardTemplate = document.querySelector(`#card`).content;
  const mapCard = cardTemplate.querySelector(`.map__card`).cloneNode(true);
  mapCard.querySelector(`.popup__close`).addEventListener(`click`, () => {
    hideActiveCard();
  });


  const filtersContainer = document.querySelector(`.map__filters-container`);
  const nodeParent = filtersContainer.parentNode;
  nodeParent.insertBefore(mapCard, filtersContainer);
  return mapCard;
};

const mapCard = createCard();
mapCard.classList.add(`hidden`);

const show = (element) => {
  mapCard.classList.remove(`hidden`);
  fillCard(element, mapCard);

  const onKeyDown = (evt) => {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      hideActiveCard();
    }
    window.map.mainMap.removeEventListener(`keydown`, onKeyDown);
  };

  window.map.mainMap.addEventListener(`keydown`, onKeyDown);
};

const hideActiveCard = () => {
  mapCard.classList.add(`hidden`);
};

window.card = {
  createCard,
  fillCard,
  mapCard,
  show,
  hideActiveCard
};
