"use strict";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const avatarImageChose = window.form.addForm.querySelector(`.ad-form-header__input`);
const roomImageChoose = window.form.addForm.querySelector(`.ad-form__input`);
const previewAvatarNode = window.form.addForm.querySelector(`.ad-form-header__preview img`);
const previewRoomNode = window.form.addForm.querySelector(`.ad-form__photo img`);

const defaultImage = {
  AVATAR: previewAvatarNode.src,
  ROOM: ``
};

const addImage = (imageChooserInput, previewImageNode) => {
  const image = imageChooserInput.files[0];
  const imageName = image.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
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

const resetImage = () => {
  previewRoomNode.classList.add(`hidden`);
  previewRoomNode.src = defaultImage.ROOM;
  previewAvatarNode.src = defaultImage.AVATAR;
};

window.images = {
  resetImage
};
