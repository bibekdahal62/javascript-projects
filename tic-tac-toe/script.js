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
    resetGame.classList.add("hidden");
    winMessage.firstElementChild.innerText = `Player${winner} wins`;
    winMessage.classList.remove("hidden");
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
            box.classList.add("color");
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
        box.classList.remove("color");
        box.disabled = false;
    });
    turnO = true;
    winMessage.classList.add("hidden");
    resetGame.classList.remove("hidden");
}

resetGame.addEventListener("click", reset);

newGame.addEventListener("click", reset);


