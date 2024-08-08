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

function Gameboard(inputSize) {
    let board = buildBoard(inputSize);

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

    function insertShip(playerShip, [startX, startY], direction) {
        tempBoard = insertShipInBoard(board, playerShip, [startX, startY], direction);
        if (Array.isArray(tempBoard)) {
            board = tempBoard;
        }
        return tempBoard;
    }

    function insertShipInBoard(playerBoard, playerShip, [startX, startY], direction) {
        if (typeof playerShip !== typeof Ship()) {
            return TypeError('Error: Ship is not of Ship type');
        }
        let tempBoard = [];
        for (let i=0; i<playerBoard.length; i++) {
            tempBoard[i] = playerBoard[i].slice();
        }
        const SHIP_INDEX = 1;
        let mover;
        (direction==='left' || direction==='down') ? mover = -1 : mover = 1;
        if (direction==='left' || direction==='right') {
            for (let i=0; i<playerShip.length; i++) {
                const indexX = startX + (i*mover);
                if (indexX<0 || indexX>=tempBoard.length) {
                    return new RangeError('Error: Ship is not placed within the Gameboard');
                }
                if (tempBoard[indexX][startY][SHIP_INDEX]) {
                    return new RangeError('Error: There is already a ship there!')
                }
                tempBoard[indexX][startY][SHIP_INDEX] = playerShip;
            }
        }
        else {
            for (let i=0; i<playerShip.length; i++) {
                const indexY = startY + (i*mover);
                if (indexY<0 || indexY>=tempBoard.length) {
                    return new RangeError('Error: Ship is not placed within the Gameboard');
                }
                if (tempBoard[startX][indexY][SHIP_INDEX]) {
                    return new RangeError('Error: There is already a ship there!')
                }
                tempBoard[startX][indexY][SHIP_INDEX] = playerShip;
            }
        }
        return tempBoard;
    }

    function receiveAttack([x, y]) {
        
    }

    return { insertShip, receiveAttack };
}

module.exports = {
    Ship,
    Gameboard
}