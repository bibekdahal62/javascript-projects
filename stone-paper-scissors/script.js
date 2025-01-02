let playerScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll(".choice");

const genComputerChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const choice = Math.floor(Math.random() * 3);
    return options[choice];
}

const gameDraw = () => {
    console.log("Game is draw");
}

const showWinner = (userWin) => {
    if(userWin)
        console.log('user wins');
    else if(!userWin)
        console.log('computer wins'); 
}

const playGame= (userChoice) => {
    console.log("User choice is ", userChoice);
    let computerChoice = genComputerChoice();
    console.log("Computer choice is ",computerChoice);

    if(userChoice === computerChoice){
        gameDraw();
    }else{
        let userWin = true;
        if(userChoice === 'rock'){
            userWin = (computerChoice === 'paper') ? false : true;
        }else if(userChoice === 'paper'){
            userWin = (computerChoice === 'scissors') ? false : true;
        }else if(userChoice === 'scissors'){
            userWin = (computerChoice === 'rock') ? false : true;
        }
        showWinner(userWin);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});