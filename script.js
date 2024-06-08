import { bounceElement } from "./bounce.js";
import {
  loadComputerFromStorage,
  loadPlayerFromStorage,
} from "./loadPlayer.js";
import { avatarDisplayController } from "./avatarDisplayController.js";
import { difficulties } from "./difficulty-db.js";

const gameRenderer = (function () {
  const timeUpScreen = document.querySelector(".js-time-up-screen");
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

  function renderTimeUp() {
    console.log("time up");

    setTimeout(() => {
      timeUpScreen.classList.remove("time-up");
    }, 1000);
    timeUpScreen.classList.add("time-up");
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
    renderTimeUp,
    hideStartRoundButton,
    showStartRoundButton,
  };
})();

const gameController = (function () {
  let player = loadPlayerFromStorage();
  if (player.getName() === "") player.setName("Spelare");
  let computer = loadComputerFromStorage();

  avatarDisplayController.renderPlayerAvatar(player.getAvatar());
  avatarDisplayController.updatePlayerAvatarColors(
    player.backgroundColor,
    player.shadowColor
  );
  avatarDisplayController.updatePlayerName(player.getName());

  avatarDisplayController.renderComputerAvatar(computer.getAvatar());
  avatarDisplayController.updateComputerAvatarColors(
    computer.backgroundColor,
    computer.shadowColor
  );
  avatarDisplayController.updateComputerName(computer.getName());

  let playerMoveDelayInSeconds = 0;
  let playerAnimationDurationInSeconds = 0;
  let selectionWindow = 0;

  let playerScore = 0;
  let computerScore = 0;

  //   0 = Sten, 1 = Sax, 2 = Påse
  let computerSelection = 0;
  let playerSelection = 0;

  let isPlaying = false;

  let RESULT_DELAY_IN_SECONDS = 0.5;
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
      gameRenderer.renderPlayerMove(playerSelection);
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
      switch (playerSelection) {
        case 0:
          if (computerSelection === 1) lose();
          if (computerSelection === 2) win();
          break;
        case 1:
          if (computerSelection === 0) win();
          if (computerSelection === 2) lose();
          break;
        case 2:
          if (computerSelection === 0) lose();
          if (computerSelection === 1) win();
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

  function autoLose() {
    gameRenderer.renderTimeUp();
    switch (computerSelection) {
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

  function initializeDifficulty() {
    switch (computer.name) {
      case "EasyBot":
        selectionWindow = difficulties.easy.selectionWindow;
        playerAnimationDurationInSeconds =
          difficulties.easy.animationDuration + playerMoveDelayInSeconds;
        playerMoveDelayInSeconds = difficulties.easy.delay;
        gameRenderer.setPlayerAnimations(difficulties.easy.animations);
        document.querySelector(".timer").classList.add("timer-easy");
        break;
      case "MediumBot":
        selectionWindow = difficulties.medium.selectionWindow;
        playerAnimationDurationInSeconds =
          difficulties.medium.animationDuration + playerMoveDelayInSeconds;
        playerMoveDelayInSeconds = difficulties.medium.delay;
        gameRenderer.setPlayerAnimations(difficulties.medium.animations);
        document.querySelector(".timer").classList.add("timer-medium");
        break;
      case "HardBot":
        selectionWindow = difficulties.hard.selectionWindow;
        playerAnimationDurationInSeconds =
          difficulties.hard.animationDuration + playerMoveDelayInSeconds;
        playerMoveDelayInSeconds = difficulties.hard.delay;
        gameRenderer.setPlayerAnimations(difficulties.hard.animations);
        document.querySelector(".timer").classList.add("timer-hard");
      default:
        break;
    }
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
    initializeDifficulty,
  };
})();

(function () {
  gameController.initializeDifficulty();
  gameController.disableButtons();
  gameRenderer.renderCountDown();
  setTimeout(() => {
    gameRenderer.showStartRoundButton();
  }, 1500);
  gameRenderer.renderPlayerStartAnimation();
})();
