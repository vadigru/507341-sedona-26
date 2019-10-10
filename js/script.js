'use strict';
(function () {
  var btnToggle = document.querySelector('.search__btn-toggle');
  var block = document.querySelector('.search__container');
  var form = block.querySelector('.search__form');
  var dateIn = block.querySelector('input[name="date-in"]');
  var dateOut = block.querySelector('input[name="date-out"]');
  var adultsCount = block.querySelector('input[name="input-adults"]');
  var kidsCount = block.querySelector('input[name="input-kids"]');

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
    if (!dateIn.value || !dateOut.value || !adultsCount.value
      || adultsCount.value === '0') {
      evt.preventDefault();
      block.classList.remove('search__container--error');
      void block.offsetWidth;
      block.classList.add('search__container--error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('adults', adultsCount.value);
        localStorage.setItem('kids', kidsCount.value);
      }
    }
  };

  window.addEventListener('keydown', onEscClose);
  btnToggle.addEventListener('click', onClickToggle);
  form.addEventListener('submit', onSubmitFormHandle);

}());
