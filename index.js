const moves = ["Rock", "Paper", "Scissors", "Reset"];
const TOTAL_ROUNDS = 5;
let playerScore = 0,
  botScore = 0,
  result = "",
  roundsPlayedCount = 0;


const playerScoreText = document.querySelector("#playerScore");
const botScoreText = document.querySelector("#botScore");
const resultField = document.querySelector("#resultField");
const playerLastMoveBoard = document.querySelector("#playerLastMoveBoard");
const pcLastMoveBoard = document.querySelector("#pcLastMoveBoard");

resetRounds = () => {
  roundsPlayedCount = 0;
  resultField.innerHTML = "";
  playerLastMoveBoard.innerHTML = "";
  pcLastMoveBoard.innerHTML = "";
};

playOneRound = (moveName) => {
  roundsPlayedCount += 1;
  playRound(moveName, roundsPlayedCount);
};



for (let i = 0; i < moves.length; i++) {
  const buttonName = `#${moves[i].toLowerCase()}Btn`;
  const button = document.querySelector(buttonName);
  if (moves[i] == "Reset") {
    button.addEventListener("click", resetRounds);
  } else {
    button.addEventListener("click", () => {
      playOneRound(moves[i]);
    });
  }
}

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function playRound(moveName, totalRounds) {
  if (totalRounds > 5) {
    alert("Please start a new game");
    return;
  } else if (totalRounds <= 0) {
    alert("Internal Error");
    return;
  }

  let result = ProcessPlayerMove(moveName);
  if (result == "Player") {
    playerScore++;
  } else if (result == "PC") {
    botScore++;
  }

  playerScoreText.innerHTML = playerScore;
  botScoreText.innerHTML = botScore;

  if (totalRounds == TOTAL_ROUNDS) {
    finishGame(playerScore, botScore);
  }
}

function finishGame(playerScore, botScore) {
  let message =
    playerScore > botScore
      ? "You Win"
      : playerScore == botScore
      ? "Draw"
      : "You Lost";
  resultField.innerHTML = message;
}

function ProcessPlayerMove(playerMove) {
  const winning = new Map([
    ["Paper", "Rock"],
    ["Scissors", "Paper"],
    ["Rock", "Scissors"],
  ]);

  let computerChoice = moves[getRandomInt(0, 3)];

  let getImageName = (moveName) => {
   return "files/" + moveName.toLowerCase() + (moveName == "Scissors" ? ".jpg" : ".jpeg");
  }

  // change the last move on the board
  playerLastMoveBoard.innerHTML = `<img alt = "last player move", src="${getImageName(playerMove)}"></img>`
  pcLastMoveBoard.innerHTML = `<img alt = "last pc move", src="${getImageName(computerChoice)}"></img>`

  if (winning.get(computerChoice) === playerMove) return "PC";
  else if (winning.get(playerMove) === computerChoice) return "Player";
  else return "Draw";
}
