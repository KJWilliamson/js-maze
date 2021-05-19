const map = [
    ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W'],
    ['W','F','F','F','W','F','F','F','F','F','W','F','F','F','F','F','W','F','W','F','W'],
    ['W','F','W','F','W','F','W','W','W','F','W','W','W','W','W','F','W','F','W','F','W'],
    ['W','F','W','F','W','F','F','F','W','F','F','F','F','F','W','F','W','F','F','F','W'],
    ['W','F','W','W','W','W','W','W','W','F','W','F','W','W','W','F','W','F','W','F','W'],
    ['W','F','F','F','F','F','F','F','F','F','W','F','F','F','F','F','W','F','W','F','W'],
    ['W','F','W','W','W','F','W','W','W','W','W','F','W','W','W','W','W','F','W','F','W'],
    ['W','F','W','F','F','F','W','F','F','F','W','F','W','F','F','F','F','F','W','F','W'],
    ['W','F','W','W','W','W','W','F','W','F','W','F','W','F','W','W','W','F','W','F','E'],
    ['P','F','F','F','F','F','W','F','W','F','W','F','W','F','W','F','W','F','W','W','W'],
    ['W','W','W','W','W','F','W','F','W','F','W','F','W','F','W','F','W','F','W','F','W'],
    ['W','F','F','F','F','F','W','F','W','F','W','F','F','F','W','F','W','F','W','F','W'],
    ['W','F','W','W','W','W','W','W','W','F','W','W','W','W','W','F','W','F','W','F','W'],
    ['W','F','F','F','F','F','F','F','W','F','F','F','F','F','F','F','W','F','F','F','W'],
    ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W'],
];  

const mapTarget = document.querySelector('main');
//player position
const playerP = {
    row: 0,
    cell: 0,
}
let gameActive = true;

for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const rowModel = map[rowIndex];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    rowElement.dataset.rowIndex = rowIndex;
    mapTarget.appendChild(rowElement);


    for (let cellIndex = 0; cellIndex < rowModel.length; cellIndex++) {
        const cellType = rowModel[cellIndex];
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell', cellType);
        cellElement.id = rowIndex + "-" + cellIndex;
        cellElement.dataset.rowIndex = rowIndex;
        cellElement.dataset.cellIndex = cellIndex;
        cellElement.dataset.type = cellType;
        
        if (cellType === 'P'){
            playerP.row = rowIndex;
            playerP.cell = cellIndex;
        }

        rowElement.appendChild(cellElement);
        
    }
}


document.addEventListener('keydown', movePlayer);

function movePlayer(event){
    let player = document.querySelector(".P");
    let currentX = parseInt(player.dataset.cellIndex);
    let currentY = parseInt(player.dataset.rowIndex);
    let destination;
    function classChange(){
        player.className = "cell F";
        destination.className = "cell P";
    }
    if (gameActive) {
        if (event.key == "ArrowRight"){
            destination = document.getElementById(currentY +"-"+ (currentX+1))
            if (!destination.classList.contains("W")){
                classChange();
                playerP.cell += 1;
            }
        }
        if (event.key == "ArrowLeft"){
            destination = document.getElementById((currentY) +"-"+ (currentX-1))
            if (!destination.classList.contains("W")){
                classChange();
                playerP.cell -= 1;
            }
        }
        if (event.key == "ArrowUp"){
            destination = document.getElementById((currentY-1) +"-"+ (currentX))
            if (!destination.classList.contains("W")){
                classChange();
                playerP.row -= 1;
            }
        }
        if (event.key == "ArrowDown"){
            destination = document.getElementById((currentY+1) +"-"+ (currentX))
            if (!destination.classList.contains("W")){
                classChange();
                playerP.row += 1;
            }
        }
        endGame()
    }
}

function checkWin(){
    if (playerP.row === 8 && playerP.cell === 20){
        //return true

        alert("You solved the maze!");
        
    }
}

function endGame(){
    if ((checkWin())){
        gameActive = false;
        
        document.getElementById("gameWin").innerHTML = "You solved the maze! Amazing!"
    } 
} 
