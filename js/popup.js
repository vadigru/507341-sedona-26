'use strict';
(function () {
  var btnToggle = document.querySelector('.search__btn-toggle');
  var block = document.querySelector('.search__container');
  var form = block.querySelector('.search__form');
  var adultsCount = block.querySelector('input[name="input-adults"]');
  var kidsCount = block.querySelector('input[name="input-kids"]');
  var inputs = block.querySelectorAll('input');

  var mapContainer = document.querySelector('.map');
  var mapStatic = mapContainer.querySelector('IMG');

  var mapInteractive = document.createElement('iframe');

  var isStorageSupport = true;
  var storageAdults = '';
  var storageKids = '';

  block.classList.add('search__container--hide');

  mapContainer.removeChild(mapStatic);
  mapContainer.appendChild(mapInteractive);
  mapInteractive.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d707478.5249824972!2d-111.95179305361327!3d34.53963496499407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872da132f942b00d%3A0x5548c523fa6c8efd!2sSedona%2C%20AZ%2086336%2C%20USA!5e0!3m2!1sen!2slv!4v1569730942957!5m2!1sen!2slv';
  mapInteractive.title = 'Местонахождение города седона';
  mapInteractive.width = '1200';
  mapInteractive.height = '594';
  mapInteractive.style.border = '0';

  try {
    storageAdults = localStorage.getItem('adults');
    storageKids = localStorage.getItem('kids');
  } catch (err) {
    isStorageSupport = false;
  }

  if (storageAdults || storageKids) {
    adultsCount.value = storageAdults;
    kidsCount.value = storageKids;
  }

  [].forEach.call(inputs, function (item) {
    item.required = false;
  });

  var onEscClose = function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      block.classList.add('search__container--hide');
      block.classList.remove('search__container--error');
      window.removeEventListener('keydown', onEscClose);
      btnToggle.focus();
    }
  };

  var onClickToggle = function (evt) {
    evt.preventDefault();
    block.classList.toggle('search__container--hide');
    if (!block.classList.contains('search__container--hide')) {
      window.addEventListener('keydown', onEscClose);
      block.classList.remove('search__container--error');
    } else {
      window.removeEventListener('keydown', onEscClose);
    }
  };

  var onSubmitFormHandle = function (evt) {
    [].forEach.call(inputs, function (item) {
      if (!item.value ||
        (item.name === 'input-adults' && item.value <= 0) ||
        (item.name === 'input-kids' && item.value < 0)) {
        evt.preventDefault();
        block.classList.remove('search__container--error');
        void block.offsetWidth;
        block.classList.add('search__container--error');
        item.style.boxShadow = 'inset 0 0 0 2px rgba(255, 205, 210, 1)';
      } else {
        item.style.boxShadow = 'inset 0 0 0 2px rgba(200, 230, 201, 1)';
      }
    });
    if (isStorageSupport) {
      localStorage.setItem('adults', adultsCount.value);
      localStorage.setItem('kids', kidsCount.value);
    }
  };

  window.addEventListener('keydown', onEscClose);
  btnToggle.addEventListener('click', onClickToggle);
  form.addEventListener('submit', onSubmitFormHandle);
}());
