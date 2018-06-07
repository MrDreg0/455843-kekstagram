var photos = [];

var getObjectPhoto = function (currentPhoto) {
    var  photo = {};
    photo.url = 'photos/' + currentPhoto + '.jpg';

    return photo;
};

for (var i = 1; i <= 25; i++) {
    photos[i - 1] = getObjectPhoto(i);
};
