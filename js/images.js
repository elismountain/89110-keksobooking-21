"use strict";

var FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

var avatarImageChose = window.form.addForm.querySelector(`.ad-form-header__input`);
var roomImageChoose = window.form.addForm.querySelector(`.ad-form__input`);
var previewAvatarNode = window.form.addForm.querySelector(`.ad-form-header__preview img`);
var previewRoomNode = window.form.addForm.querySelector(`.ad-form__photo img`);

var defaultImage = {
  AVATAR: previewAvatarNode.src,
  ROOM: ``
};

var addImage = (imageChooserInput, previewImageNode) => {
  var image = imageChooserInput.files[0];
  var imageName = image.name.toLowerCase();

  var matches = FILE_TYPES.some(function (it) {
    return imageName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, () => {
      previewImageNode.classList.remove(`hidden`);
      previewImageNode.src = reader.result;
    });

    reader.readAsDataURL(image);
  }
};

avatarImageChose.addEventListener(`change`, () => {
  addImage(avatarImageChose, previewAvatarNode);
});

roomImageChoose.addEventListener(`change`, () => {
  addImage(roomImageChoose, previewRoomNode);
});

var resetImage = function () {
  previewRoomNode.classList.add(`hidden`);
  previewRoomNode.src = defaultImage.ROOM;
  previewAvatarNode.src = defaultImage.AVATAR;
};

window.images = {
  resetImage: resetImage
};
