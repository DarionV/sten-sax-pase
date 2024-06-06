import { playerAvatars, computerAvatars } from "./avatar-db.js";
import { bounceElement } from "./bounce.js";
import { Player } from "./Player.js";
import { loadPlayerFromStorage } from "./loadPlayer.js";

const displayController = (function () {
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
    bounceElement(container);
  }

  function updatePlayerAvatarColors(backgroundColor, shadowColor) {
    updateAvatarColors(playerAvatarContainer, backgroundColor, shadowColor);
  }

  function updatePlayerName(name) {
    document.querySelector(".js-player-name-input").value = name;
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
    updatePlayerName,
  };
})();

(function () {
  let player = {};
  let computer = {};

  loadPlayer();
  initializePlayer();
  intializeComputer();

  const playButton = document.querySelector(".js-play-button");
  playButton.addEventListener("click", storePlayer);

  const arrowButtons = document.querySelectorAll(".js-arrow-button");
  arrowButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleArrowButtonClick(button.id);
    });
  });

  function handleArrowButtonClick(buttonId) {
    switch (buttonId) {
      case "player-previous":
        gotoPrevPlayerAvatar();
        break;
      case "player-next":
        gotoNextPlayerAvatar();
        break;
      case "computer-next":
        gotoNextComputerAvatar();
        break;
      default:
        gotoPrevComputerAvatar();
        break;
    }
  }

  function loadPlayer() {
    if (localStorage.getItem("Player") !== null)
      player = loadPlayerFromStorage();
    else createStartingPlayer();
  }

  function initializePlayer() {
    updatePlayerAvatar(player);
    displayController.updatePlayerName(player.name);
  }

  function intializeComputer() {
    computer = new Player(
      "EasyBot",
      "images/robot_easy.png",
      "#6CC45E",
      "#699C65"
    );
  }

  function createStartingPlayer() {
    player = new Player(
      "Spelare",
      "images/avatars/chicken.png",
      "#D6C56B",
      "#8D8052"
    );
  }

  function gotoPrevPlayerAvatar() {
    updatePlayerAvatar(getPrevPlayerAvatar());
  }

  function gotoNextPlayerAvatar() {
    updatePlayerAvatar(getNextPlayerAvatar());
  }

  function updatePlayerAvatar(avatar) {
    displayController.renderPlayerAvatar(avatar.avatar);
    displayController.updatePlayerAvatarColors(
      avatar.backgroundColor,
      avatar.shadowColor
    );
    player.setAvatar(avatar.avatar);
    player.setBackgroundColor(avatar.backgroundColor);
    player.setShadowColor(avatar.shadowColor);
  }

  function gotoPrevComputerAvatar() {
    updateComputerAvatar(getPrevComputerAvatar());
  }

  function gotoNextComputerAvatar() {
    updateComputerAvatar(getNextComputerAvatar());
  }

  function updateComputerAvatar(avatar) {
    displayController.renderComputerAvatar(avatar.avatar);
    displayController.updateComputerAvatarColors(
      avatar.backgroundColor,
      avatar.shadowColor
    );
    displayController.updateComputerName(avatar.name);
    computer.setAvatar(avatar.avatar);
    computer.setName(avatar.name);
    computer.setBackgroundColor(avatar.backgroundColor);
    computer.setShadowColor(avatar.shadowColor);
  }

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
      if (avatar.avatar === displayController.getPlayerAvatar()) {
        return playerAvatars.indexOf(avatar);
      }
    }
  }

  function getCurrentComputerImageIndex() {
    for (const avatar of computerAvatars) {
      if (avatar.avatar === displayController.getComputerAvatar()) {
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

  function storePlayer() {
    const newPlayerName = document.querySelector(".js-player-name-input").value;
    player.setName(newPlayerName);
    localStorage.setItem("Player", JSON.stringify(player));
  }
})();
