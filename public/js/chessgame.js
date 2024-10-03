const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");
let playerRole = null;

const renderBoard = () => {
    console.log("Rendering board. Player role:", playerRole);
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowIndex) => {
        row.forEach((square, colIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add(
                "square",
                (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"
            );
            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = colIndex;

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece",
                    square.color === "w" ? "white" : "black"
                );
                pieceElement.innerText = getPieceUnicode(square);
                const isDraggable = playerRole === square.color && chess.turn() === square.color;
                pieceElement.draggable = isDraggable;
                console.log(`Piece at ${rowIndex},${colIndex}: color=${square.color}, draggable=${isDraggable}`);
                
                pieceElement.addEventListener("dragstart", (e) => {
                    if (isDraggable) {
                        e.dataTransfer.setData("text/plain", JSON.stringify({row: rowIndex, col: colIndex}));
                    }
                });
                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) => e.preventDefault());
            squareElement.addEventListener("drop", handleDrop);

            boardElement.appendChild(squareElement);
        });
    });
};

const handleDrop = (e) => {
    e.preventDefault();
    const sourceSquare = JSON.parse(e.dataTransfer.getData("text/plain"));
    const targetSquare = {
        row: parseInt(e.target.dataset.row || e.target.parentElement.dataset.row),
        col: parseInt(e.target.dataset.col || e.target.parentElement.dataset.col)
    };
    
    const move = {
        from: `${String.fromCharCode(97 + sourceSquare.col)}${8 - sourceSquare.row}`,
        to: `${String.fromCharCode(97 + targetSquare.col)}${8 - targetSquare.row}`,
        promotion: 'q',
    };

    console.log("Attempting move:", move);
    socket.emit("move", move);
};

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙",
        k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♙"
    };
    return unicodePieces[piece.type] || "";
};

socket.on("playerRole", function(role) {
    console.log("Received player role:", role);
    playerRole = role;
    renderBoard();
});

socket.on("spectatorRole", function() {
    console.log("Received spectator role");
    playerRole = null;
    renderBoard();
});

socket.on("boardState", function(fen) {
    console.log("Received board state:", fen);
    chess.load(fen);
    renderBoard();
});

socket.on("move", function(move) {
    console.log("Received move from server:", move);
    chess.move(move);
    renderBoard();
});

socket.on("invalidMove", function(move) {
    console.log("Invalid move:", move);
    // You could add some UI feedback here
});

// Initial render
renderBoard();