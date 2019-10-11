'use strict';
(function () {
  var btnToggle = document.querySelector('.search__btn-toggle');
  var block = document.querySelector('.search__container');
  var form = block.querySelector('.search__form');
  var adultsCount = block.querySelector('input[name="input-adults"]');
  var kidsCount = block.querySelector('input[name="input-kids"]');
  var inputs = block.querySelectorAll('input');

  var isStorageSupport = true;
  var storageAdults = '';
  var storageKids = '';

  block.classList.add('search__container--hide');

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
        item.style.backgroundColor = 'rgba(255, 205, 210, 1)';
      } else {
        item.style.backgroundColor = 'rgba(200, 230, 201, 1)';
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
