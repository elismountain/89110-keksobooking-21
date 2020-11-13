(()=>{"use strict";var e,t,o,r,n,i,a,d,s,l,u,c,f,m,p,w,v,y,h,g,E,_,S,C,L,q,F,b,D;e=function(e,t){return Math.floor(Math.random()*(t-e)+e)},t=function(t){return t[e(0,t.length)]},window.util={debounce:function(e){var t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},getRandomNumber:e,getRandomElement:t,getRandomArray:function(o){for(var r=[],n=e(1,o.length);r.length<n;){var i=t(o);-1===r.indexOf(i)&&r.push(i)}return r},numDecline:function(e,t,o,r){if(e>10&&1===Math.round(e%100/10))return r;switch(e%10){case 1:return t;case 2:case 3:case 4:return o;default:return r}},ENTER_KEYCODE:13,ESC_KEYCODE:27},o={LOAD:"https://21.javascript.pages.academy/keksobooking/data",UPLOAD:"https://21.javascript.pages.academy/keksobooking"},r={GET:"GET",POST:"POST"},n=document.querySelector("#error").content.querySelector(".error"),i=function(e){var t=n.cloneNode(!0);t.querySelector(".error__message").textContent=e,document.querySelector("main").appendChild(t),document.addEventListener("keydown",(function(e){"object"==typeof e&&(e.keyCode!==window.util.ESC_KEYCODE&&e.keyCode!==window.util.ENTER_KEYCODE||(window.map.onResetMode(),t.parentNode.removeChild(t)))})),t.addEventListener("click",(()=>{window.map.onResetMode(),window.form.addForm.reset(),window.card.hideActiveCard(),t.parentNode.removeChild(t)}))},a=function(e,t,o,n){var a=new XMLHttpRequest;a.responseType="json",a.addEventListener("load",(()=>{200===a.status?o(a.response):i(`При обращению к серверу произошла ошибка. Статус ответа: ${a.status} ${a.statusText}. Попробуйте перезагрузить страницу`)})),a.addEventListener("error",(()=>{i(`Произошла ошибка соединения. Статус ответа: ${a.status} ${a.statusText}. Попробуйте перезагрузить страницу`)})),a.addEventListener("timeout",(()=>{i(`Запрос не успел выполниться за ${a.timeout}мс. Статус ответа: ${a.status} ${a.statusText}. Попробуйте перезагрузить страницу`)})),a.open(e,t),a.timeout=1e4,a.send(e===r.GET?"":n)},window.load={load:e=>{a(r.GET,o.LOAD,e)},upload:(e,t)=>{a(r.POST,o.UPLOAD,t,e)},showError:i},d=document.querySelector(".map"),s=document.querySelector(".ad-form__reset"),l="1000",u=function(){d.classList.add("map--faded"),window.form.addForm.classList.add("ad-form--disabled"),window.form.toggleDisabledOnForm(),window.form.addForm.reset(),window.images.resetImage(),window.card.hideActiveCard(),window.pin.removePins(),window.form.addForm.price.placeholder=l,window.form.addForm.price.min=l,window.form.fillForm()},s.addEventListener("click",u),window.map={onActiveMode:()=>{d.classList.remove("map--faded"),window.form.addForm.classList.remove("ad-form--disabled"),window.filter.updateSimillarPins(window.data.listOfRentals),window.form.toggleDisabledOnForm();var e=window.util.debounce((()=>{window.filter.updateSimillarPins(window.data.listOfRentals)}));window.form.formFiltersNode.addEventListener("change",e)},mainMap:d,onResetMode:u},window.data={listOfRentals:[]},q=window.map.mainMap.querySelector(".map__pins"),F=document.querySelector("#pin").content,b=window.map.mainMap.querySelector(".map__pin--main"),D=function(e){window.data.listOfRentals=e,window.map.onActiveMode()},b.addEventListener("mousedown",(function(e){e.preventDefault();var t={x:e.clientX,y:e.clientY},o=function(e){e.preventDefault();var o=t.x-e.clientX,r=t.y-e.clientY;t={x:e.clientX,y:e.clientY};var n=b.offsetTop-r,i=b.offsetLeft-o;n<130?n=130:n>630&&(n=630);var a=-b.offsetWidth/2,d=window.map.mainMap.offsetWidth-b.offsetWidth/2;i<a?i=a:i>d&&(i=d),b.style.top=n+"px",b.style.left=i+"px",window.form.fillForm()},r=function(e){e.preventDefault(),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",r)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",r)})),window.pin={getPinCoords:function(){var e=0,t=0;return window.form.addForm.classList.contains("ad-form--disabled")?(e=Math.round(b.offsetLeft+b.offsetWidth/2),t=Math.round(b.offsetTop+b.offsetHeight/2)):(e=Math.round(b.offsetLeft+b.offsetWidth/2),t=Math.round(b.offsetTop+20+b.offsetHeight)),String(e)+", "+String(t)},mapListElement:q,getMapPin:function(e){var t=F.querySelector(".map__pin").cloneNode(!0),o=t.querySelector("img");return t.style.left=e.location.x-o.width/2+"px",t.style.top=e.location.y-o.height+"px",t.querySelector("img").setAttribute("src",e.author.avatar),t.addEventListener("click",(function(){window.card.show(e),q.appendChild(window.card.mapCard)})),t},initMapPinMain:function(){b.addEventListener("mousedown",(function(e){"object"==typeof e&&0===e.button&&window.load.load(D)})),b.addEventListener("mouseup",(function(e){"object"==typeof e&&0===e.button&&window.form.fillForm()})),b.addEventListener("keydown",(function(e){"object"==typeof e&&e.keyCode===window.util.ENTER_KEYCODE&&(window.load.load(D),window.form.fillForm())}))},removePins:()=>{var e=q.querySelectorAll(".map__pin:not(.map__pin--main)");for(let t of e)t.parentNode.removeChild(t)},createPins:function(e){for(var t=document.createDocumentFragment(),o=0;o<e.length;o++){var r=window.pin.getMapPin(e[o]);t.appendChild(r)}window.pin.mapListElement.appendChild(t)},mapPinMain:b},(()=>{var e=["wifi","dishwasher","parking","washer","elevator","conditioner"],t=function(t,o){!function(){for(var r=0;r<e.length;r++){var n=o.querySelectorAll(".popup__feature--"+e[r])[0];t.offer.features.includes(e[r])?n.classList.remove("hidden"):n.classList.add("hidden")}}();for(var r,n,i=o.querySelector(".popup__photos");i.firstChild;)i.removeChild(i.firstChild);i.appendChild((r=t.offer.photos,n=document.createDocumentFragment(),r.forEach((function(e){var t=document.createElement("img");t.className="popup__photo",t.width=45,t.height=40,t.alt="Фотография жилья",t.src=e,n.appendChild(t)})),n)),o.querySelector(".popup__title").textContent=t.offer.title,o.querySelector(".popup__text--address").textContent=t.offer.address,o.querySelector(".popup__text--price").textContent=t.offer.price+"₽/ночь",o.querySelector(".popup__type").textContent="palace"===t.offer.type?"Дворец":"flat"===t.offer.type?"Квартира":"house"===t.offer.type?"Дом":"Бунгало",o.querySelector(".popup__text--capacity").textContent=t.offer.rooms+window.util.numDecline(t.offer.rooms," комната"," комнаты"," комнат")+" для "+t.offer.guests+window.util.numDecline(t.offer.guests," гостя"," гостей"," гостей"),o.querySelector(".popup__text--time").textContent="Заезд после "+t.offer.checkin+", выезд до "+t.offer.checkout,o.querySelector(".popup__description").textContent=t.offer.description,o.querySelector(".popup__avatar").setAttribute("src",t.author.avatar)},o=function(){var e=document.querySelector("#card").content.querySelector(".map__card").cloneNode(!0);e.querySelector(".popup__close").addEventListener("click",(function(){n()})),window.map.mainMap.addEventListener("keydown",(function(e){"object"==typeof e&&e.keyCode===window.util.ESC_KEYCODE&&n()}));var t=document.querySelector(".map__filters-container");return t.parentNode.insertBefore(e,t),e},r=o();r.classList.add("hidden");var n=function(){r.classList.add("hidden")};window.card={createCard:o,fillCard:t,mapCard:r,show:function(e){r.classList.remove("hidden"),t(e,r)},hideActiveCard:n}})(),(()=>{var e=window.map.mainMap.querySelector(".map__filters-container"),t=e.querySelector(".map__filters"),o=document.querySelector(".ad-form"),r=window.card.mapCard.querySelector(".popup__text--address"),n=o.querySelector("#address"),i={palace:1e4,house:5e3,flat:1e3,bungalow:0},a=document.querySelector("main"),d=document.querySelector("#success").content.querySelector(".success"),s=function(){var e;window.map.onResetMode(),e=d.cloneNode(!0),a.appendChild(e),e.addEventListener("click",(()=>{e.parentNode.removeChild(e)})),document.addEventListener("keydown",(function(t){t.preventDefault(),"object"==typeof t&&(t.keyCode!==window.util.ESC_KEYCODE&&t.keyCode!==window.util.ENTER_KEYCODE||e.parentNode.removeChild(e))}),{once:!0})};o.addEventListener("submit",(e=>{window.load.upload(new FormData(o),s),e.preventDefault()}));var l=()=>{var e=o.classList.contains("ad-form--disabled");Array.from(o.children).forEach((t=>{t.disabled=e,t.classList.toggle("disable-cursor")})),Array.from(t.children).forEach((t=>{t.disabled=e,t.classList.toggle("disable-cursor")}))},u=o.querySelector("#title"),c=o.querySelectorAll("#price"),f=o.querySelector("#capacity"),m=o.querySelector("#room_number"),p=function(e){for(var t of[0,1,2,3])f.querySelector('option[value="'+String(t)+'"]').disabled=!1;for(t of e)f.querySelector('option[value="'+String(t)+'"]').disabled=!0},w=function(){if("100"===m.value)f.querySelector('option[value="0"]').selected=!0,p([1,2,3]);else{f.querySelector('option[value="'+String(m.value)+'"]').selected=!0;for(var e=[0],t=parseInt(m.value,10)+1;t<=3;t++)e.push(t);p(e)}v()},v=function(){"100"===m.value&&"0"!==f.value?f.setCustomValidity("Не для гостей"):"3"===m.value&&"0"===f.value?f.setCustomValidity("Количество гостей может быть 1, 2, 3"):"2"===m.value&&"0"===f.value||"2"===m.value&&"3"===f.value?f.setCustomValidity("Количество гостей может быть 1 или 2"):"1"===m.value&&"0"===f.value||"1"===m.value&&"2"===f.value||"1"===m.value&&"3"===f.value?f.setCustomValidity("Только для 1 гостя"):f.setCustomValidity(""),f.reportValidity()};m.addEventListener("change",w),m.addEventListener("input",w),o.addEventListener("change",(function(e){switch(e.target){case o.timein:case o.timeout:y(e);break;case o.type:o.price.min=i[o.type.value],o.price.placeholder=i[o.type.value]}}));var y=function(e){e.target===o.timein?o.timeout.value=o.timein.value:o.timein.value=o.timeout.value};window.form={addForm:o,formAddress:n,fillForm:function(){n.value=window.pin.getPinCoords()},roomSelect:m,initForm:function(){u.required=!0,u.minLength=30,u.maxLength=100,r.required="required",r.addEventListener("keydown",(function(e){e.keyCode!==window.util.ENTER_KEYCODE&&e.preventDefault()})),n.value=window.pin.getPinCoords(),l(),c.required=!0,c.value=1e3,c.min=0,c.max=1e6,v(),w()},toggleDisabledOnForm:l,mapFiltersNode:e,formFiltersNode:t}})(),c=Array.from(window.form.formFiltersNode.features),f=(e,t,o,r)=>"any"===window.form.formFiltersNode[e].value||parseInt(r.offer[t],10)===parseInt(window.form.formFiltersNode[e].value,10),m=e=>"any"===window.form.formFiltersNode["housing-type"].value||e.offer.type===window.form.formFiltersNode["housing-type"].value,p=(e,t,o)=>f("housing-rooms","rooms",0,e),w=(e,t,o)=>f("housing-guests","guests",0,e),v=e=>{switch(window.form.formFiltersNode["housing-price"].value){case"low":return e.offer.price<1e4;case"middle":return e.offer.price>=1e4&&e.offer.price<=5e4;case"high":return e.offer.price>5e4;default:return!0}},y=function(e){return!c.some((function(t){return t.checked&&!e.offer.features.includes(t.value)}))},window.filter={updateSimillarPins:function(e){var t=e.filter(m).filter(p).filter(w).filter(v).filter(y).slice(0,5);window.card.hideActiveCard(),window.pin.removePins(),window.pin.createPins(t)}},window.pin.initMapPinMain(),window.form.initForm(),h=["gif","jpg","jpeg","png"],g=window.form.addForm.querySelector(".ad-form-header__input"),E=window.form.addForm.querySelector(".ad-form__input"),_=window.form.addForm.querySelector(".ad-form-header__preview img"),S=window.form.addForm.querySelector(".ad-form__photo img"),C={AVATAR:_.src,ROOM:""},L=(e,t)=>{var o=e.files[0],r=o.name.toLowerCase();if(h.some((function(e){return r.endsWith(e)}))){let e=new FileReader;e.addEventListener("load",(()=>{t.classList.remove("hidden"),t.src=e.result})),e.readAsDataURL(o)}},g.addEventListener("change",(()=>{L(g,_)})),E.addEventListener("change",(()=>{L(E,S)})),window.images={resetImage:function(){S.classList.add("hidden"),S.src=C.ROOM,_.src=C.AVATAR}}})();
