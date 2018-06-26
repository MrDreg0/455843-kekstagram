'use strict';

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
      setDefaultEffectsImage(image);
      image.classList.add('effects__preview--' + evt.target.value);
      scalePin.addEventListener('mouseup', function () {
        var currentPinValue = parseInt(getComputedStyle(scalePin).left, 10);
        var filter = evt.target.value;
        image.style.filter = getFilterValue(filter, currentPinValue);
      });
    });
  }

  var getFilterValue = function (filter, value) {
    var scaleLine = previewUploadFile.querySelector('.scale__line');
    var maxPinValue = parseInt(getComputedStyle(scaleLine).width, 10);
    var maxFilterValue;
    var filterValue;

    switch (filter) {
      case 'chrome':
        maxFilterValue = 1;
        filterValue = 'grayscale(' + generateFilterValue(value, maxFilterValue, maxPinValue) + ')';
        break;
      case 'sepia':
        maxFilterValue = 1;
        filterValue = 'sepia(' + generateFilterValue(value, maxFilterValue, maxPinValue) + ')';
        break;
      case 'marvin':
        maxFilterValue = 100;
        filterValue = 'invert(' + generateFilterValue(value, maxFilterValue, maxPinValue) + '%)';
        break;
      case 'phobos':
        maxFilterValue = 3;
        filterValue = 'blur(' + generateFilterValue(value, maxFilterValue, maxPinValue) + 'px)';
        break;
      case 'heat':
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
  image.removeAttribute('class');
  image.style.filter = '';
};

fieldUploadFile.addEventListener('change', editImage);
