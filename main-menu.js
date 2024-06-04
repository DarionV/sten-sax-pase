import { playerAvatars, computerAvatars } from "./avatar-db.js";

class Player {
  constructor(name, avatar, color) {
    this.name = name;
    this.avatar = avatar;
    this.color = color;
  }
  getName = () => name;
  setName = (name) => (this.name = name);

  getAvatar = () => avatar;
  setAvatar = (avatar) => (this.avatar = avatar);

  getColor = () => color;
}

const menuRenderer = (function () {
  const playerAvatarContainer = document.querySelector(
    ".js-player-avatar-container"
  );
  const computerAvatarContainer = document.querySelector(
    ".js-computer-avatar-container"
  );

  const playerAvatar = document.querySelector(".js-player-avatar");
  const computerAvatar = document.querySelector(".js-computer-avatar");

  function renderPlayerAvatar(avatar, color) {
    renderAvatar(playerAvatarContainer, playerAvatar, avatar, color);
  }

  function renderComputerAvatar(avatar, color) {
    renderAvatar(computerAvatarContainer, computerAvatar, avatar, color);
  }

  function renderAvatar(container, img, avatar, color) {
    img.src = avatar;
    container.style.backgroundColor = color;
  }

  function updatePlayerAvatarColors(backgroundColor, shadowColor) {
    updateAvatarColors(playerAvatarContainer, backgroundColor, shadowColor);
  }

  function updateComputerAvatarColors(backgroundColor, shadowColor) {
    updateAvatarColors(computerAvatarContainer, backgroundColor, shadowColor);
  }

  function updateComputerName(newName) {
    document.querySelector(".js-computer-name").textContent = newName;
  }

  function updateAvatarColors(container, backgroundColor, shadowColor) {
    container.style.backgroundColor = backgroundColor;
    container.style.boxShadow = "0px 10px 0px" + shadowColor;
  }

  const getPlayerAvatar = () => playerAvatar.getAttribute("src");
  const getComputerAvatar = () => computerAvatar.getAttribute("src");

  return {
    renderPlayerAvatar,
    renderComputerAvatar,
    getPlayerAvatar,
    getComputerAvatar,
    updatePlayerAvatarColors,
    updateComputerAvatarColors,
    updateComputerName,
  };
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

  menuRenderer.renderPlayerAvatar("images/avatars/chicken.png");

  const player = new Player("Spelare", menuRenderer.getPlayerAvatar(), "red");

  playerAvatarNextButton.addEventListener("click", () => {
    const nextAvatar = getNextPlayerAvatar();
    menuRenderer.renderPlayerAvatar(nextAvatar.avatar);
    menuRenderer.updatePlayerAvatarColors(
      nextAvatar.backgroundColor,
      nextAvatar.shadowColor
    );
    player.setAvatar(nextAvatar.avatar);
  });

  playerAvatarPrevButton.addEventListener("click", () => {
    const prevAvatar = getPrevPlayerAvatar();
    menuRenderer.renderPlayerAvatar(prevAvatar.avatar);
    menuRenderer.updatePlayerAvatarColors(
      prevAvatar.backgroundColor,
      prevAvatar.shadowColor
    );
    player.setAvatar(prevAvatar.avatar);
  });

  computerAvatarNextButton.addEventListener("click", () => {
    const nextAvatar = getNextComputerAvatar();
    menuRenderer.renderComputerAvatar(nextAvatar.avatar);
    menuRenderer.updateComputerName(nextAvatar.name);
    menuRenderer.updateComputerAvatarColors(
      nextAvatar.backgroundColor,
      nextAvatar.shadowColor
    );
    // computer.setAvatar(nextAvatar.avatar);
  });

  computerAvatarPrevButton.addEventListener("click", () => {
    const nextAvatar = getPrevComputerAvatar();
    menuRenderer.renderComputerAvatar(nextAvatar.avatar);
    menuRenderer.updateComputerName(nextAvatar.name);
    menuRenderer.updateComputerAvatarColors(
      nextAvatar.backgroundColor,
      nextAvatar.shadowColor
    );
    // computer.setAvatar(nextAvatar.avatar);
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
    for (const avatar of playerAvatars) {
      if (avatar.avatar === menuRenderer.getPlayerAvatar()) {
        return playerAvatars.indexOf(avatar);
      }
    }
  }

  function getCurrentComputerImageIndex() {
    for (const avatar of computerAvatars) {
      if (avatar.avatar === menuRenderer.getComputerAvatar()) {
        return computerAvatars.indexOf(avatar);
      }
    }
  }

  function getPrevComputerAvatar() {
    if (getCurrentComputerImageIndex() !== 0)
      return computerAvatars[getCurrentComputerImageIndex() - 1];
    else return computerAvatars[computerAvatars.length - 1];
  }

  function getNextComputerAvatar() {
    if (getCurrentComputerImageIndex() === computerAvatars.length - 1)
      return computerAvatars[0];
    else return computerAvatars[getCurrentComputerImageIndex() + 1];
  }

  function getNextAvatar() {}
  function getPrevAvatar() {}
})();

// function createPlayer(name, avatar, color) {
//   const getName = () => name;
//   const setName = (name) => (this.name = name);

//   const getAvatar = () => avatar;
//   const setAvatar = (avatar) => (this.avatar = avatar);

//   const getColor = () => color;

//   return { getName, setName, getAvatar, setAvatar, getColor };
// }

const menuLoop = (function () {})();
