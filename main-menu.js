const menuRenderer = (function () {
  const playerAvatarContainer = document.querySelector(
    ".js-player-avatar-container"
  );
  const playerAvatar = document.querySelector(".js-player-avatar");
  const computerAvatarContainer = document.querySelector(
    ".js-computer-avatar-container"
  );

  function renderPlayerAvatar(avatar, color) {
    renderAvatar(playerAvatarContainer, playerAvatar, avatar, color);
  }

  function renderComputerAvatar(avatar, color) {
    renderAvatar(computerAvatarContainer, avatar, color);
  }

  function renderAvatar(container, img, avatar, color) {
    img.src = avatar;
    container.style.backgroundColor = color;
  }

  const getPlayerAvatar = () => playerAvatar.getAttribute("src");

  return { renderPlayerAvatar, renderComputerAvatar, getPlayerAvatar };
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
    "images/avatars/cat.png",
    "images/avatars/dog.png",
    "images/avatars/koala.png",
    "images/avatars/penguin.png",
    "images/avatars/monkey.png",
  ];

  playerAvatarNextButton.addEventListener("click", () => {
    menuRenderer.renderPlayerAvatar(getNextPlayerAvatar());
  });

  playerAvatarPrevButton.addEventListener("click", () => {
    menuRenderer.renderPlayerAvatar(getPrevPlayerAvatar());
  });

  function getNextPlayerAvatar() {
    if (getCurrentImageIndex() === playerAvatars.length - 1)
      return playerAvatars[0];
    else return playerAvatars[getCurrentImageIndex() + 1];
  }
  function getPrevPlayerAvatar() {
    if (getCurrentImageIndex() !== 0)
      return playerAvatars[getCurrentImageIndex() - 1];
    else return playerAvatars[playerAvatars.length - 1];
  }

  function getCurrentImageIndex() {
    return playerAvatars.indexOf(menuRenderer.getPlayerAvatar());
  }

  function getPrevComputerAvatar() {}
  function getNextComputerAvatar() {}

  function getNextAvatar() {}
  function getPrevAvatar() {}

  menuRenderer.renderPlayerAvatar("images/avatars/chicken.png");
})();

function createPlayer(name, avatar, color) {
  const getName = () => name;
  const getAvatar = () => avatar;
  const getColor = () => color;

  return { getName, getAvatar, getColor };
}
