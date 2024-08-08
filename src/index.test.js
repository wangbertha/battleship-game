const { Ship, Gameboard, RealPlayer, ComputerPlayer } = require('./battleshipGame');

const ship0 = Ship(3);
ship0.hit()
ship0.hit()
ship0.hit()
test('Ship isSunk', () => {
    expect(ship0.isSunk()).toBe(true);
});

const ship = Ship(3);
const gameBoard = Gameboard(4);
test('Gameboard insertShip successful insert', () => {
    expect(gameBoard.insertShip(ship, [3,1], 'left')).toEqual({
        board: [
            [[false, null],[false, null],[false, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]]
        ],
        ships: [ship]
    });
})
test('Gameboard insertShip insert not ship', () => {
    expect(gameBoard.insertShip(1, [3,1], 'left')).toEqual(TypeError('Error: Ship is not of Ship type'));
})
const ship2 = Ship(4);
test('Gameboard insertShip insert out of range', () => {
    expect(gameBoard.insertShip(ship2, [3,2], 'right')).toEqual(RangeError('Error: Ship is not placed within the Gameboard'));
})
test('Gameboard insertShip ship overlap', () => {
    expect(gameBoard.insertShip(ship2, [3,0], 'up')).toEqual(RangeError('Error: There is already a ship there!'));
})
test('Gameboard insertShip successful insert 2', () => {
    expect(gameBoard.insertShip(ship2, [0,0], 'up')).toEqual({
        board: [
            [[false, ship2],[false, ship2],[false, ship2],[false, ship2]],
            [[false, null],[false, ship],[false, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]]
        ],
        ships: [ship, ship2]
    });
})

test('Gameboard insertShip successful hit #1 on Ship2', () => {
    expect(gameBoard.receiveAttack([0, 0])).toEqual({
        board: [
            [[true, ship2],[false, ship2],[false, ship2],[false, ship2]],
            [[false, null],[false, ship],[false, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]]
        ],
        ships: [ship, ship2],
        hit: true,
        sunk: false
    });
})
test('Gameboard insertShip incorrect attack', () => {
    expect(gameBoard.receiveAttack([0, 0])).toEqual(RangeError('Error: There was already an attack there!'));
})
test('Gameboard insertShip successful hit #2 on Ship2', () => {
    expect(gameBoard.receiveAttack([0, 1])).toEqual({
        board: [
            [[true, ship2],[true, ship2],[false, ship2],[false, ship2]],
            [[false, null],[false, ship],[false, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]]
        ],
        ships: [ship, ship2],
        hit: true,
        sunk: false
    });
})
test('Gameboard insertShip successful hit #3 on Ship2', () => {
    expect(gameBoard.receiveAttack([0, 2])).toEqual({
        board: [
            [[true, ship2],[true, ship2],[true, ship2],[false, ship2]],
            [[false, null],[false, ship],[false, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]]
        ],
        ships: [ship, ship2],
        hit: true,
        sunk: false
    });
})
test('Gameboard insertShip successful hit #4 to sink Ship2', () => {
    expect(gameBoard.receiveAttack([0, 3])).toEqual({
        board: [
            [[true, ship2],[true, ship2],[true, ship2],[true, ship2]],
            [[false, null],[false, ship],[false, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]]
        ],
        ships: [ship],
        hit: true,
        sunk: true
    });
})
test('Gameboard insertShip missed attack', () => {
    expect(gameBoard.receiveAttack([2, 2])).toEqual({
        board: [
            [[true, ship2],[true, ship2],[true, ship2],[true, ship2]],
            [[false, null],[false, ship],[false, null],[false, null]],
            [[false, null],[false, ship],[true, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]]
        ],
        ships: [ship],
        hit: false,
        sunk: false
    });
})
test('Gameboard insertShip successful hit #1 on Ship', () => {
    expect(gameBoard.receiveAttack([1, 1])).toEqual({
        board: [
            [[true, ship2],[true, ship2],[true, ship2],[true, ship2]],
            [[false, null],[true, ship],[false, null],[false, null]],
            [[false, null],[false, ship],[true, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]]
        ],
        ships: [ship],
        hit: true,
        sunk: false
    });
})
test('Gameboard insertShip successful hit #2 on Ship', () => {
    expect(gameBoard.receiveAttack([2, 1])).toEqual({
        board: [
            [[true, ship2],[true, ship2],[true, ship2],[true, ship2]],
            [[false, null],[true, ship],[false, null],[false, null]],
            [[false, null],[true, ship],[true, null],[false, null]],
            [[false, null],[false, ship],[false, null],[false, null]]
        ],
        ships: [ship],
        hit: true,
        sunk: false
    });
})
test('Gameboard insertShip successful hit #3 to sink Ship', () => {
    expect(gameBoard.receiveAttack([3, 1])).toEqual('Player wins!');
})