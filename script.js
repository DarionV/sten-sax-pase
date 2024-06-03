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
    playerScore.style.animation = "none";
    // Trigga reflow, så att animationen körs på nytt
    playerScore.offsetHeight;
    playerScore.style.animation = "bounceIn 1s";
    playerScore.textContent = value;
  };

  const renderComputerScore = (value) => {
    computerScore.style.animation = "none";
    // Trigga reflow, så att animationen körs på nytt
    computerScore.offsetHeight;
    computerScore.style.animation = "bounceIn 1s";
    computerScore.textContent = value;
  };

  const renderComputerMove = (move) => {
    switch (move) {
      case 0:
        computerMove.src = "/images/choices/computer_rock.gif";
        break;
      case 1:
        computerMove.src = "/images/choices/computer_paper.gif";
        break;
      case 2:
        computerMove.src = "/images/choices/computer_scissors.gif";
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
  };
})();

const gameController = (function () {
  let playerMoveDelayInSeconds = 0.7;
  let playerAnimationDurationInSeconds = playerMoveDelayInSeconds + 2;

  let playerScore = 0;
  let computerScore = 0;

  //   0 = Sten, 1 = Sax, 2 = Påse
  let computerSelection = 0;
  let playerSelection = 0;

  let hasMadeFirstChoice = false;
  let hasMadeSecondChoice = false;
  let allowSecondChoice = false;
  let secondChoiceTimerInSeconds = 1.6;

  let isPlaying = false;

  let RESULT_DELAY_IN_SECONDS = 0.5;
  let ROUND_END_DELAY_IN_SECONDS = 1.5;
  let SCORE_LIMIT = 5;

  const buttons = document.querySelectorAll(".choice-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      playRound(+button.id);
    });
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
    startRound(playerMove);
    gameRenderer.hideText();
    if (isGameOver()) resetScores();
    // Kalla endast endRound vid första valet.
    if (hasMadeSecondChoice || isPlaying) return;
    isPlaying = true;
    setTimeout(() => {
      evaluateResult();
    }, playerAnimationDurationInSeconds * 1000);
    setTimeout(() => {
      endRound();
    }, (playerAnimationDurationInSeconds + ROUND_END_DELAY_IN_SECONDS) * 1000);
  }

  function startRound(playerMove) {
    if (hasMadeSecondChoice) return;

    if (hasMadeFirstChoice) {
      if (!allowSecondChoice) return;
      console.log("Second move");
      hasMadeSecondChoice = true;
      disableButtons();
      makePlayerMove(playerMove);
      return;
    }

    console.log("First move");

    makeComputerMove();
    hasMadeFirstChoice = true;

    setTimeout(() => {
      setTimeout(() => {
        disableSecondChoice();
      }, secondChoiceTimerInSeconds * 1000);

      gameRenderer.renderTimer();
      gameRenderer.reloadPlayerAnimations();
      makePlayerMove(playerMove);
      allowSecondChoice = true;
    }, playerMoveDelayInSeconds * 1000);
  }

  function endRound() {
    console.log("Round end");
    hasMadeFirstChoice = false;
    hasMadeSecondChoice = false;
    isPlaying = false;
    // evaluateResult();
    enableButtons();
  }

  function disableSecondChoice() {
    allowSecondChoice = false;
    gameRenderer.hideTimer();
    disableButtons();
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
    gameRenderer.renderPlayerMove(move);
  }

  function disableButtons() {
    for (const button of buttons) {
      button.classList.add("disabled");
    }
  }

  function enableButtons() {
    for (const button of buttons) {
      button.classList.remove("disabled");
    }
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
  };
})();

const gameLoop = (function () {
  gameRenderer.hideTimer();
  gameController.resetScores();
})();
