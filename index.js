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
  playerScoreText.innerHTML = "0";
  botScoreText.innerHTML = "0";
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


function getImageName (moveName) {
  return "files/" + moveName.toLowerCase() + (moveName == "Scissors" ? ".jpg" : ".jpeg");
}


function getLastMoveBoardsHTMLs(playerMove, pcMove) {

    let htmlGenerator = (moveName) => {
      return `<img alt = "last player move", src="${getImageName(moveName)}"></img>`;
    }

    return [htmlGenerator(playerMove), htmlGenerator(pcMove)];
}


function ProcessPlayerMove(playerMove) {
  const winning = new Map([
    ["Paper", "Rock"],
    ["Scissors", "Paper"],
    ["Rock", "Scissors"],
  ]);

  let pcMove = moves[getRandomInt(0, 3)];


  // change the last move on the board
  [playerLastMoveBoard.innerHTML,pcLastMoveBoard.innerHTML] = getLastMoveBoardsHTMLs(playerMove, pcMove);

  if (winning.get(pcMove) === playerMove) return "PC";
  else if (winning.get(playerMove) === pcMove) return "Player";
  else return "Draw";
}
