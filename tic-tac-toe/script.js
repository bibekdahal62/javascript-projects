let boxes = document.querySelectorAll(".box");
let resetGame = document.querySelector("#reset-game");
let winMessage = document.querySelector(".win-message");
let newGame = document.querySelector("#new-game");

let turnO = true;

const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const showWinner = (winner) => {
    resetGame.style.display = "none";
    winMessage.firstElementChild.innerText = `Player${winner} wins`;
    winMessage.style.display = "block";
}


const checkWinner = () => {
    for(let position of winningPattern){
        let pos1 = boxes[position[0]].innerText;
        let pos2 = boxes[position[1]].innerText;
        let pos3 = boxes[position[2]].innerText;
        
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3 && pos1 === pos3){

                showWinner(pos1);
               
                boxes.forEach(box => {
                    box.disabled = true;
                });
            }
        }
    }
}


boxes.forEach(box =>{
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});


const reset = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true;
    winMessage.style.display = "none";
    resetGame.style.display = "block";
}

resetGame.addEventListener("click", reset);

newGame.addEventListener("click", reset);


