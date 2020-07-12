class Player {
    constructor(image, cellStatusMarker, name) {
        this.image = image;
        this.cellStatusMarker = cellStatusMarker;
        this.name = name;
    }

    getTextWinner() {
        return `Winner: ${this.name}`;
    }
}


let player1 = new Player('<img class="cell__o" src="images/o.svg">', 1, "O");
let player2 = new Player('<img class="cell__x" src="images/x.svg">', 2, "X");
let currentPlayer = player1;
let cells = document.getElementsByClassName("cell");
let cellsStatus = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]


// Attach event to make a move when cells are clicked
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", makeMove);
}


function makeMove() {
    // Add icon
    this.innerHTML = currentPlayer.image;
    // Disable click in the same cell
    this.classList.add("cell--click-disable");

    // Changes the game check matrix values
    let d1 = parseInt(this.id / 3);
    let d2 = this.id % 3;
    cellsStatus[d1][d2] = currentPlayer.cellStatusMarker;

    let hasWinner = checkIfSomeoneWon();
    let endWithoutWinner = checkIfNobodyWon();
    if (hasWinner || endWithoutWinner) {
        // Disable clicks on game
        document.getElementsByClassName("wrap_cells")[0].classList.add("wrap_cells--click-disable");
        // Show the winner in the display
        let placeToPutWinner = document.getElementById("result");
        if (hasWinner) {
            placeToPutWinner.innerText = currentPlayer.getTextWinner();
        } else {
            placeToPutWinner.innerText = "Nobody won";
        }
    }

    // Keep playing
    currentPlayer = currentPlayer != player1 ? player1 : player2;
}


function checkIfSomeoneWon() {
    let d1, d2, fullRow, fullColumn;

    // Checks whether a row is full
    for (d1 = 0; d1 < 3; d1++) {
        fullRow = true;
        for (d2 = 0; d2 < 2; d2++) {
            if (cellsStatus[d1][d2] != cellsStatus[d1][d2 + 1] || cellsStatus[d1][d2] == 0) {
                fullRow = false;
                break;
            }
        }
        if (fullRow) {
            return true;
        }
    }

    // Checks whether a column is full
    for (d2 = 0; d2 < 3; d2++) {
        fullColumn = true;
        for (d1 = 0; d1 < 2; d1++) {
            if (cellsStatus[d1][d2] != cellsStatus[d1 + 1][d2] || cellsStatus[d1][d2] == 0) {
                fullColumn = false;
                console.log(d1, d2, cellsStatus.toString());
                break;
            }
        }
        if (fullColumn) {
            return true;
        }
    }
    console.log("\n\n");

    // Checks if any diagonal is full
    if (((cellsStatus[0][0] == cellsStatus[1][1] && cellsStatus[1][1] == cellsStatus[2][2]) ||
            (cellsStatus[0][2] == cellsStatus[1][1] && cellsStatus[1][1] == cellsStatus[2][0])) &&
        cellsStatus[1][1] != 0) {
        return true;
    }

    return false;
}


function checkIfNobodyWon() {
    for (d1 = 0; d1 < 3; d1++) {
        for (d2 = 0; d2 < 3; d2++) {
            if (cellsStatus[d1][d2] == 0) {
                return false;
            }
        }
    }
    return true;
}


function resetGame() {
    // Changes the game check matrix values to default
    for (let d1 = 0; d1 < 3; d1++) {
        for (let d2 = 0; d2 < 3; d2++) {
            cellsStatus[d1][d2] = 0;
        }
    }

    // Activates clicks in game and clear game
    document.getElementsByClassName("wrap_cells")[0].classList.remove("wrap_cells--click-disable");
    document.getElementById("result").innerText = "";
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
        cells[i].classList.remove("cell--click-disable");
    }
}