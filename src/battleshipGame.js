function Ship(shipLength) {
    let length = shipLength;
    let hitCount = 0;

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
    let ships = [];

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

    function deepcopyBoard(copyBoard) {
        let tempBoard = buildBoard(copyBoard.length);
        for (let i=0; i<copyBoard.length; i++) {
            for (let j=0; j<copyBoard[0].length; j++) {
                for (let k=0; k<copyBoard[0][0].length; k++) {
                    tempBoard[i][j][k] = copyBoard[i][j][k];
                }
            }
        }
        return tempBoard;
    }

    function insertShip(playerShip, [startX, startY], direction) {
        const insertResult = insertShipInBoard(board, playerShip, [startX, startY], direction);
        if (Array.isArray(insertResult)) {
            board = insertResult;
            ships.push(playerShip);
            return { board: insertResult, ships: ships };
        }
        return insertResult;
    }

    function insertShipInBoard(playerBoard, playerShip, [startX, startY], direction) {
        if (typeof playerShip !== typeof Ship()) {
            return TypeError('Error: Ship is not of Ship type');
        }
        let tempBoard = deepcopyBoard(playerBoard);
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
        const attackResult = receiveAttackInBoard(board, ships, [x, y]);
        if (attackResult.board) {
            board = attackResult.board;
            ships = attackResult.ships;
            if (attackResult.ships.length===0) {
                return 'Player wins!';
            }
        }
        return attackResult;
    }

    function receiveAttackInBoard(playerBoard, playerShips, [x, y]) {
        let tempBoard = deepcopyBoard(playerBoard);
        if (x<0 || x>=tempBoard.length || y<0 || y>tempBoard.length) {
            return new RangeError('Error: Attack is not within the Gameboard');
        }
        const initialSpace = tempBoard[x][y];
        const ATTACKED_INDEX = 0;
        const SHIP_INDEX = 1;
        if (initialSpace[ATTACKED_INDEX]) {
            return new RangeError('Error: There was already an attack there!')
        }
        tempBoard[x][y][ATTACKED_INDEX] = true;
        if (initialSpace[SHIP_INDEX]) {
            const ship = initialSpace[SHIP_INDEX];
            ship.hit();
            if (ship.isSunk()) {
                let newShips = playerShips.filter((s) => s !== ship);
                return { board: tempBoard, ships: newShips, hit: true, sunk: true }
            }
            return { board: tempBoard, ships: playerShips, hit: true, sunk: false }
        }
        return { board: tempBoard, ships: playerShips, hit: false, sunk: false };
    }

    return { board, insertShip, receiveAttack };
}

function RealPlayer() {
    const gameBoard = Gameboard(10);
    const ships = {
        carrier: Ship(5),
        battleship: Ship(4),
        cruiser: Ship(3),
        submarine: Ship(3),
        destroyer: Ship(2)
    }

    return { gameBoard, ships };
}

function ComputerPlayer() {
    const gameBoard = Gameboard(10);
    const ships = {
        carrier: Ship(5),
        battleship: Ship(4),
        cruiser: Ship(3),
        submarine: Ship(3),
        destroyer: Ship(2)
    }

    return { gameBoard, ships };
}

function BattleshipGame() {
    const realPlayer = RealPlayer();
    const computerPlayer = ComputerPlayer();

    return { realPlayer, computerPlayer };
}

export {
    Ship,
    Gameboard,
    RealPlayer,
    ComputerPlayer,
    BattleshipGame
};