const gameRenderer = (function () {
  const playerScore = document.querySelector("#player-score");
  const computerScore = document.querySelector("#computer-score");

  const renderPlayerScore = (value) => (playerScore.textContent = value);
  const renderComputerScore = (value) => (computerScore.textContent = value);

  return {
    renderComputerScore,
    renderPlayerScore,
  };
})();

const gameController = (function () {
  let playerScore = 0;
  let computerScore = 0;

  const getPlayerScore = () => playerScore;
  const getComputerScore = () => computerScore;

  const increasePlayerScore = () => playerScore++;
  const increaseComputerScore = () => computerScore++;

  return {
    getComputerScore,
    getPlayerScore,
    increaseComputerScore,
    increasePlayerScore,
  };
})();
