import { Player } from "./Player.js";

export function loadPlayerFromStorage() {
  let savedPlayer = localStorage.getItem("Player");
  savedPlayer = JSON.parse(savedPlayer);

  return new Player(
    savedPlayer.name,
    savedPlayer.avatar,
    savedPlayer.backgroundColor,
    savedPlayer.shadowColor
  );
}

export function loadComputerFromStorage() {
  let savedComputer = localStorage.getItem("Computer");
  savedComputer = JSON.parse(savedComputer);

  return new Player(
    savedComputer.name,
    savedComputer.avatar,
    savedComputer.backgroundColor,
    savedComputer.shadowColor
  );
}
