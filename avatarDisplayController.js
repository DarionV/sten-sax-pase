import { bounceElement } from "./bounce.js";

export const avatarDisplayController = (function () {
  const playerAvatarContainer = document.querySelector(
    ".js-player-avatar-container"
  );
  const computerAvatarContainer = document.querySelector(
    ".js-computer-avatar-container"
  );

  const playerAvatar = document.querySelector(".js-player-avatar");
  const computerAvatar = document.querySelector(".js-computer-avatar");

  function renderPlayerAvatar(avatar, shouldBounce = false) {
    renderAvatar(
      playerAvatarContainer,
      playerAvatar,
      avatar,

      shouldBounce
    );
  }

  function renderComputerAvatar(avatar, shouldBounce = false) {
    renderAvatar(computerAvatarContainer, computerAvatar, avatar, shouldBounce);
  }

  function renderAvatar(container, img, avatar, shouldBounce) {
    img.src = avatar;

    if (shouldBounce) bounceElement(container);
  }

  function updatePlayerAvatarColors(backgroundColor, shadowColor) {
    updateAvatarColors(playerAvatarContainer, backgroundColor, shadowColor);
  }

  function updatePlayerName(name) {
    const nameInput = document.querySelector(".js-player-name-input");
    if (nameInput !== null) nameInput.value = name;
    else document.querySelector(".js-player-name").textContent = name;
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
