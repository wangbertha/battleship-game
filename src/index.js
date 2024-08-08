import { BattleshipGame } from './battleshipGame.js';
import './style.css';

const battleshipGame = BattleshipGame();

function renderGame(bsG) {
    const { realPlayer, computerPlayer } = bsG;
    const realPlayerBoard = realPlayer.gameBoard;
    const realPlayerShips = realPlayer.ships;
    const computerPlayerBoard = computerPlayer.gameBoard;
    const computerPlayerShips = computerPlayer.ships;

    const body = document.querySelector('body');

    const gameWrapper = document.createElement('div');
    gameWrapper.classList.add('game-wrapper');
    body.appendChild(gameWrapper);

    renderBoard(realPlayerBoard);
}

function renderBoard(board) {
    const gameWrapper = document.querySelector('.game-wrapper');
    
    const boardWrapper = document.createElement('div');
    boardWrapper.classList.add('board-wrapper');
    gameWrapper.appendChild(boardWrapper);

    for (let i=0; i<board.board.length; i++) {
        const boardRow = document.createElement('tr');
        boardRow.classList.add('board-row');
        for (let j=0; j<board.board.length; j++) {
            const boardCell = document.createElement('td');
            boardCell.classList.add('board-cell');
            boardRow.appendChild(boardCell);
        }
        boardWrapper.appendChild(boardRow);
    }
}

renderGame(battleshipGame);