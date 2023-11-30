const moves = ["Rock", "Paper", "Scissors"];

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function playGame() {
  let playerScore = 0;
  let botScore = 0;
  let result = "";
  // todo make total rounds increase by 2 in case the result is draw (or decrase i by 2)
  for (let i = 0; i < 5; i++) {
    let message =
      (result === "Draw" ? result : "") +
      `\n Your Score ${playerScore}, Computer Score: ${botScore}, Rounds Left: ${
        5 - i
      } \n please choose a move`;

    let playerMove = prompt(message);

    if (typeof playerMove !== "string" || !moves.includes(playerMove)) {
      result = "Error in the value please try again";
      i--;
      continue;
    }

    result = playRound(playerMove);
    if (result === "PC") botScore++;
    else if (result === "Player") playerScore++;
    else result = `${result} last time!`;
  }

  if (playerScore > botScore) {
    window.alert("You WIN!");
  } else if (playerScore == botScore) {
    window.alert("Draw");
  } else {
    window.alert("You Lose :-(");
  }
}

function playRound(playerMove) {
  const winning = new Map([
    ["Paper", "Rock"],
    ["Scissors", "Paper"],
    ["Rock", "Scissors"],
  ]);

  let computerChoice = moves[getRandomInt(0, 3)];

  if (winning.get(computerChoice) === playerMove) return "Player";
  else if (winning.get(playerMove) === computerChoice) return "PC";
  else return "Draw";
}
