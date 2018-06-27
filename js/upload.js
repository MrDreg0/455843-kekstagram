'use strict';

var Filter = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

var fieldUploadFile = document.querySelector('#upload-file');

var editImage = function () {
  var previewUploadFile = document.querySelector('.img-upload__overlay');
  var closeUploadButton = previewUploadFile.querySelector('#upload-cancel');
  var radioButtons = previewUploadFile.querySelectorAll('.effects__radio');
  var image = previewUploadFile.querySelector('.img-upload__preview img');
  var scalePin = previewUploadFile.querySelector('.scale__pin');
  var lastPinChangeListener = null;

  var createFilterListener = function (evt) {
    var filter = evt.target.value;
    if (lastPinChangeListener !== null) {
      scalePin.removeEventListener('mouseup', lastPinChangeListener);
    }
    lastPinChangeListener = createPinListener(filter);
    setDefaultEffectsImage(image);
    image.classList.add('effects__preview--' + evt.target.value);
    scalePin.addEventListener('mouseup', lastPinChangeListener);
  };

  window.showElement(previewUploadFile);
  for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('change', createFilterListener);
  }

  var createPinListener = function (filter) {
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
      case Filter.CHROME:
        maxFilterValue = 1;
        filterValue = 'grayscale(' + generateFilterValue(value, maxFilterValue, maxPinValue) + ')';
        break;
      case Filter.SEPIA:
        maxFilterValue = 1;
        filterValue = 'sepia(' + generateFilterValue(value, maxFilterValue, maxPinValue) + ')';
        break;
      case Filter.MARVIN:
        maxFilterValue = 100;
        filterValue = 'invert(' + generateFilterValue(value, maxFilterValue, maxPinValue) + '%)';
        break;
      case Filter.PHOBOS:
        maxFilterValue = 3;
        filterValue = 'blur(' + generateFilterValue(value, maxFilterValue, maxPinValue) + 'px)';
        break;
      case Filter.HEAT:
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
    for (var j = 0; j < radioButtons.length; j++) {
      radioButtons[j].removeEventListener('change', createFilterListener);
    }
    window.closePopup(previewUploadFile);
  });
};

var setDefaultEffectsImage = function (image) {
  image.className = '';
  image.style.filter = '';
};

fieldUploadFile.addEventListener('change', editImage);
