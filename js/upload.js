'use strict';

var ResizeValues = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

var Filter = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

var HashTagOption = {
  FIRST_SYMBOL: '#',
  MIN_LENGTH: 2,
  MAX_LENGTH: 20,
  MAX_QUANTITY: 5
};

var HashTagError = {
  MUST_START_WITH_HASH: 'Хеш-тег должен начинаться с символа \"#\".',
  TOO_SHORT: 'Слишком короткий хеш-тег.',
  TOO_LARGE_LENGTH: 'Максимальная длинна хеш-тега 20 символов.',
  TOO_LARGE_QUANTITY: 'Максимальное количество хеш-тегов 5.',
  DUPLICATE_VALUES: 'Использованы повторяющиеся хеш-теги.'
};

var ESC_KEYCODE = 27;

var fieldUploadFile = document.querySelector('#upload-file');

var editImage = function () {
  var DEFAULT_SCALE_VALUE = ResizeValues.MAX;

  var previewUploadFile = document.querySelector('.img-upload__overlay');
  var closeUploadButton = previewUploadFile.querySelector('#upload-cancel');
  var radioButtons = previewUploadFile.querySelectorAll('.effects__radio');
  var previewImageBlock = previewUploadFile.querySelector('.img-upload__preview');
  var image = previewImageBlock.querySelector('img');
  var scalePin = previewUploadFile.querySelector('.scale__pin');
  var resizeField = previewUploadFile.querySelector('.img-upload__resize');
  var resizeButtonMinus = resizeField.querySelector('.resize__control--minus');
  var resizeButtonPlus = resizeField.querySelector('.resize__control--plus');
  var resizeTextArea = resizeField.querySelector('.resize__control--value');
  var lastScaleValue;
  var lastPinChangeListener = null;

  var setScaleForImg = function (value) {
    previewImageBlock.style.transform = getScaleValue(value);
  };

  var getScaleValue = function (value) {
    var scaleValue;
    lastScaleValue = value;
    scaleValue = 'scale(' + value / 100 + ')';
    return scaleValue;
  };

  setScaleForImg(DEFAULT_SCALE_VALUE);

  var onButtonMinusClick = function () {
    if (lastScaleValue !== ResizeValues.MAX) {
      lastScaleValue += ResizeValues.STEP;
      setScaleForImg(lastScaleValue);
      resizeTextArea.value = lastScaleValue + '%';
    }
  };

  var onButtonPlusClick = function () {
    if (lastScaleValue !== ResizeValues.MIN) {
      lastScaleValue -= ResizeValues.STEP;
      setScaleForImg(lastScaleValue);
      resizeTextArea.value = lastScaleValue + '%';
    }
  };

  resizeButtonPlus.addEventListener('click', onButtonMinusClick);
  resizeButtonMinus.addEventListener('click', onButtonPlusClick);

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

  var onFormEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (evt.target.className === 'text__hashtags' || evt.target.className === 'text__description') {
        return;
      }
      closeUploadForm();
    }
  };

  var closeUploadForm = function () {
    setDefaultEffectsImage(image);
    for (var j = 0; j < radioButtons.length; j++) {
      radioButtons[j].removeEventListener('change', createFilterListener);
    }
    closeUploadButton.removeEventListener('click', closeUploadForm);
    document.removeEventListener('keydown', onFormEscPress);
    fieldUploadFile.value = null;
    window.closePopup(previewUploadFile);
    resizeButtonPlus.removeEventListener('click', onButtonMinusClick);
    resizeButtonMinus.removeEventListener('click', onButtonPlusClick);
  };

  document.addEventListener('keydown', onFormEscPress);
  closeUploadButton.addEventListener('click', closeUploadForm);
};

var setDefaultEffectsImage = function (image) {
  image.className = '';
  image.style.filter = '';
};

var areaHashtag = document.querySelector('.text__hashtags');

areaHashtag.addEventListener('change', function () {
  areaHashtag.setCustomValidity('');
  var arrHashtags = areaHashtag.value.split(' ');

  var findErrorHashtagField = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      var currentElement = arr[i].toLowerCase();
      var array = arr.slice();

      var findHashtagCopy = function (element) {
        return element.toLowerCase() === currentElement;
      };

      if (arr[i].charAt(0) !== HashTagOption.FIRST_SYMBOL) {
        showErrorValidityHashtag(HashTagError.MUST_START_WITH_HASH);
        return;
      } else if (arr[i].length < HashTagOption.MIN_LENGTH) {
        showErrorValidityHashtag(HashTagError.TOO_SHORT);
        return;
      } else if (arr[i].length > HashTagOption.MAX_LENGTH) {
        showErrorValidityHashtag(HashTagError.TOO_LARGE_LENGTH);
        return;
      }
      if (array.some(findHashtagCopy)) {
        showErrorValidityHashtag(HashTagError.DUPLICATE_VALUES);
        return;
      }
      array.splice(i, 1);
    }
    if (arrHashtags.length > HashTagOption.MAX_QUANTITY) {
      showErrorValidityHashtag(HashTagError.TOO_LARGE_QUANTITY);
      return;
    }
  };

  var showErrorValidityHashtag = function (message) {
    areaHashtag.setCustomValidity(message);
  };
  findErrorHashtagField(arrHashtags);
});

fieldUploadFile.addEventListener('change', editImage);
