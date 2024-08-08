import { BattleshipGame } from './battleshipGame.js';

const battleshipGame = BattleshipGame();

function renderGame(bsG) {
    // const { realPlayer, computerPlayer } = bsG;
    // const realPlayerBoard = realPlayer.gameBoard;
    // const realPlayerShips = realPlayer.ships;
    // const computerPlayerBoard = computerPlayer.gameBoard;
    // const computerPlayerShips = computerPlayer.ships;

    // const body = document.querySelector('body');

    // const gameWrapper = document.createElement('div');
    // gameWrapper.classList.add('game-wrapper');
    // body.appendChild(gameWrapper);

    // const realPlayerBoardWrapper = document.createElement('div');
    // realPlayerBoardWrapper.classList.add('realplayerboard-wrapper');
    // gameWrapper.appendChild(realPlayerBoardWrapper);

    // console.log(realPlayerBoard.board)
    console.log('hello');
    // for (let i=0; i<realPlayerBoard.board.length; i++) {
    //     const boardRow = document.createElement('div');
    //     boardRow.classList.add('board-row');
    //     for (let j=0; j<realPlayerBoard.board.length; j++) {
    //         const boardCell = document.createElement('div');
    //         boardCell.classList.add('board-cell');
    //         boardRow.appendChild(boardCell);
    //     }
    //     realPlayerBoardWrapper.appendChild(boardRow);
    // }
}

renderGame(battleshipGame);