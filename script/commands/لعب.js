module.exports.config = {
    name: "لعب",
    eventType: ["message"],
    version: "1.0.0",
    credits: "OpenAI",
    description: "Play Tic Tac Toe in the chat",
    dependencies: {}
};

const games = {};

function renderBoard(board) {
    return board.map(row => row.join('')).join('\n');
}

function checkWinner(board) {
    const winningCombinations = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a[0]][a[1]] !== '⬛' && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
            return board[a[0]][a[1]];
        }
    }

    return null;
}

module.exports.run = async function ({ api, event }) {
    const { threadID, messageID, senderID, body } = event;

    if (!games[threadID]) {
        games[threadID] = {
            board: [
                ['⬛', '⬛', '⬛'],
                ['⬛', '⬛', '⬛'],
                ['⬛', '⬛', '⬛']
            ],
            players: [senderID],
            currentTurn: senderID,
            symbols: { [senderID]: '⭕' }
        };

        return api.sendMessage("بدأت اللعبة! لاعب 1 هو ⭕، لاعب 2 هو ❌.\nاستخدم الأرقام من 1 إلى 9 للعب.", threadID);
    }

    const game = games[threadID];

    if (!game.players.includes(senderID)) {
        if (game.players.length < 2) {
            game.players.push(senderID);
            game.symbols[senderID] = '❌';
        } else {
            return api.sendMessage("هناك بالفعل لاعبين في اللعبة.", threadID);
        }
    }

    if (senderID !== game.currentTurn) {
        return api.sendMessage("ليس دورك الآن!", threadID);
    }

    const position = parseInt(body);
    if (isNaN(position) || position < 1 || position > 9) {
        return api.sendMessage("يرجى اختيار رقم من 1 إلى 9.", threadID);
    }

    const row = Math.floor((position - 1) / 3);
    const col = (position - 1) % 3;

    if (game.board[row][col] !== '⬛') {
        return api.sendMessage("هذه الخانة مشغولة بالفعل. اختر خانة أخرى.", threadID);
    }

    game.board[row][col] = game.symbols[senderID];
    game.currentTurn = game.players.find(id => id !== senderID);

    const winner = checkWinner(game.board);
    if (winner) {
        api.sendMessage(renderBoard(game.board) + `\n${winner} فاز باللعبة!`, threadID);
        delete games[threadID];
        return;
    }

    if (game.board.flat().every(cell => cell !== '⬛')) {
        api.sendMessage(renderBoard(game.board) + "\nانتهت اللعبة بالتعادل!", threadID);
        delete games[threadID];
        return;
    }

    return api.sendMessage(renderBoard(game.board), threadID);
};
