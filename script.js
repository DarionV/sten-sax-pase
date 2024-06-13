import {
  loadComputerFromStorage,
  loadPlayerFromStorage,
} from "./loadPlayer.js";
import { avatarDisplayController } from "./avatarDisplayController.js";
import { difficulties } from "./difficulty-db.js";
import { gameRenderer } from "./gameRenderer.js";

(function () {
  // -----------------------------------------------------------//
  let player = loadPlayerFromStorage();
  if (player.getName() === "") player.setName("Spelare");
  let computer = loadComputerFromStorage();

  let playerMoveDelayInSeconds = 0;
  let playerAnimationDurationInSeconds = 0;
  let selectionWindow = 0;

  let isPlaying = false;

  let RESULT_DELAY_IN_SECONDS = 0.5;
  let SCORE_LIMIT = 5;

  avatarDisplayController.initializeComputerAvatar(computer);
  avatarDisplayController.initializePlayerAvatar(player);

  // ------------------------------------------------------------- //

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

  const increasePlayerScore = () => {
    player.increaseScore();
    gameRenderer.renderPlayerScore(player.score);
  };
  const increaseComputerScore = () => {
    computer.increaseScore();
    gameRenderer.renderComputerScore(computer.score);
  };

  const resetScores = () => {
    player.resetScore();
    computer.resetScore();
    gameRenderer.renderComputerScore(computer.score);
    gameRenderer.renderPlayerScore(player.score);
  };

  //   0 = Sten, 1 = Sax, 2 = Påse
  const generateRandomMove = () => {
    return Math.floor(Math.random() * 3);
  };

  function makeComputerMove() {
    const move = generateRandomMove();
    gameRenderer.renderComputerMove(move);
    computer.selection = move;
  }

  function playRound(playerMove) {
    if (isPlaying) return;
    disableButtons();
    makePlayerMove(playerMove);
  }

  function startRound() {
    gameRenderer.hideStartRoundButton();
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
      gameRenderer.renderPlayerMove(player.selection);
    }, selectionWindow * 1000);

    setTimeout(() => {
      if (!isPlaying) autoLose();
      disableButtons();
      gameRenderer.hideTimer();
    }, selectionWindow * 1000);

    setTimeout(() => {
      evaluateResult();
    }, playerAnimationDurationInSeconds * 1000);

    setTimeout(() => {
      gameRenderer.showStartRoundButton();
    }, playerAnimationDurationInSeconds * 1000 + 1000);
  }

  function evaluateResult() {
    setTimeout(() => {
      switch (player.selection) {
        case 0:
          if (computer.selection === 1) lose();
          if (computer.selection === 2) win();
          break;
        case 1:
          if (computer.selection === 0) win();
          if (computer.selection === 2) lose();
          break;
        case 2:
          if (computer.selection === 0) lose();
          if (computer.selection === 1) win();
          break;
        default:
          break;
      }
    }, RESULT_DELAY_IN_SECONDS * 1000);
  }

  function isGameOver() {
    if (player.score === SCORE_LIMIT || computer.score === SCORE_LIMIT)
      return 1;
    else return 0;
  }

  function autoLose() {
    gameRenderer.flashScreen("red");
    switch (computer.selection) {
      case 0:
        makePlayerMove(2);
        gameRenderer.renderPlayerMove(2);
        break;
      case 1:
        makePlayerMove(0);
        gameRenderer.renderPlayerMove(0);
        break;
      case 2:
        makePlayerMove(1);
        gameRenderer.renderPlayerMove(1);
    }
  }

  function setDifficulty(difficulty) {
    selectionWindow = difficulties[difficulty].selectionWindow;
    playerAnimationDurationInSeconds =
      difficulties[difficulty].animationDuration + playerMoveDelayInSeconds;
    playerMoveDelayInSeconds = difficulties[difficulty].delay;
    gameRenderer.setPlayerAnimations(difficulties[difficulty].animations);
    document.querySelector(".timer").classList.add(`timer-${difficulty}`);
  }

  function initializeDifficulty() {
    switch (computer.name) {
      case "EasyBot":
        setDifficulty("easy");
        break;
      case "MediumBot":
        setDifficulty("medium");
        break;
      case "HardBot":
        setDifficulty("hard");
      default:
        break;
    }
  }

  function win() {
    player.increaseScore();
    gameRenderer.flashScreen("green");
    gameRenderer.renderPlayerScore(player.score);
    if (isGameOver()) gameRenderer.renderGameOverText("Du vann!");
  }

  function lose() {
    computer.increaseScore();
    gameRenderer.renderComputerScore(computer.score);
    if (isGameOver()) gameRenderer.renderGameOverText("Du förlorade");
  }

  function makePlayerMove(move) {
    player.selection = move;
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
  //---------------Initialize game-------------------------//

  initializeDifficulty();
  disableButtons();
  gameRenderer.renderCountDown();
  setTimeout(() => {
    gameRenderer.showStartRoundButton();
  }, 1500);
  gameRenderer.renderPlayerStartAnimation();
  // --------------------------------------------------------//

  return {
    increaseComputerScore,
    increasePlayerScore,
    resetScores,
    makeComputerMove,
    disableButtons,
    initializeDifficulty,
  };
})();
