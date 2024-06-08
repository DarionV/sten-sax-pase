import { playerAvatars, computerAvatars } from "./avatar-db.js";

import { Player } from "./Player.js";
import { loadPlayerFromStorage } from "./loadPlayer.js";
import { avatarDisplayController } from "./avatarDisplayController.js";

(function () {
  let player = loadPlayer();
  let computer = {};

  initializePlayer();
  intializeComputer();

  const tutorialButton = document.querySelector(".js-tutorial-button");
  tutorialButton.addEventListener("click", showTutorial);

  const startGameButton = document.querySelector(".js-start-game-button");
  startGameButton.addEventListener("click", startGame);

  const playButton = document.querySelector(".js-play-button");
  playButton.addEventListener("click", () => {
    if (localStorage.getItem("hasViewedTutorial")) {
      startGame();
    } else {
      showTutorial();
      localStorage.setItem("hasViewedTutorial", "true");
    }
  });

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

  function startGame() {
    storePlayer();
    location.href = "/game.html";
  }

  function showTutorial() {
    document.querySelector(".js-tutorial-screen").style.visibility = "visible";
  }

  function loadPlayer() {
    if (localStorage.getItem("Player") !== null) return loadPlayerFromStorage();
    else return createStartingPlayer();
  }

  function initializePlayer() {
    updatePlayerAvatar(player);
    avatarDisplayController.updatePlayerName(player.name);
  }

  function intializeComputer() {
    computer = new Player(
      "EasyBot",
      "images/avatars/robot_easy.png",
      "#6CC45E",
      "#699C65"
    );
  }

  function createStartingPlayer() {
    return new Player(
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
    avatarDisplayController.renderPlayerAvatar(avatar.avatar);
    avatarDisplayController.updatePlayerAvatarColors(
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
    avatarDisplayController.renderComputerAvatar(avatar.avatar);
    avatarDisplayController.updateComputerAvatarColors(
      avatar.backgroundColor,
      avatar.shadowColor
    );
    avatarDisplayController.updateComputerName(avatar.name);
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
      if (avatar.avatar === avatarDisplayController.getPlayerAvatar()) {
        return playerAvatars.indexOf(avatar);
      }
    }
  }

  function getCurrentComputerImageIndex() {
    for (const avatar of computerAvatars) {
      if (avatar.avatar === avatarDisplayController.getComputerAvatar()) {
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
    localStorage.setItem("Computer", JSON.stringify(computer));
  }
})();
