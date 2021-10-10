
const buttons = document.querySelectorAll('.button');
const result = document.querySelector('.results');
const playerScoreSpan = document.querySelector('.playerScore');
const computerScoreSpan = document.querySelector('.computerScore');
const scoreDiv = document.querySelector('.score');
const winnerDiv = document.querySelector('.winner');
const reset = document.getElementById('resetgame');
const resetDiv = document.querySelector('div.resetgame');

let roundsText = [];
let playerScore = 0;
let computerScore = 0;

reset.addEventListener('click', (e) => {
    resetDiv.style.display = 'none';
    toggleDisableButtons()
    playerScore = 0;
    computerScore = 0;
    roundsText = [];
    result.innerHTML = '';
    printScore(playerScore, computerScore);
    scoreDiv.style.backgroundColor = '';
    winnerDiv.innerHTML = '';
});

buttons.forEach(btn => btn.addEventListener('click', (e) => {
    playRound(btn.id);
    printResults(); 
}));

function toggleDisableButtons() {
    buttons.forEach(btn => btn.disabled = !btn.disabled);
}

function printResults() {
    result.innerHTML = '';
    let i = roundsText.length;
    roundsText.forEach(str => {
        result.innerHTML += `${i--}. ${str}<br>`;
    });  
}

function printScore(player, computer) {
    playerScoreSpan.innerHTML = player;
    computerScoreSpan.innerHTML = computer;

    if (player >= 5 || computer >= 5) {
        scoreDiv.style.backgroundColor = (player > computer) ? 'lightgreen' : 'lightcoral';
        winnerDiv.innerHTML += (player > computer) ? "PLAYER WINS!" : "COMPUTER WINS!";
        resetDiv.style.display = 'block';
        toggleDisableButtons()
    }
}

// Uses a random number to select one of rock, paper or scissors.
function computerPlay() {
    let gameItems = ['rock', 'paper', 'scissors']
    return gameItems[Math.floor(Math.random() * 3)];
}

// This function takes two arguments of [rock, paper or scissors]
// and compare them to decide the winner.
// Returns 1 if the first argument beats the second argument.
// Returns -1 if the second argument beats the first argument.
// Returns 0 if the first argument is the same as the second argument.
function compareSelections(playerSelection, computerSelection) {  
    switch (playerSelection) {
        case computerSelection:
            return 0;
        case 'rock':
            return (computerSelection == 'scissors') ? 1 : -1;
        case 'paper':
            return (computerSelection == 'rock') ? 1 : -1;
        case 'scissors':
            return (computerSelection == 'paper') ? 1 : -1;
    }
}

function playRound(playerSelection) {
    let computerSelection = computerPlay();
    let playerSelCapitalized = playerSelection[0].toUpperCase() + playerSelection.slice(1);
    switch (compareSelections(playerSelection, computerSelection)) {
        case 1:
            roundsText.unshift(`You win! ${playerSelCapitalized} beats ${computerSelection}.`);
            playerScore++;
            break;
        case -1:
            roundsText.unshift(`You lose! ${playerSelCapitalized} loses to ${computerSelection}.`);
            computerScore++;
            break;
        case 0:
            roundsText.unshift(`Tie! ${playerSelCapitalized} vs. ${computerSelection}.`);
    }
    printScore(playerScore, computerScore);
}

