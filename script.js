const gameRenderer = (function () {
  const computerMove = document.querySelector("#computer-move");
  const playerMoveRock = document.querySelector("#player-move-rock");
  const playerMovePaper = document.querySelector("#player-move-paper");
  const playerMoveScissors = document.querySelector("#player-move-scissors");

  const playerScore = document.querySelector("#player-score");
  const computerScore = document.querySelector("#computer-score");

  const timer = document.querySelector(".timer");
  // timer.style.animationDuration = "1s";
  console.log(timer.style.animationDuration);

  const renderPlayerScore = (value) => (playerScore.textContent = value);
  const renderComputerScore = (value) => (computerScore.textContent = value);

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
    // Kalla endast endRound vid första valet.
    if (hasMadeSecondChoice) return;
    setTimeout(() => {
      endRound();
    }, playerAnimationDurationInSeconds * 1000);
  }

  function startRound(playerMove) {
    if (hasMadeSecondChoice) return;

    if (hasMadeFirstChoice) {
      if (!allowSecondChoice) return;
      console.log("Second move");
      hasMadeSecondChoice = true;
      makePlayerMove(playerMove);
      return;
    }

    console.log("First move");

    makeComputerMove();
    hasMadeFirstChoice = true;

    setTimeout(() => {
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
    allowSecondChoice = false;
    gameRenderer.hideTimer();
  }

  function evaluateResult() {}

  function makePlayerMove(move) {
    playerSelection = move;
    gameRenderer.renderPlayerMove(move);
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
