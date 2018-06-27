'use strict';

var FILTER_CHROME = 'chrome';
var FILTER_SEPIA = 'sepia';
var FILTER_MARVIN = 'marvin';
var FILTER_PHOBOS = 'phobos';
var FILTER_HEAT = 'heat';

var fieldUploadFile = document.querySelector('#upload-file');

var editImage = function () {
  var previewUploadFile = document.querySelector('.img-upload__overlay');
  var closeUploadButton = previewUploadFile.querySelector('#upload-cancel');
  var radioButtons = previewUploadFile.querySelectorAll('.effects__radio');
  var image = previewUploadFile.querySelector('.img-upload__preview img');
  var scalePin = previewUploadFile.querySelector('.scale__pin');

  window.showElement(previewUploadFile);
  for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('change', function (evt) {
      var filter = evt.target.value;
      var listener = addPinListener(filter);
      scalePin.removeEventListener('mouseup', listener);
      setDefaultEffectsImage(image);
      image.classList.add('effects__preview--' + evt.target.value);
      scalePin.addEventListener('mouseup', listener);
    });
  }

  var addPinListener = function (filter) {
    var onPinChange = function () {
      var currentPinValue = scalePin.offsetLeft;
      image.style.filter = getFilterValue(filter, currentPinValue);
    };
    return onPinChange;
  };

  var getFilterValue = function (filter, value) {
    var scaleLine = previewUploadFile.querySelector('.scale__line');
    var maxPinValue = scaleLine.offsetWidth;
    var maxFilterValue;
    var filterValue;

    switch (filter) {
      case FILTER_CHROME:
        maxFilterValue = 1;
        filterValue = 'grayscale(' + generateFilterValue(value, maxFilterValue, maxPinValue) + ')';
        break;
      case FILTER_SEPIA:
        maxFilterValue = 1;
        filterValue = 'sepia(' + generateFilterValue(value, maxFilterValue, maxPinValue) + ')';
        break;
      case FILTER_MARVIN:
        maxFilterValue = 100;
        filterValue = 'invert(' + generateFilterValue(value, maxFilterValue, maxPinValue) + '%)';
        break;
      case FILTER_PHOBOS:
        maxFilterValue = 3;
        filterValue = 'blur(' + generateFilterValue(value, maxFilterValue, maxPinValue) + 'px)';
        break;
      case FILTER_HEAT:
        maxFilterValue = 3;
        filterValue = 'brightness(' + generateFilterValue(value, maxFilterValue, maxPinValue) + ')';
        break;
    }
    return filterValue;
  };

  var generateFilterValue = function (currentPinValue, maxFilterValue, maxPinValue) {
    return (maxFilterValue * currentPinValue) / maxPinValue;
  };

  closeUploadButton.addEventListener('click', function () {
    setDefaultEffectsImage(image);
    window.closePopup(previewUploadFile);
  });
};

var setDefaultEffectsImage = function (image) {
  image.className = '';
  image.style.filter = '';
};

fieldUploadFile.addEventListener('change', editImage);
