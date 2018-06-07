'use strict';

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
    var numberOfComment = getRandomNumber(1, arr.length - 1);
    comment += arr[numberOfComment];
  }
  return comment;
};

var getRandomDescription = function (arr, num) {
  return arr[num - 1];
};

var getObjectpicture = function (currentPicture) {
  var picture = {};
  picture.url = 'photos/' + currentPicture + '.jpg';
  picture.likes = amountLikes;
  picture.comments = getRandomComment(comments, amountComments);
  picture.description = getRandomDescription(descriptions, numberOfDescription);

  return picture;
};

for (var i = 1; i <= 25; i++) {
  var amountLikes = getRandomNumber(15, 200);
  var amountComments = getRandomNumber(1, 2);
  var numberOfDescription = getRandomNumber(1, descriptions.length);
  pictures[i - 1] = getObjectpicture(i);
}

var pictureItem = document.querySelector('#picture').content.querySelector('.picture__link');

var makePictures = function (currentPicture) {
  var pictureElement = pictureItem.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = currentPicture.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = currentPicture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = currentPicture.comments;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
var album = document.querySelector('.pictures');
for (var i = 0; i < pictures.length; i++) {
  album.appendChild(makePictures(pictures[i]));
}


