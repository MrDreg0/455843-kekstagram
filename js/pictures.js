'use strict';

var NUMBER_OF_POSTS = 25;
var MIN_NUMBER_OF_LIKES = 15;
var MAX_NUMBER_OF_LIKES = 200;
var MAX_NUMBER_OF_COMMENTS = 2;
var MAX_COMMENT_LENGTH = 2;

var postItem = document.querySelector('#picture').content.querySelector('.picture__link');

var posts = [];

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
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getNumberOfLikes = function (min, max) {
  return getRandomNumber(min, max);
};

var getRandomComment = function (arr) {
  var commentLength = getRandomNumber(1, MAX_COMMENT_LENGTH);
  var comment = [];

  for (var i = 0; i < commentLength; i++) {
    var numberOfComment = getRandomNumber(0, arr.length - 1);
    comment[i] = arr[numberOfComment];
  }
  return comment.join(' ');
};

var getArrComments = function (amount) {
  var commentList = [];
  for (var i = 0; i < amount; i++) {
    commentList[i] = getRandomComment(comments);
  }
  return commentList;
};

var getRandomDescription = function () {
  return descriptions[getRandomNumber(0, descriptions.length - 1)];
};

var generatePost = function (currentPost, likes, commentList, description) {
  var post = {};
  post.url = 'photos/' + currentPost + '.jpg';
  post.likes = likes;
  post.comments = commentList;
  post.description = description;

  return post;
};

var generateArrPosts = function (amount, minLikes, maxLikes, maxComments) {
  for (var i = 1; i < amount + 1; i++) {
    posts[i - 1] = generatePost(i, getNumberOfLikes(minLikes, maxLikes), getArrComments(maxComments), getRandomDescription());
  }
};

var renderPost = function (arr) {
  var post = postItem.cloneNode(true);

  post.querySelector('.picture__img').src = arr.url;
  post.querySelector('.picture__stat--likes').textContent = arr.likes;
  post.querySelector('.picture__stat--comments').textContent = arr.comments.length;

  return post;
};

var renderWallOfPictures = function (arr) {
  var fragment = document.createDocumentFragment();
  var wall = document.querySelector('.pictures');
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPost(arr[i]));
  }
  wall.appendChild(fragment);
};

var showElement = function (element) {
  element.classList.remove('hidden');
};

var hideElement = function (element) {
  element.classList.add('visually-hidden');
};

var showPreviewPost = function (currentPost) {
  var element = document.querySelector('.big-picture');
  showElement(element);
  element.querySelector('.big-picture__img img').src = currentPost.url;
  element.querySelector('.likes-count').textContent = currentPost.likes;
  var commentList = element.querySelectorAll('.social__comment');
  for (var i = 0; i < commentList.length; i++) {
    commentList[i].querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    commentList[i].querySelector('.social__text').textContent = currentPost.comments[i];
  }
  element.querySelector('.social__caption').textContent = currentPost.description;
};

generateArrPosts(NUMBER_OF_POSTS, MIN_NUMBER_OF_LIKES, MAX_NUMBER_OF_LIKES, MAX_NUMBER_OF_COMMENTS);
renderWallOfPictures(posts);
showPreviewPost(posts[0]);
hideElement(document.querySelector('.social__comment-count'));
hideElement(document.querySelector('.social__loadmore'));
