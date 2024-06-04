const menuRenderer = (function () {
  function renderPlayerAvatar() {}
  function renderComputerAvatar() {}

  function renderAvatar() {}

  return { renderPlayerAvatar, renderComputerAvatar };
})();

const menuController = (function () {
  const playButton = document.querySelector("js-play-button");

  const playerAvatarPrevButton = document.querySelectorAll(
    ".js-player-avatar-prev-button"
  );
  const playerAvatarNextButton = document.querySelectorAll(
    ".js-player-avatar-next-button"
  );
  const computerAvatarNextButton = document.querySelectorAll(
    ".js-computer-avatar-next-button"
  );
  const computerAvatarPrevButton = document.querySelectorAll(
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

function createPlayer(name, avatar) {
  const getName = () => name;
  const getAvatar = () => avatar;

  return { getName, getAvatar };
}
