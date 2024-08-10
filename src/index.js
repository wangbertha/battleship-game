import { BattleshipGame } from './battleshipGame.js';
import './style.css';

function renderGame(bsG) {
    const { realPlayer, computerPlayer } = bsG;

    const body = document.querySelector('body');

    const mainWrapper = document.createElement('div');
    mainWrapper.classList.add('main-wrapper');
    body.appendChild(mainWrapper);
    const gameWrapper = document.createElement('div');
    const mainHeading = document.createElement('h2');
    mainHeading.textContent = 'BATTLESHIP';
    mainWrapper.appendChild(mainHeading);
    const instructions = document.createElement('p');
    instructions.innerHTML = "<strong>Step 1:</strong> Populate your board by dragging your battleships onto the board.<br><strong>Step 2:</strong> Click to attack your opponent's board.<br><strong>Win Conditions:</strong> Successfully attack and sink all of your opponent's ships!";
    mainWrapper.appendChild(instructions);
    gameWrapper.classList.add('game-wrapper');
    mainWrapper.appendChild(gameWrapper);

    renderRealPlayer(realPlayer, 'rp');
    renderComputerPlayer(computerPlayer, 'cp');
}

function renderRealPlayer(realPlayer, tag) {
    renderPlayer(realPlayer, tag);
    renderBoard(realPlayer, tag);
    renderShips(realPlayer, tag);
}

function renderComputerPlayer(computerPlayer, tag) {
    renderPlayer(computerPlayer, tag);
    renderBoard(computerPlayer, tag);
    for (const ship of Object.values(computerPlayer.ships)) {
        let needToFill = true;
        let x;
        let y;
        while (needToFill) {
            x = Math.floor(Math.random()*9);
            y = Math.floor(Math.random()*9);
            let result = computerPlayer.gameBoard.insertShip(ship, [x, y], 'right')
            if (result.board) {
                needToFill = false;
            }
        }
    }
}

function renderPlayer(player, tag) {
    const gameWrapper = document.querySelector('.game-wrapper');
    const playerWrapper = document.createElement('div');
    playerWrapper.classList.add('player-wrapper',tag)
    gameWrapper.appendChild(playerWrapper);
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
                const [rest0, shipId] = id.split('-');
                const ship = player.ships[shipId]
                const draggedElement = document.getElementById(id);
                const dropId = e.target.id;
                const [rest1, x, y] = dropId.split('-');
                const direction = 'right';
                const result = gameBoard.insertShip(ship, [x, y], direction).board;
                if (Array.isArray(result)) {
                    const shipsWrapper = playerWrapper.querySelector('.ships-wrapper');
                    shipsWrapper.removeChild(draggedElement);
                    renderShipInBoard(tag, ship, [x, y], direction);
                    if (!shipsWrapper.hasChildNodes()) {
                        renderAttackMode(battleshipGame);
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
        shipCell.textContent = key.toUpperCase();
        shipCell.classList.add('ship');
        shipCell.setAttribute('id', `${tag}-${key}`);
        shipCell.setAttribute('draggable','true');
        shipCell.style.width = ((ship.length*22)-2)+'px';
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

function renderAttackMode(btsGame) {
    renderAttackInBoard(btsGame.computerPlayer, 'cp');
}

function renderAttackInBoard(player, tag) {
    const playerWrapper = document.querySelector(`.player-wrapper.${tag}`);
    const boardCells = playerWrapper.querySelectorAll('.board-cell');
    for (const cell of boardCells) {
        cell.addEventListener('click', (e) => {
            const elementId = e.target.id;
            const [rest, x, y] = elementId.split('-');
            const result = player.gameBoard.receiveAttack([x, y]);
            cell.classList.add('hit');
            if (result.hit) {
                cell.classList.add('ship-in-board');
            }
            if (result.win) {
                alert('You win!');
                togglePlayAgain();
                return;
            }
            let needToFill = true;
            let attX;
            let attY;
            let resultReal;
            while (needToFill) {
                attX = Math.floor(Math.random()*10);
                attY = Math.floor(Math.random()*10);
                resultReal = battleshipGame.realPlayer.gameBoard.receiveAttack([attX, attY]);
                if (resultReal.board) {
                    needToFill = false;
                }
            }
            const realPlayerWrapper = document.querySelector('.player-wrapper.rp');
            const attCell = realPlayerWrapper.querySelector(`#rp-${attX}-${attY}`);
            attCell.classList.add('hit');
            if (resultReal.hit) {
                attCell.classList.add('ship-in-board');
            }
            if (resultReal.win) {
                console.log(resultReal);
                alert('The computer wins!');
                togglePlayAgain();
                return;
            }
        }, { once: true })
    }
}

function togglePlayAgain() {
    const mainWrapper = document.querySelector('.main-wrapper');
    const playagainWrapper = document.createElement('div');
    mainWrapper.appendChild(playagainWrapper);

    const playagainBtn = document.createElement('button');
    playagainBtn.textContent = 'Play Again?'
    playagainBtn.classList.add('play-again-btn');
    playagainBtn.addEventListener('click', () => {
        const body = document.querySelector('body');
        while (body.firstChild) {
            body.removeChild(body.lastChild);
        }
        battleshipGame = BattleshipGame();
        renderGame(battleshipGame);
    })
    playagainWrapper.appendChild(playagainBtn);
}

let battleshipGame = BattleshipGame();
renderGame(battleshipGame);