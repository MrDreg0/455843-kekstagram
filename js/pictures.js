'use strict';

var NUMBER_OF_POSTS = 25;
var MAX_COMMENT_LENGTH = 2;

var postItem = document.querySelector('#picture').content.querySelector('.picture__link');

var optionsGeneratePost = {
  minLikes: 15,
  maxLikes: 200,
  maxComments: 2,
};

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

var getUrlPhoto = function (currentPost) {
  return 'photos/' + currentPost + '.jpg';
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

var generateArrPosts = function (amount, option) {
  for (var i = 0; i < amount; i++) {
    posts[i] = {};
    posts[i].url = getUrlPhoto(i + 1);
    posts[i].likes = getRandomNumber(option.minLikes, option.maxLikes);
    posts[i].comments = getArrComments(option.maxComments);
    posts[i].description = getRandomDescription();
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
  var postImages = document.querySelectorAll('.picture__img');
  for (var j = 0; j < postImages.length; j++) {
    postImages[j].dataset.index = j;
  }
};

var showElement = function (element) {
  element.classList.remove('hidden');
};

var hideElement = function (element) {
  element.classList.add('visually-hidden');
};

var closePopup = function (element) {
  element.classList.add('hidden');
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
  var closePostPopup = document.querySelector('#picture-cancel');
  closePostPopup.addEventListener('click', function () {
    closePopup(element);
  });
};

generateArrPosts(NUMBER_OF_POSTS, optionsGeneratePost);
renderWallOfPictures(posts);
hideElement(document.querySelector('.social__comment-count'));
hideElement(document.querySelector('.social__loadmore'));

var postSection = document.querySelector('section.pictures');
postSection.addEventListener('click', function (evt) {
  if (evt.target.tagName === 'IMG') {
    showPreviewPost(posts[evt.target.dataset.index]);
  }
});
