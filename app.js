let humanScore = 0;
let computerScore = 0;
round = 1;

function evaluateScore(player, computer) {
    const outcomes = {
        rock: { rock: 'draw', paper: 'computer', scissors: 'player' },
        paper: { rock: 'player', paper: 'draw', scissors: 'computer' },
        scissors: { rock: 'computer', paper: 'player', scissors: 'draw' }
    };

    // Hashmap to determine victor based on input versus lots of if/else statements
    return outcomes[player][computer];
}

function getComputerChoice() {
    let decision = Math.ceil(Math.random()*3);
    // I know returning in each case doesn't look pretty but it exits the function faster :P
    switch (decision) {
        case 1:
            return "rock"
        case 2:
            return "paper"
        case 3:
            return "scissors"
    }
}

function getHumanChoice(incorrect = false) {
    // On recursion change the message to emphasize needing either rock, paper or scissors not alternative input
    let message = incorrect === true ? "Please choose rock, paper, or scissors! (q to quit)" : "Rock, paper, or scissors? (q to quit)";
    let choice = prompt(message);
    if (choice === null || choice === "q") {
        console.log("Game forfeited!");
        return;
    }

    // Use a "hashmap" to validate user input, toLowerCase to check no matter the case
    choice = choice.toLowerCase();
    correctInput = { rock: 'y', paper: 'y', scissors: 'y' }
    if (correctInput[choice] !== 'y')
        choice = getHumanChoice(true); // Because of how the prompt works it'll spam the client but I need correct input to evaluate the game! They can forfeit by q however

    return choice;
}

function playRound() {
    if (round > 5) {
        if (humanScore === computerScore) {
            // The only reason this can happen is because rounds are counted even if a draw is played, so it's possible to end 0-0 or in some form of a draw
            console.log("%cGame ended in a draw!", 'color: yellow');
        } else if (humanScore > computerScore) {
            console.log("%cThe player won the game!", 'color: green');
        } else {
            console.log("%cThe computer won the game!", 'color: red');
        }
        // Break recursion
        return;
    }

    // Get both of the results and evaluate them
    const human = getHumanChoice();
    const computer = getComputerChoice();
    const decision = evaluateScore(human, computer);
    switch (decision) {
        case "player":
            humanScore++;
            console.log(`%cThe player won Round ${round}`, 'color: green');
            break;
        case "computer":
            computerScore++;
            console.log(`%cThe computer won Round ${round}`, 'color: red');
            break;
        default:
            // Not necessary but this represents a draw!
            console.log(`%cRound ${round} ended in a draw!`, 'color: yellow');
            break;
    }

    console.log(`Player ${humanScore} | Computer ${computerScore}`);
    round++;
    playRound();
}

playRound();