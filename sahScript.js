const chessboard = document.getElementById('chessboard');

const pieces = {
    't': '♜', 's': '♞', 'l': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
    'T': '♖', 'S': '♘', 'L': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};

const initialBoard = [
    'tslqklst',
    'pppppppp',
    '........',
    '........',
    '........',
    '........',
    'PPPPPPPP',
    'TSLQKLST'
];

// Create the chessboard
function createBoard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
            const piece = initialBoard[row][col];
            if (piece !== '.') {
                square.textContent = pieces[piece];
                square.setAttribute('draggable', true);
            }
            chessboard.appendChild(square);
        }
    }
}