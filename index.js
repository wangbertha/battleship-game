function Ship(shipLength) {
    let length = shipLength;
    let hitCount = null;

    function hit() {
        hitCount++;
    }

    function isSunk() {
        if (hitCount===length) {
            return true;
        }
        return false;
    }

    return { length, hit, isSunk };
}

function Gameboard() {
    const boardSize = 4;
    let board = buildBoard(boardSize);

    function buildBoard(size) {
        let tempBoard = [];
        for (let i=0; i<size; i++) {
            let row = [];
            for (let j=0; j<size; j++) {
                row.push([false, null]);
            }
            tempBoard.push(row);
        }
        return tempBoard;
    }

    function insertShip(ship, [startX, startY], direction) {
        if (typeof ship !== typeof Ship()) {
            return null;
        }
        const SHIP_INDEX = 1;
        let mover;
        (direction==='left' || direction==='down') ? mover = -1 : mover = 1;
        if (direction==='left' || direction==='right') {
            for (let i=0; i<ship.length; i++) {
                board[startX+(i*mover)][startY][SHIP_INDEX] = ship;
            }
        }
        else {
            for (let i=0; i<ship.length; i++) {
                board[startX][startY+(i*mover)][SHIP_INDEX] = ship;
            }
        }
        return board;
    }

    function receiveAttack([x, y]) {
        
    }

    return { insertShip, receiveAttack };
}

module.exports = {
    Ship,
    Gameboard
}