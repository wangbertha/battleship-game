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
    const boardSize = 10;
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

    function insertShip(shipLength) {
        
    }

    function receiveAttack([i, j]) {
        
    }

    return { insertShip, receiveAttack };
}

module.exports = {
    Ship,
    Gameboard
}