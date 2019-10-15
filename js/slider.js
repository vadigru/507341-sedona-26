'use strict';
(function () {
  // slider animation ---------------------------------------------------------
  var MIN = 0;
  var MAX = 300;
  var PIN_SIZE = 20;
  var PIN_SIZE_HALF = PIN_SIZE / 2;
  var PCT = 100;
  var COEFFECIENT = 40;

  var slider = document.querySelector('.filter-range');
  var sliderMin = slider.querySelector('input[name="price-min"]');
  var sliderMax = slider.querySelector('input[name="price-max"]');
  var sliderLine = slider.querySelector('.filter-range__fill-line');
  var pinLeft = slider.querySelector('.filter-range__btn--left');
  var pinRight = slider.querySelector('.filter-range__btn--right');

  // --- initial coords and opositions ----------------------------------------
  var rangeDefaultPosition = function () {
    pinLeft.style.left = 0;
    pinLeft.style.zIndex = 1000;
    pinRight.style.left = MAX + 'px';
    pinRight.style.zIndex = 1000;
    sliderMin.value = '0';
    sliderMax.value = '4000';
    sliderLine.style.width = MAX + 'px';
    sliderLine.style.right = MAX + 'px';
    sliderLine.style.left = MIN + PIN_SIZE_HALF + 'px';
  };

  rangeDefaultPosition();

  // display the position in percent relative to pixels -----------------------
  var currentPositionInPct = function (currentPosition) {
    return Math.floor((currentPosition * PCT / MAX) * COEFFECIENT);
  };

  // Set position of buttons---------------------------------------------------
  var setPositionLeft = function (shift) {
    var shiftedLeft = (pinLeft.offsetLeft - shift);
    var positionRight = (MAX - pinRight.offsetLeft);

    if (shiftedLeft <= MIN) {
      shiftedLeft = MIN;
    } else if (shiftedLeft >= MAX) {
      shiftedLeft = MAX;
    } else if (shiftedLeft >= pinRight.offsetLeft) {
      shiftedLeft = pinRight.offsetLeft;
      pinLeft.style.left = shiftedLeft + 'px';
      pinLeft.style.zIndex = 1001;
    } else if ((pinRight.offsetLeft - shiftedLeft) <= PIN_SIZE_HALF) {
      shiftedLeft = shiftedLeft;
      pinLeft.style.left = shiftedLeft + 'px';
      pinLeft.style.zIndex = 1001;
    } else {
      pinLeft.style.left = shiftedLeft + 'px';
      pinLeft.style.zIndex = 1000;
    }

    sliderMin.value = currentPositionInPct(shiftedLeft);
    sliderLine.style.left = shiftedLeft + PIN_SIZE_HALF + 'px';
    sliderLine.style.width = (MAX - shiftedLeft) - positionRight + 'px';
  };

  var setPositionRight = function (shift) {
    var positionLeft = pinLeft.offsetLeft;
    var stopRight = (MAX - pinRight.offsetLeft - shift);
    var shiftedRight = (pinRight.offsetLeft - shift);

    if (shiftedRight >= MAX) {
      shiftedRight = MAX;
    } else if (shiftedRight <= MIN) {
      shiftedRight = MIN;
    } else if (shiftedRight <= pinLeft.offsetLeft) {
      shiftedRight = pinLeft.offsetLeft;
      pinRight.style.left = shiftedRight + 'px';
      pinRight.style.zIndex = 1001;
    } else {
      pinRight.style.left = shiftedRight + 'px';
      pinRight.style.zIndex = 1000;
    }

    sliderMax.value = currentPositionInPct(shiftedRight);
    sliderLine.style.width = (MAX - positionLeft) - stopRight + 'px';
  };

  // listener for left button -------------------------------------------------
  pinLeft.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
    };
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      setPositionLeft(shift.x);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          pinLeft.removeEventListener('click', onClickPreventDefault);
        };
        pinLeft.addEventListener('click', onClickPreventDefault);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // listener for right button ------------------------------------------------
  pinRight.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      setPositionRight(shift.x);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          pinRight.removeEventListener('click', onClickPreventDefault);
        };
        pinRight.addEventListener('click', onClickPreventDefault);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}());
