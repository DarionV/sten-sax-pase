const menuRenderer = (function () {
  const playerAvatarContainer = document.querySelector(
    ".js-player-avatar-container"
  );
  const playerAvatar = document.querySelector(".js-player-avatar");
  const computerAvatarContainer = document.querySelector(
    ".js-computer-avatar-container"
  );

  function renderPlayerAvatar(avatar, color) {
    console.log("rendering player avatar");
    renderAvatar(playerAvatarContainer, playerAvatar, avatar, color);
  }
  function renderComputerAvatar(avatar, color) {
    renderAvatar(computerAvatarContainer, avatar, color);
  }

  function renderAvatar(container, img, avatar, color) {
    img.src = avatar;
    container.style.backgroundColor = color;
  }

  return { renderPlayerAvatar, renderComputerAvatar };
})();

const menuController = (function () {
  const playButton = document.querySelector("js-play-button");

  const playerAvatarPrevButton = document.querySelector(
    ".js-player-avatar-prev-button"
  );
  const playerAvatarNextButton = document.querySelector(
    ".js-player-avatar-next-button"
  );
  const computerAvatarNextButton = document.querySelector(
    ".js-computer-avatar-next-button"
  );
  const computerAvatarPrevButton = document.querySelector(
    ".js-computer-avatar-prev-button"
  );

  const playerAvatars = [
    "images/avatars/bee.png",
    "images/avatars/bird.png",
    "images/avatars/chicken.png",
    "images/avatars/cow.png",
    "images/avatars/fish.png",
    "images/avatars/pig.png",
  ];

  playerAvatarNextButton.addEventListener("click", getNextPlayerAvatar);

  function getNextPlayerAvatar() {}
  function getPrevPlayerAvatar() {}

  function getPrevComputerAvatar() {}
  function getNextComputerAvatar() {}

  function getNextAvatar() {}
  function getPrevAvatar() {}
})();

function createPlayer(name, avatar, color) {
  const getName = () => name;
  const getAvatar = () => avatar;
  const getColor = () => color;

  return { getName, getAvatar, getColor };
}

menuRenderer.renderPlayerAvatar("/images/avatars/chicken.png");
