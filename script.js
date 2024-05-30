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

  const renderPlayerMove = () => {
    playerMoveRock.src = "/images/choices/player_rock_easy.gif";
    playerMovePaper.src = "/images/choices/player_paper_easy.gif";
    playerMoveScissors.src = "/images/choices/player_scissors_easy.gif";
  };

  return {
    renderComputerScore,
    renderPlayerScore,
    renderComputerMove,
    renderPlayerMove,
  };
})();

const gameController = (function () {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      switch (button.className) {
        case "choice-button":
          makeComputerMove();
          makePlayerMove();
          break;
        default:
          break;
      }
    });
  });

  let delayInSeconds = 0.3;

  let playerScore = 0;
  let computerScore = 0;

  //   0 = Sten, 1 = Sax, 2 = Påse
  let computerSelection = 0;
  let playerSelection = 0;

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
    setTimeout(() => {
      console.log("test");
    }, 1500);
    const move = generateRandomMove();
    gameRenderer.renderComputerMove(move);
    computerSelection = move;
  }

  function makePlayerMove() {
    setTimeout(() => {
      // Sten alltid default
      gameRenderer.renderPlayerMove(0);
      playerSelection = 0;
    }, delayInSeconds * 1000);
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
