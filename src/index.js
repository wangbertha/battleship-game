import { BattleshipGame } from './battleshipGame.js';
import './style.css';

function renderGame(bsG) {
    const { realPlayer, computerPlayer } = bsG;

    const body = document.querySelector('body');

    const gameWrapper = document.createElement('div');
    gameWrapper.classList.add('game-wrapper');
    body.appendChild(gameWrapper);

    renderPlayer(realPlayer, 'rp');
    renderPlayer(computerPlayer, 'cp');
}

function renderPlayer(player, tag) {
    const gameWrapper = document.querySelector('.game-wrapper');
    const playerWrapper = document.createElement('div');
    playerWrapper.classList.add('player-wrapper',tag)
    gameWrapper.appendChild(playerWrapper);
    renderBoard(player, tag);
    renderShips(player, tag);
}

function renderBoard(player, tag) {
    const gameBoard = player.gameBoard;
    const playerWrapper = document.querySelector(`.player-wrapper.${tag}`);
    
    const boardWrapper = document.createElement('div');
    boardWrapper.classList.add('board-wrapper');
    playerWrapper.appendChild(boardWrapper);

    for (let i=0; i<gameBoard.board.length; i++) {
        const boardRow = document.createElement('tr');
        boardRow.classList.add('board-row');
        for (let j=0; j<gameBoard.board.length; j++) {
            const boardCell = document.createElement('td');
            boardCell.classList.add('board-cell');
            boardCell.setAttribute('id',`${tag}-${i}-${j}`);
            boardCell.addEventListener('dragover', (e) => {
                e.preventDefault();
            })
            boardCell.addEventListener('drop', (e) => {
                const id = e.dataTransfer.getData('text');
                const [tag, shipId] = id.split('-');
                const ship = player.ships[shipId]
                const draggedElement = document.getElementById(id);
                const dropId = e.target.id;
                const [rest, x, y] = dropId.split('-');
                const direction = 'right';
                const result = gameBoard.insertShip(ship, [x, y], direction).board;
                console.log(result);
                if (Array.isArray(result)) {
                    const shipsWrapper = playerWrapper.querySelector('.ships-wrapper');
                    shipsWrapper.removeChild(draggedElement);
                    renderShipInBoard(tag, ship, [x, y], direction);
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

function renderShips(player, tag) {
    const ships = player.ships
    const playerWrapper = document.querySelector(`.player-wrapper.${tag}`);
    const shipsWrapper = document.createElement('div');
    shipsWrapper.classList.add('ships-wrapper');
    playerWrapper.appendChild(shipsWrapper);

    for (const [key, ship] of Object.entries(ships)) {
        const shipCell = document.createElement('div');
        shipCell.textContent = key;
        shipCell.classList.add('ship');
        shipCell.setAttribute('id', `${tag}-${key}`);
        shipCell.setAttribute('draggable','true');
        shipCell.style.width = (ship.length*22)+'px';
        shipCell.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.id);
        })
        shipsWrapper.appendChild(shipCell);
    }
}

function renderShipInBoard(tag, ship, [x, y], direction) {
    let mover;
    (direction==='up' || direction==='left') ? mover = -1 : mover = 1;
    if (direction==='up' || direction==='down') {
        for (let i=0; i<ship.length; i++) {
            const indexX = parseInt(x) + (i*mover);
            const boardCell = document.querySelector(`#${tag}-${indexX}-${y}`);
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
            const boardCell = document.querySelector(`#${tag}-${x}-${indexY}`);
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

const battleshipGame = BattleshipGame();
renderGame(battleshipGame);