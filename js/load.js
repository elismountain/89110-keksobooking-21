"use strict";

(function () {
  var URL = {
    LOAD: 'https://21.javascript.pages.academy/keksobooking/data',
    UPLOAD: 'https://21.javascript.pages.academy/keksobooking'
  };

  var StatusCode = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 10000;

  var RequestMethod = {
    GET: 'GET',
    POST: 'POST'
  };

  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var showError = function (message) {
    var errorMessageNode = errorMessageTemplate.cloneNode(true);
    errorMessageNode.querySelector('.error__message').textContent = message;
    window.form.addForm.appendChild(errorMessageNode);
  };

  var workWithServer = function (method, dataUrl, onSuccess, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        showError('При обращению к серверу произошла ошибка. Статус ответа: ${xhr.status} ${xhr.statusText}. Попробуйте перезагрузить страницу');
      }
    });
    xhr.addEventListener('error', () => {
      showError('Произошла ошибка соединения. Статус ответа: ${xhr.status} ${xhr.statusText}. Попробуйте перезагрузить страницу');
    });
    xhr.addEventListener('timeout', () => {
      showError('Запрос не успел выполниться за ${xhr.timeout}мс. Статус ответа: ${xhr.status} ${xhr.statusText}. Попробуйте перезагрузить страницу');
    });
    xhr.open(method, dataUrl);
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send(method === RequestMethod.GET ? '' : data);
  };

  window.load = {
    load: (onSuccess) => {
      workWithServer(RequestMethod.GET, URL.LOAD, onSuccess);
    },

    upload: (data, onSuccess) => {
      workWithServer(RequestMethod.POST, URL.UPLOAD, onSuccess, data);
    },
    showError
  };
})();
