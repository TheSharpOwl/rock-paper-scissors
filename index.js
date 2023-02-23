let playerScore = 0;
let botScore = 0;

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

function play(playerMove) {
  const winning = new Map([
    ["Paper", "Rock"],
    ["Scissors", "Paper"],
    ["Rock", "Scissors"],
  ]);

  const moves = ["Rock", "Paper", "Scissors"];
    
  if (typeof playerMove !== 'string' || !moves.includes(playerMove)) {
    console.error("Error with paramter type");
    return;
  }


  let computerChoice = moves[getRandomInt(0, 3)];
  
  if (winning.get(computerChoice) === playerMove) botScore++;
  else if (winning.get(playerMove) === computerChoice) playerScore++;

  console.log(`Player Score: ${playerScore}, Computer Score: ${botScore}`);
}
