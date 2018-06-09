'use strict';

var pictureItem = document.querySelector('#picture').content.querySelector('.picture__link');

var pictures = [];
var comments = [
  'Всё отлично!',
  'В целом все неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var descriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var getRandomComment = function (arr, amount) {
  var comment = '';

  for (var i = 1; i <= amount; i++) {
    var numberOfComment = getRandomNumber(0, arr.length - 1);
    comment += amount === 1 ? arr[numberOfComment] : arr[numberOfComment] + ' ';
  }
  return comment;
};

var getArrayComments = function (amount) {
  var arrayComments = [];
  for (var i = 0; i < amount; i++) {
    arrayComments[i] = getRandomComment(comments, lengthComment);
  }
  return arrayComments;
};

var getRandomDescription = function (arr, num) {
  return arr[num - 1];
};

var getObjectPicture = function (currentPicture) {
  var picture = {};
  picture.url = 'photos/' + currentPicture + '.jpg';
  picture.likes = numberOfLikes;
  picture.comments = getArrayComments(numberOfComments);
  picture.description = getRandomDescription(descriptions, numberOfDescription);

  return picture;
};

var makePicture = function (currentPicture) {
  var pictureElement = pictureItem.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = currentPicture.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = currentPicture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = currentPicture.comments;

  return pictureElement;
};

var renderWallOfPictures = function (arr) {
  var fragment = document.createDocumentFragment();
  var album = document.querySelector('.pictures');
  for (var j = 0; j < arr.length; j++) {
    fragment.appendChild(makePicture(arr[j]));
  }
  album.appendChild(fragment);
};

var showPreviewPicture = function (arr, currentElement) {
  var element = document.querySelector('.big-picture');
  element.classList.remove('hidden');
  element.querySelector('.big-picture__img img').src = arr[currentElement].url;
  element.querySelector('.likes-count').textContent = arr[currentElement].likes;
  var commentList = element.querySelectorAll('.social__comment');
  for (var k = 0; k < commentList.length; k++) {
    commentList[k].querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    commentList[k].querySelector('.social__text').textContent = arr[currentElement].comments[k];
  }
  element.querySelector('.social__caption').textContent = arr[currentElement].description;
};

var hideElement = function (element) {
  element.classList.add('visually-hidden');
};

for (var i = 1; i <= 25; i++) {
  var numberOfLikes = getRandomNumber(15, 200);
  var lengthComment = getRandomNumber(1, 2);
  var numberOfComments = getRandomNumber(2, 5);
  var numberOfDescription = getRandomNumber(1, descriptions.length);
  pictures[i - 1] = getObjectPicture(i);
}

renderWallOfPictures(pictures);
showPreviewPicture(pictures, 0);
hideElement(document.querySelector('.social__comment-count'));
hideElement(document.querySelector('.social__loadmore'));
