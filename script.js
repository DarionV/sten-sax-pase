const gameRenderer = (function () {
  const computerMove = document.querySelector("#computer-move");
  const playerMoveRock = document.querySelector("#player-move-rock");
  const playerMovePaper = document.querySelector("#player-move-paper");
  const playerMoveScissors = document.querySelector("#player-move-scissors");

  const playerScore = document.querySelector("#player-score");
  const computerScore = document.querySelector("#computer-score");

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

    // setTimeout(() => {
    //   playerMoveScissors.remove();
    // }, 1800);
  };

  return {
    renderComputerScore,
    renderPlayerScore,
    renderComputerMove,
    renderPlayerMove,
    reloadPlayerAnimations,
  };
})();

const gameController = (function () {
  let playerMoveDelayInSeconds = 0.3;

  let playerScore = 0;
  let computerScore = 0;

  //   0 = Sten, 1 = Sax, 2 = Påse
  let computerSelection = 0;
  let playerSelection = 0;

  let hasMadeFirstChoice = false;
  let hasMadeSecondChoice = false;

  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // makeComputerMove();
      switch (button.id) {
        case "rock-button":
          startRound(0);
          break;
        case "paper-button":
          startRound(1);
          break;
        case "scissors-button":
          startRound(2);
          break;
        default:
          break;
      }
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

  function startRound(playerMove) {
    if (hasMadeSecondChoice) return;

    if (hasMadeFirstChoice) {
      hasMadeSecondChoice = true;
      makePlayerMove(playerMove);
      return;
    }

    makeComputerMove();
    hasMadeFirstChoice = true;
    setTimeout(() => {
      makePlayerMove(playerMove, true);
    }, playerMoveDelayInSeconds * 1000);
  }

  function makePlayerMove(move, isFirstMove) {
    if (isFirstMove) gameRenderer.reloadPlayerAnimations();

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
  gameController.resetScores();
})();
