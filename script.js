// Variables to hold gamestate
// I'm aware this code is probably spaghetti, I'm just throwing it together and having fun with it
// Making this at 1am :D
let started = false;
let round = 1;
let scores = {
    player: 0,
    computer: 0
};
let wins = {
    player: 0,
    computer: 0
}

const playerScore = document.querySelector("#playerScore");
const computerScore = document.querySelector("#computerScore");
const output = document.querySelector("#output");

const getComputerChoice = () => {
    let choices = ['rock', 'paper', 'scissors'];
    let decision = Math.ceil(Math.random()*3);
    console.log(decision);
    return choices[decision-1];
};

const evaluateWinner = (player, computer) => {
    // Hash map containing all possibilites for each choice
    const outcomes = {
        rock: { rock: 'draw', paper: 'computer', scissors: 'player' },
        paper: { rock: 'player', paper: 'draw', scissors: 'computer' },
        scissors: { rock: 'computer', paper: 'player', scissors: 'draw' }
    };
    return outcomes[player][computer];
};

// Game of 3!
// Check if game is started => determine winner => change gamestate
const playRound = (playerChoice) => {
    let roundOutput = document.createElement("p");
    let roundWinner = evaluateWinner(playerChoice, getComputerChoice());
    switch (roundWinner) {
        case "player":
            scores.player++;
            roundOutput.textContent = `Player Won Round ${round}`;
            break;
        case "computer":
            scores.computer++;
            roundOutput.textContent = `Computer Won Round ${round}`;
            break;
        case "draw":
            roundOutput.textContent = `Round ${round} Ended in a Draw!`;
            break;
        default:
            break;
    }

    output.insertBefore(roundOutput, output.firstChild);
    round++;

    if (round > 3) {
        // determine winner and reset!
        let winnerOutput = document.createElement("p");
        if (scores.player > scores.computer) {
            wins.player++;
            winnerOutput.textContent = "🏆 Player Won! 🏆";
            playerScore.textContent = wins.player;
        } else if (scores.computer > scores.player) {
            wins.computer++;
            winnerOutput.textContent = "💔 Computer Won... 💔";
            computerScore.textContent = wins.computer;
        } else {
            winnerOutput.textContent = "😧 The game ended in a draw! 😧";
        }
        
        output.insertBefore(winnerOutput,output.firstChild);
        scores.player = 0;
        scores.computer = 0;
        round = 1;
        return; // Add a pause inbetween games
    }
};

const choices = document.querySelectorAll("button");
choices.forEach((button) => {
    button.addEventListener("click", (e) => {
        playRound(e.target.id);
    });
});
