import { bounceElement } from "./bounce.js";

export const gameRenderer = (function () {
  const flashContainer = document.querySelector(".js-flash-screen");
  const computerMove = document.querySelector("#computer-move");
  const playerMoveRock = document.querySelector("#player-move-rock");
  const playerMovePaper = document.querySelector("#player-move-paper");
  const playerMoveScissors = document.querySelector("#player-move-scissors");

  const playerScore = document.querySelector("#player-score");
  const computerScore = document.querySelector("#computer-score");

  const textOverlay = document.querySelector(".text-overlay");

  const startRoundButton = document.querySelector(".js-start-round-button");

  let computerAnimations = [
    "images/choices/computer_rock_fast.gif",
    "images/choices/computer_paper_fast.gif",
    "images/choices/computer_scissors_fast.gif",
  ];
  let playerAnimations = [];

  const setComputerAnimations = (array) => (computerAnimations = array);
  const setPlayerAnimations = (array) => (playerAnimations = array);

  const timer = document.querySelector(".timer");

  const renderPlayerScore = (value) => {
    bounceElement(playerScore);
    playerScore.textContent = value;
  };

  const renderComputerScore = (value) => {
    bounceElement(computerScore);
    computerScore.textContent = value;
  };

  function hideStartRoundButton() {
    startRoundButton.style.display = "none";
  }

  function showStartRoundButton() {
    startRoundButton.style.display = "inline";
  }

  const renderComputerMove = (move) => {
    switch (move) {
      case 0:
        computerMove.src = computerAnimations[0];
        break;
      case 1:
        computerMove.src = computerAnimations[1];
        break;
      case 2:
        computerMove.src = computerAnimations[2];
        break;
      default:
        console.log("Unable to render computer move");
        break;
    }
  };

  function renderGameOverText(message) {
    textOverlay.textContent = message;
    setTimeout(() => {
      // hideText();
    }, 2000);
  }

  function renderCountDown() {
    setTimeout(() => {
      renderGameOverText("KLARA");
      setTimeout(() => {
        renderGameOverText("FÄRDIGA");
      }, 400);
      setTimeout(() => {
        renderGameOverText("GÅ!");
      }, 800);
      setTimeout(() => {
        hideText();
      }, 1200);
    }, 200);
  }

  function renderPlayerStartAnimation() {
    document.querySelector("#player-rock-container").style.zIndex = "10";
    playerMoveRock.src = "images/choices/player_rock.gif";
  }

  function reloadPlayerAnimations() {
    playerMoveRock.src = playerAnimations[0];
    playerMovePaper.src = playerAnimations[1];
    playerMoveScissors.src = playerAnimations[2];
  }

  function hideTimer() {
    timer.style.display = "none";
  }

  function renderTimer() {
    timer.style.display = "inline";
  }

  const hideText = () => {
    textOverlay.textContent = "";
  };

  const renderPlayerMove = (move) => {
    document.querySelector("#player-rock-container").style.zIndex = "1";
    document.querySelector("#player-paper-container").style.zIndex = "1";
    document.querySelector("#player-scissors-container").style.zIndex = "1";

    switch (move) {
      case 0:
        document.querySelector("#player-rock-container").style.zIndex = "10";
        break;
      case 1:
        document.querySelector("#player-paper-container").style.zIndex = "10";
        break;
      case 2:
        document.querySelector("#player-scissors-container").style.zIndex =
          "10";
        break;
      default:
        break;
    }
  };

  function flashScreen(color) {
    if (color === "red") flashContainer.style.backgroundColor = "red";
    if (color === "green") flashContainer.style.backgroundColor = "green";

    setTimeout(() => {
      flashContainer.classList.remove("flash");
      flashContainer.style.backgroundColor = "unset";
    }, 1000);
    flashContainer.classList.add("flash");
  }

  return {
    renderComputerScore,
    renderPlayerScore,
    renderComputerMove,
    renderPlayerMove,
    reloadPlayerAnimations,
    renderTimer,
    hideTimer,
    renderGameOverText,
    hideText,
    renderCountDown,
    renderPlayerStartAnimation,
    setComputerAnimations,
    setPlayerAnimations,
    flashScreen,
    hideStartRoundButton,
    showStartRoundButton,
  };
})();
