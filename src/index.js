import { BattleshipGame } from './battleshipGame.js';
import './style.css';

function renderGame(bsG) {
    const { realPlayer, computerPlayer } = bsG;

    const body = document.querySelector('body');

    const gameWrapper = document.createElement('div');
    gameWrapper.classList.add('game-wrapper');
    body.appendChild(gameWrapper);

    renderPlayer(realPlayer);
}

function renderPlayer(player) {
    renderBoard(player);
    renderShips(player);
}

function renderBoard(player) {
    const board = player.gameBoard;
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
            boardCell.setAttribute('id',`cell-${i}-${j}`);
            boardCell.addEventListener('dragover', (e) => {
                e.preventDefault();
            })
            boardCell.addEventListener('drop', (e) => {
                const id = e.dataTransfer.getData('text');
                const ship = player.ships[id]
                const draggedElement = document.getElementById(id);
                const dropId = e.target.id;
                const [tag, x, y] = dropId.split('-');
                const direction = 'right';
                const result = board.insertShip(ship, [x, y], direction).board;

                if (Array.isArray(result)) {
                    const shipsWrapper = document.querySelector('.ships-wrapper');
                    shipsWrapper.removeChild(draggedElement);
                    renderShipInBoard(ship, [x, y], direction);
                    if (!shipsWrapper.hasChildNodes()) {
                        renderAttackMode();
                        console.log('Time to attack!')
                    }
                }

                e.dataTransfer.clearData();
            })
            boardRow.appendChild(boardCell);
        }
        boardWrapper.appendChild(boardRow);
    }
}

function renderShipInBoard(ship, [x, y], direction) {
    let mover;
    (direction==='up' || direction==='left') ? mover = -1 : mover = 1;
    if (direction==='up' || direction==='down') {
        for (let i=0; i<ship.length; i++) {
            const indexX = parseInt(x) + (i*mover);
            const boardCell = document.querySelector(`#cell-${indexX}-${y}`);
            if (!boardCell) {
                return new RangeError('Error: Ship is not placed within the Gameboard');
            }
            if (boardCell.classList.contains('ship-in-board')) {
                return new RangeError('Error: There is already a ship there!')
            }
            boardCell.classList.add('ship-in-board');
        }
    }
    else {
        for (let i=0; i<ship.length; i++) {
            const indexY = parseInt(y) + (i*mover);
            const boardCell = document.querySelector(`#cell-${x}-${indexY}`);
            if (!boardCell) {
                return new RangeError('Error: Ship is not placed within the Gameboard');
            }
            if (boardCell.classList.contains('ship-in-board')) {
                return new RangeError('Error: There is already a ship there!')
            }
            boardCell.classList.add('ship-in-board');
        }
    }
}

function renderShips(player) {
    const ships = player.ships
    const gameWrapper = document.querySelector('.game-wrapper');
    const shipsWrapper = document.createElement('div');
    shipsWrapper.classList.add('ships-wrapper');
    gameWrapper.appendChild(shipsWrapper);

    for (const [key, ship] of Object.entries(ships)) {
        const shipCell = document.createElement('div');
        shipCell.textContent = key;
        shipCell.classList.add('ship');
        shipCell.setAttribute('id', key);
        shipCell.setAttribute('draggable','true');
        shipCell.style.width = (ship.length*22)+'px';
        shipCell.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.id);
        })
        shipsWrapper.appendChild(shipCell);
    }
}

const battleshipGame = BattleshipGame();
renderGame(battleshipGame);
renderAttackMode()