'use strict';

(function () {
  // slider animation ---------------------------------------------------------
  var MAX = 300;
  var MIN = 0;
  var PIN_SIZE = 20;
  var PIN_SIZE_HALF = PIN_SIZE / 2;
  var PCT = 100;
  var COEFFECIENT = 40;

  var priceChooser = document.querySelector('.filter-range');
  var priceChooserMin = priceChooser.querySelector('input[name="price-min"]');
  var priceChooserMax = priceChooser.querySelector('input[name="price-max"]');
  var priceChooserLine = priceChooser.querySelector('.filter-range__fill-line');
  var priceChooserLeftBtn = priceChooser.querySelector('.filter-range__btn--left');
  var priceChooserRightBtn = priceChooser.querySelector('.filter-range__btn--right');

  // --- initial coords and opositions ----------------------------------------
  var rangeDefaultPosition = function () {
    priceChooserLeftBtn.style.left = 0;
    priceChooserLeftBtn.style.zIndex = 1000;
    priceChooserMin.value = '0';
    priceChooserLine.style.width = MAX + 'px';
    priceChooserLine.style.left = MIN + PIN_SIZE_HALF + 'px';
    priceChooserRightBtn.style.left = MAX + 'px';
    priceChooserRightBtn.style.zIndex = 1000;
    priceChooserMax.value = '4000';
    priceChooserLine.style.right = MAX + 'px';
  };

  rangeDefaultPosition();

  // display the position in percent relative to pixels -----------------------
  var currentPositionInPct = function (currentPosition) {
    return Math.round((currentPosition * PCT / MAX) * COEFFECIENT);
  };
  // listener for left button -------------------------------------------------
  priceChooserLeftBtn.addEventListener('mousedown', function (evt) {
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

      var positionLeftShifted = (priceChooserLeftBtn.offsetLeft - shift.x);
      var positionBtnRight = (MAX - priceChooserRightBtn.offsetLeft);
      if (positionLeftShifted <= MIN) {
        positionLeftShifted = MIN;
        priceChooserMin.value = '0';
      } else if (positionLeftShifted >= MAX) {
        positionLeftShifted = MAX + 'px';
      } else if (positionLeftShifted >= priceChooserRightBtn.offsetLeft - PIN_SIZE) {
        positionLeftShifted = priceChooserRightBtn.offsetLeft - PIN_SIZE;
        priceChooserLeftBtn.style.left = positionLeftShifted + 'px';
      } else {
        priceChooserLeftBtn.style.left = positionLeftShifted + 'px';
        priceChooserMin.value = currentPositionInPct(positionLeftShifted);
      }
      priceChooserLine.style.left = positionLeftShifted + PIN_SIZE_HALF + 'px';
      priceChooserLine.style.width = (MAX - positionLeftShifted) - positionBtnRight + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var positionLeftUp = priceChooserLeftBtn.offsetLeft;
      if (positionLeftUp <= 1) {
        positionLeftUp = MIN;
        priceChooserMin.value = '0';
      }
      priceChooserMin.value = currentPositionInPct(positionLeftUp);

      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          priceChooserLeftBtn.removeEventListener('click', onClickPreventDefault);
        };
        priceChooserLeftBtn.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // listener for right button ------------------------------------------------
  priceChooserRightBtn.addEventListener('mousedown', function (evt) {
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
      var positionBtnLeft = priceChooserLeftBtn.offsetLeft;
      var positionRightStop = (MAX - priceChooserRightBtn.offsetLeft - shift.x);
      var positionRightShifted = (priceChooserRightBtn.offsetLeft - shift.x);
      if (positionRightShifted > MAX) {
        positionRightShifted = MAX + 'px';
      } else if (positionRightShifted <= MIN) {
        positionRightShifted = MIN + 'px';
      } else if (positionRightShifted <= priceChooserLeftBtn.offsetLeft + PIN_SIZE) {
        positionRightShifted = priceChooserLeftBtn.offsetLeft;
        priceChooserRightBtn.style.left = positionRightShifted + PIN_SIZE + 'px';
      } else {
        priceChooserRightBtn.style.left = positionRightShifted + 'px';
        priceChooserMax.value = currentPositionInPct(positionRightShifted);
      }
      if (positionRightStop <= MIN) {
        positionRightStop = MIN;
      } else {
        priceChooserLine.style.width = (MAX - positionBtnLeft) - positionRightStop + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var positionRightUp = priceChooserRightBtn.offsetLeft;
      priceChooserMax.value = currentPositionInPct(positionRightUp);
      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          priceChooserRightBtn.removeEventListener('click', onClickPreventDefault);
        };
        priceChooserRightBtn.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

}());
