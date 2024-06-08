import { bounceElement } from "./bounce.js";
import { Player } from "./Player.js";
import {
  loadComputerFromStorage,
  loadPlayerFromStorage,
} from "./loadPlayer.js";
import { avatarDisplayController } from "./avatarDisplayController.js";

const gameRenderer = (function () {
  const computerMove = document.querySelector("#computer-move");
  const playerMoveRock = document.querySelector("#player-move-rock");
  const playerMovePaper = document.querySelector("#player-move-paper");
  const playerMoveScissors = document.querySelector("#player-move-scissors");

  const playerScore = document.querySelector("#player-score");
  const computerScore = document.querySelector("#computer-score");

  const textOverlay = document.querySelector(".text-overlay");

  const timer = document.querySelector(".timer");
  // timer.style.animationDuration = "1s";
  console.log(timer.style.animationDuration);

  const renderPlayerScore = (value) => {
    bounceElement(playerScore);
    playerScore.textContent = value;
  };

  const renderComputerScore = (value) => {
    bounceElement(computerScore);
    computerScore.textContent = value;
  };

  const renderComputerMove = (move) => {
    switch (move) {
      case 0:
        computerMove.src = "/images/choices/computer_rock_fast.gif";
        break;
      case 1:
        computerMove.src = "/images/choices/computer_paper_fast.gif";
        break;
      case 2:
        computerMove.src = "/images/choices/computer_scissors_fast.gif";
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
    playerMoveRock.src = "/images/choices/player_rock.gif";
  }

  function reloadPlayerAnimations() {
    playerMoveRock.src = "/images/choices/player_rock_easy.gif";
    playerMovePaper.src = "/images/choices/player_paper_easy.gif";
    playerMoveScissors.src = "/images/choices/player_scissors_easy.gif";
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
  };
})();

const gameController = (function () {
  let player = loadPlayerFromStorage();
  let computer = loadComputerFromStorage();

  avatarDisplayController.renderPlayerAvatar(player.avatar);
  avatarDisplayController.updatePlayerAvatarColors(
    player.backgroundColor,
    player.shadowColor
  );
  avatarDisplayController.updatePlayerName(player.name);

  avatarDisplayController.renderComputerAvatar(computer.avatar);
  avatarDisplayController.updateComputerAvatarColors(
    computer.backgroundColor,
    computer.shadowColor
  );
  avatarDisplayController.updateComputerName(computer.name);

  let playerMoveDelayInSeconds = 0.7;
  let playerAnimationDurationInSeconds = playerMoveDelayInSeconds + 2;

  let playerScore = 0;
  let computerScore = 0;

  //   0 = Sten, 1 = Sax, 2 = Påse
  let computerSelection = 0;
  let playerSelection = 0;

  let isPlaying = false;

  let RESULT_DELAY_IN_SECONDS = 0.5;
  let ROUND_END_DELAY_IN_SECONDS = 1.5;
  let SCORE_LIMIT = 5;

  const startRoundButton = document.querySelector(".js-start-round-button");
  startRoundButton.addEventListener("click", () => {
    startRound();
  });

  const exitButton = document.querySelector(".js-exit-button");
  exitButton.addEventListener("click", gotoMainMenu);

  const buttons = document.querySelectorAll(".choice-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      playRound(+button.id);
    });
  });

  document.addEventListener("keypress", (e) => {
    if (e.key == "f") playRound(0);
    if (e.key == "g") playRound(1);
    if (e.key == "h") playRound(2);
  });

  const getPlayerScore = () => playerScore;
  const getComputerScore = () => computerScore;

  const getPlayerSelection = () => playerSelection;
  const getComputerSelection = () => computerSelection;

  const setPlayerSelection = (value) => (playerSelection = value);
  const setComputerSelection = (value) => (computerSelection = value);

  const increasePlayerScore = () => {
    playerScore++;
    gameRenderer.renderPlayerScore(playerScore);
  };
  const increaseComputerScore = () => {
    computerScore++;
    gameRenderer.renderComputerScore(computerScore);
  };

  const resetScores = () => {
    playerScore = 0;
    computerScore = 0;
    gameRenderer.renderComputerScore(computerScore);
    gameRenderer.renderPlayerScore(playerScore);
  };

  //   0 = Sten, 1 = Sax, 2 = Påse
  const generateRandomMove = () => {
    return Math.floor(Math.random() * 3);
  };

  function makeComputerMove() {
    const move = generateRandomMove();
    gameRenderer.renderComputerMove(move);
    computerSelection = move;
  }

  function playRound(playerMove) {
    if (isPlaying) return;
    disableButtons();
    makePlayerMove(playerMove);
  }

  function startRound() {
    enableButtons();
    if (isGameOver()) resetScores();
    makeComputerMove();
    gameRenderer.renderTimer();
    gameRenderer.hideText();

    setTimeout(() => {
      gameRenderer.reloadPlayerAnimations();
      gameRenderer.renderPlayerMove(0);
    }, playerMoveDelayInSeconds * 1000);

    setTimeout(() => {
      gameRenderer.renderPlayerMove(playerSelection);
      console.log("nu");
    }, 2200);

    setTimeout(() => {
      evaluateResult();
      gameRenderer.hideTimer();
    }, playerAnimationDurationInSeconds * 1000);
  }

  function evaluateResult() {
    setTimeout(() => {
      switch (playerSelection) {
        case 0:
          // if (computerSelection === 0) tie();
          if (computerSelection === 1) lose();
          if (computerSelection === 2) win();
          break;
        case 1:
          if (computerSelection === 0) win();
          // if (computerSelection === 1) tie();
          if (computerSelection === 2) lose();
          break;
        case 2:
          if (computerSelection === 0) lose();
          if (computerSelection === 1) win();
          // if (computerSelection === 2) tie();
          break;
        default:
          break;
      }
    }, RESULT_DELAY_IN_SECONDS * 1000);
  }

  function isGameOver() {
    if (playerScore === SCORE_LIMIT || computerScore === SCORE_LIMIT) return 1;
    else return 0;
  }

  function win() {
    playerScore++;
    gameRenderer.renderPlayerScore(playerScore);
    if (isGameOver()) gameRenderer.renderGameOverText("Du vann!");
  }

  function lose() {
    computerScore++;
    gameRenderer.renderComputerScore(computerScore);
    if (isGameOver()) gameRenderer.renderGameOverText("Du förlorade");
  }

  function makePlayerMove(move) {
    playerSelection = move;
  }

  function disableButtons() {
    isPlaying = true;
    document.querySelector(".choices-container").classList.add("disabled");
    for (const button of buttons) {
      button.classList.add("disabled");
    }
  }

  function enableButtons() {
    isPlaying = false;
    document.querySelector(".choices-container").classList.remove("disabled");
    for (const button of buttons) {
      button.classList.remove("disabled");
    }
  }

  function gotoMainMenu() {
    location.href = "/index.html";
  }

  return {
    getComputerScore,
    getPlayerScore,
    increaseComputerScore,
    increasePlayerScore,
    resetScores,
    makeComputerMove,
    getPlayerSelection,
    getComputerSelection,
    setPlayerSelection,
    setComputerSelection,
    disableButtons,
  };
})();

const gameLoop = (function () {
  gameController.disableButtons();
  gameRenderer.hideTimer();
  gameRenderer.renderCountDown();
  // gameController.resetScores();
  gameRenderer.renderPlayerStartAnimation();
})();
