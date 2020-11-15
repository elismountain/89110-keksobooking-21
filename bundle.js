(()=>{"use strict";window.util={debounce:function(e){let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},numDecline:function(e,t,o,n){if(e>10&&1===Math.round(e%100/10))return n;switch(e%10){case 1:return t;case 2:case 3:case 4:return o;default:return n}},ENTER_KEYCODE:13,ESC_KEYCODE:27},(()=>{const e="https://21.javascript.pages.academy/keksobooking/data",t="https://21.javascript.pages.academy/keksobooking",o="GET",n="POST",i=document.querySelector("#error").content.querySelector(".error"),r=function(e){const t=i.cloneNode(!0);t.querySelector(".error__message").textContent=e,document.querySelector("main").appendChild(t),document.addEventListener("keydown",(function(e){e.keyCode!==window.util.ESC_KEYCODE&&e.keyCode!==window.util.ENTER_KEYCODE||(window.map.onResetMode(),t.parentNode.removeChild(t))})),t.addEventListener("click",(()=>{window.map.onResetMode(),window.form.addForm.reset(),window.card.hideActiveCard(),t.parentNode.removeChild(t)}))},d=function(e,t,n,i){const d=new XMLHttpRequest;d.responseType="json",d.addEventListener("load",(()=>{200===d.status?n(d.response):r(`При обращению к серверу произошла ошибка. Статус ответа: ${d.status} ${d.statusText}. Попробуйте перезагрузить страницу`)})),d.addEventListener("error",(()=>{r(`Произошла ошибка соединения. Статус ответа: ${d.status} ${d.statusText}. Попробуйте перезагрузить страницу`)})),d.addEventListener("timeout",(()=>{r(`Запрос не успел выполниться за ${d.timeout}мс. Статус ответа: ${d.status} ${d.statusText}. Попробуйте перезагрузить страницу`)})),d.open(e,t),d.timeout=1e4,d.send(e===o?"":i)};window.load={load:t=>{d(o,e,t)},upload:(e,o)=>{d(n,t,o,e)},showError:r}})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector(".ad-form__reset"),o="1000",n=function(){e.classList.add("map--faded"),window.form.addForm.classList.add("ad-form--disabled"),window.form.toggleDisabledOnForm(),window.form.addForm.reset(),window.images.resetImage(),window.card.hideActiveCard(),window.pin.removePins(),window.form.addForm.price.placeholder=o,window.form.addForm.price.min=o,function(){const t=e.offsetHeight/2,o=(e.offsetWidth-window.pin.mapPinMain.offsetWidth)/2;window.pin.mapPinMain.style.top=t+"px",window.pin.mapPinMain.style.left=o+"px"}(),window.form.fillForm()};t.addEventListener("click",n),window.map={onActiveMode:()=>{e.classList.remove("map--faded"),window.form.addForm.classList.remove("ad-form--disabled"),window.filter.updateSimillarPins(window.data.listOfRentals),window.form.toggleDisabledOnForm();const t=window.util.debounce((()=>{window.filter.updateSimillarPins(window.data.listOfRentals)}));window.form.formFiltersNode.addEventListener("change",t)},mainMap:e,onResetMode:n}})(),window.data={listOfRentals:[]},(()=>{const e=window.map.mainMap.querySelector(".map__pins"),t=document.querySelector("#pin").content,o=window.map.mainMap.querySelector(".map__pin--main"),n=function(e){window.data.listOfRentals=e,window.map.onActiveMode()};o.addEventListener("mousedown",(function(e){e.preventDefault();let t={x:e.clientX,y:e.clientY};const n=function(e){e.preventDefault();const n=t.x-e.clientX,i=t.y-e.clientY;t={x:e.clientX,y:e.clientY};let r=o.offsetTop-i,d=o.offsetLeft-n;const a=110-o.offsetHeight,s=610-o.offsetHeight;r<a?r=a:r>s&&(r=s);const c=-o.offsetWidth/2,l=window.map.mainMap.offsetWidth-o.offsetWidth/2;d<c?d=c:d>l&&(d=l),o.style.top=r+"px",o.style.left=d+"px",window.form.fillForm()},i=function(e){e.preventDefault(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",i)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",i)})),window.pin={getPinCoords:function(){let e=0,t=0;return window.form.addForm.classList.contains("ad-form--disabled")?(e=Math.round(o.offsetLeft+o.offsetWidth/2),t=Math.round(o.offsetTop+o.offsetHeight/2)):(e=Math.round(o.offsetLeft+o.offsetWidth/2),t=Math.round(o.offsetTop+20+o.offsetHeight),t<130?t=130:t>630&&(t=630)),String(e)+", "+String(t)},mapListElement:e,getMapPin:function(o){let n=t.querySelector(".map__pin").cloneNode(!0);const i=n.querySelector("img");return n.style.left=o.location.x-i.width/2+"px",n.style.top=o.location.y-i.height+"px",n.querySelector("img").setAttribute("src",o.author.avatar),n.addEventListener("click",(function(){window.card.show(o),e.appendChild(window.card.mapCard)})),n},initMapPinMain:function(){o.addEventListener("mousedown",(function(e){0===e.button&&window.load.load(n)})),o.addEventListener("mouseup",(function(e){0===e.button&&window.form.fillForm()})),o.addEventListener("keydown",(function(e){e.keyCode===window.util.ENTER_KEYCODE&&(window.load.load(n),window.form.fillForm())}))},removePins:()=>{const t=e.querySelectorAll(".map__pin:not(.map__pin--main)");for(let e of t)e.parentNode.removeChild(e)},createPins:function(e){const t=document.createDocumentFragment();for(let o=0;o<e.length;o++){const n=window.pin.getMapPin(e[o]);t.appendChild(n)}window.pin.mapListElement.appendChild(t)},mapPinMain:o}})(),(()=>{const e=["wifi","dishwasher","parking","washer","elevator","conditioner"],t=function(t,o){!function(){for(let n=0;n<e.length;n++){const i=o.querySelectorAll(".popup__feature--"+e[n])[0];t.offer.features.includes(e[n])?i.classList.remove("hidden"):i.classList.add("hidden")}}();const n=o.querySelector(".popup__photos");for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(function(e){const t=document.createDocumentFragment();return e.forEach((function(e){const o=document.createElement("img");o.className="popup__photo",o.width=45,o.height=40,o.alt="Фотография жилья",o.src=e,t.appendChild(o)})),t}(t.offer.photos)),o.querySelector(".popup__title").textContent=t.offer.title,o.querySelector(".popup__text--address").textContent=t.offer.address,o.querySelector(".popup__text--price").textContent=t.offer.price+"₽/ночь",o.querySelector(".popup__type").textContent="palace"===t.offer.type?"Дворец":"flat"===t.offer.type?"Квартира":"house"===t.offer.type?"Дом":"Бунгало",o.querySelector(".popup__text--capacity").textContent=t.offer.rooms+window.util.numDecline(t.offer.rooms," комната"," комнаты"," комнат")+" для "+t.offer.guests+window.util.numDecline(t.offer.guests," гостя"," гостей"," гостей"),o.querySelector(".popup__text--time").textContent="Заезд после "+t.offer.checkin+", выезд до "+t.offer.checkout,o.querySelector(".popup__description").textContent=t.offer.description,o.querySelector(".popup__avatar").setAttribute("src",t.author.avatar)},o=function(){const e=document.querySelector("#card").content.querySelector(".map__card").cloneNode(!0);e.querySelector(".popup__close").addEventListener("click",(function(){i()}));const t=document.querySelector(".map__filters-container");return t.parentNode.insertBefore(e,t),e},n=o();n.classList.add("hidden");const i=function(){n.classList.add("hidden")};window.card={createCard:o,fillCard:t,mapCard:n,show:function(e){n.classList.remove("hidden"),t(e,n);const o=function(e){e.keyCode===window.util.ESC_KEYCODE&&i(),window.map.mainMap.removeEventListener("keydown",o)};window.map.mainMap.addEventListener("keydown",o)},hideActiveCard:i}})(),(()=>{const e=window.map.mainMap.querySelector(".map__filters-container"),t=e.querySelector(".map__filters"),o=document.querySelector(".ad-form"),n=window.card.mapCard.querySelector(".popup__text--address"),i=o.querySelector("#address"),r=o.querySelector("#capacity"),d=o.querySelector("#room_number"),a=o.querySelectorAll("#price"),s=document.querySelector("main"),c=document.querySelector("#success").content.querySelector(".success"),l=o.querySelector("#title"),u={palace:1e4,house:5e3,flat:1e3,bungalow:0},f={1:[0,2,3],2:[0,3],3:[0],100:[1,2,3]},m=function(){window.map.onResetMode(),function(){const e=c.cloneNode(!0);s.appendChild(e),e.addEventListener("click",(()=>{e.parentNode.removeChild(e)})),document.addEventListener("keydown",(function(t){t.preventDefault(),t.keyCode!==window.util.ESC_KEYCODE&&t.keyCode!==window.util.ENTER_KEYCODE||e.parentNode.removeChild(e)}),{once:!0})}()};o.addEventListener("submit",(e=>{window.load.upload(new FormData(o),m),e.preventDefault()}));const p=()=>{const e=o.classList.contains("ad-form--disabled");Array.from(o.children).forEach((t=>{t.disabled=e,t.classList.toggle("disable-cursor")})),Array.from(t.children).forEach((t=>{t.disabled=e,t.classList.toggle("disable-cursor")}))},w=function(){let e=parseInt(d.value,10);r.querySelector('option[value="'+String(e%100)+'"]').selected=!0,function(e){for(let t of[0,1,2,3])r.querySelector('option[value="'+String(t)+'"]').disabled=e.includes(t)}(f[d.value]),v()},v=function(){"100"===d.value&&"0"!==r.value?r.setCustomValidity("Не для гостей"):"3"===d.value&&"0"===r.value?r.setCustomValidity("Количество гостей может быть 1, 2, 3"):"2"===d.value&&"0"===r.value||"2"===d.value&&"3"===r.value?r.setCustomValidity("Количество гостей может быть 1 или 2"):"1"===d.value&&"0"===r.value||"1"===d.value&&"2"===r.value||"1"===d.value&&"3"===r.value?r.setCustomValidity("Только для 1 гостя"):r.setCustomValidity(""),r.reportValidity()};d.addEventListener("change",w),d.addEventListener("input",w),o.addEventListener("change",(function(e){switch(e.target){case o.timein:case o.timeout:h(e);break;case o.type:o.price.min=u[o.type.value],o.price.placeholder=u[o.type.value]}}));const h=function(e){e.target===o.timein?o.timeout.value=o.timein.value:o.timein.value=o.timeout.value};window.form={addForm:o,formAddress:i,fillForm:function(){i.value=window.pin.getPinCoords()},roomSelect:d,initForm:function(){l.required=!0,l.minLength=30,l.maxLength=100,n.required="required",n.addEventListener("keydown",(function(e){e.keyCode!==window.util.ENTER_KEYCODE&&e.preventDefault()})),i.value=window.pin.getPinCoords(),p(),a.required=!0,a.value=1e3,a.min=0,a.max=1e6,v(),w()},toggleDisabledOnForm:p,mapFiltersNode:e,formFiltersNode:t}})(),(()=>{const e=Array.from(window.form.formFiltersNode.features),t=(e,t,o,n)=>"any"===window.form.formFiltersNode[e].value||n.offer[t]===window.form.formFiltersNode[e].value,o=e=>"any"===window.form.formFiltersNode["housing-type"].value||e.offer.type===window.form.formFiltersNode["housing-type"].value,n=(e,o,n)=>t("housing-rooms","rooms",0,e),i=(e,o,n)=>t("housing-guests","guests",0,e),r=e=>{switch(window.form.formFiltersNode["housing-price"].value){case"low":return e.offer.price<1e4;case"middle":return e.offer.price>=1e4&&e.offer.price<=5e4;case"high":return e.offer.price>5e4;default:return!0}},d=function(t){return!e.some((function(e){return e.checked&&!t.offer.features.includes(e.value)}))};window.filter={updateSimillarPins:function(e){const t=e.filter(o).filter(n).filter(i).filter(r).filter(d).slice(0,5);window.card.hideActiveCard(),window.pin.removePins(),window.pin.createPins(t)}}})(),window.pin.initMapPinMain(),window.form.initForm(),(()=>{const e=["gif","jpg","jpeg","png"],t=window.form.addForm.querySelector(".ad-form-header__input"),o=window.form.addForm.querySelector(".ad-form__input"),n=window.form.addForm.querySelector(".ad-form-header__preview img"),i=window.form.addForm.querySelector(".ad-form__photo img"),r={AVATAR:n.src,ROOM:""},d=(t,o)=>{const n=t.files[0],i=n.name.toLowerCase();if(e.some((function(e){return i.endsWith(e)}))){let e=new FileReader;e.addEventListener("load",(()=>{o.classList.remove("hidden"),o.src=e.result})),e.readAsDataURL(n)}};t.addEventListener("change",(()=>{d(t,n)})),o.addEventListener("change",(()=>{d(o,i)})),window.images={resetImage:function(){i.classList.add("hidden"),i.src=r.ROOM,n.src=r.AVATAR}}})()})();