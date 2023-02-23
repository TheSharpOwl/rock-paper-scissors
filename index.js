var playerScore = 0;
var botScore = 0;


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


function play(moveType) {
  if (typeof moveType !== "string") {
    console.error("Error with paramter type");
    return;
  }

  const winning = new Map([
    ["Paper", "Rock"],
    ["Scissors", "Paper"],
    ["Rock", "Scissors"],
  ]);

  const moves = ["Rock", "Paper", "Scissors"]

  var computerChoice = moves[getRandomInt(0,2)];

  console.log(computerChoice);
}
