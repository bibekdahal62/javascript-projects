let playerScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll(".choice");
let message = document.querySelector("#message");

const genComputerChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const choice = Math.floor(Math.random() * 3);
    return options[choice];
}

const gameDraw = () => {
    message.innerText = "Game was draw. Play again..";
    message.style.backgroundColor = "rgb(58, 58, 58)";
}

const playerWins = (playerChoice, computerChoice) => {
    playerScore++;
    document.querySelector("#player").innerText = playerScore;
    message.innerText = `You win. ${playerChoice} beats ${computerChoice}`;
    message.style.backgroundColor = "green";
}

const computerWins = (playerChoice, computerChoice) => {
    computerScore++;
    document.querySelector("#computer").innerText = computerScore;
    message.innerText = `You lost. ${computerChoice} beats ${playerChoice}`;
    message.style.backgroundColor = "red";
}

const showWinner = (playerWin, playerChoice, computerChoice) => {
    if(playerWin){
        playerWins(playerChoice, computerChoice);
    }
    else{
        computerWins(playerChoice, computerChoice);
    }
}

const playGame= (playerChoice) => {
    console.log("User choice is ", playerChoice);
    let computerChoice = genComputerChoice();
    console.log("Computer choice is ",computerChoice);

    if(playerChoice === computerChoice){
        gameDraw();
    }else{
        let playerWin = true;
        if(playerChoice === 'rock'){
            playerWin = (computerChoice === 'paper') ? false : true;
        }else if(playerChoice === 'paper'){
            playerWin = (computerChoice === 'scissors') ? false : true;
        }else{
            playerWin = (computerChoice === 'rock') ? false : true;
        }
        showWinner(playerWin, playerChoice, computerChoice);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const playerChoice = choice.getAttribute("id");
        playGame(playerChoice);
    });
});