module.exports.config = {
    name: "لعب",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "عمر",
    description: "لعبة احزر العلم",
    usages: ["لعبة"],
    commandCategory: "العاب",
    cooldowns: 0
};

// Initialize the board with empty squares
let board = [["⬜️", "⬜️", "⬜️"],
             ["⬜️", "⬜️", "⬜️"],
             ["⬜️", "⬜️", "⬜️"]];

// Function to print the board
function printBoard() {
    for (let row of board) {
        console.log(row.join(" "));
    }
}

// Function to check if the game is over
function checkGameOver() {
    // Check rows
    for (let row of board) {
        if (row.every(square => square === "❌") || row.every(square => square === "⭕️")) {
            return true;
        }
    }
    // Check columns
    for (let col = 0; col < 3; col++) {
        if ((board[0][col] === "❌" && board[1][col] === "❌" && board[2][col] === "❌") ||
            (board[0][col] === "⭕️" && board[1][col] === "⭕️" && board[2][col] === "⭕️")) {
            return true;
        }
    }
    // Check diagonals
    if ((board[0][0] === "❌" && board[1][1] === "❌" && board[2][2] === "❌") ||
        (board[0][2] === "❌" && board[1][1] === "❌" && board[2][0] === "❌") ||
        (board[0][0] === "⭕️" && board[1][1] === "⭕️" && board[2][2] === "⭕️") ||
        (board[0][2] === "⭕️" && board[1][1] === "⭕️" && board[2][0] === "⭕️")) {
        return true;
    }
    // Check for tie
    if (board.every(row => row.every(square => square !== "⬜️"))) {
        console.log("It's a tie!");
        return true;
    }
    return false;
}

// Function to play the game
function playGame() {
    let currentPlayer = "❌";

    while (!checkGameOver()) {
        printBoard();
        let row = parseInt(prompt(`Player ${currentPlayer === "❌" ? "1" : "2"} enter row (0-2): `));
        let col = parseInt(prompt(`Player ${currentPlayer === "❌" ? "1" : "2"} enter column (0-2): `));

        if (board[row][col] === "⬜️") {
            board[row][col] = currentPlayer;
            currentPlayer = (currentPlayer === "❌") ? "⭕️" : "❌";
        } else {
            console.log("That square is already taken. Try again!");
        }
    }

    printBoard();
    console.log(`Player ${(currentPlayer === "❌") ? "2" : "1"} wins!`);
}

// Start the game
playGame();
