const { Ship, Gameboard } = require('./index');

const ship0 = Ship(3);
ship0.hit()
ship0.hit()
ship0.hit()
test('Ship isSunk', () => {
    expect(ship0.isSunk()).toBe(true);
});

const ship = Ship(3);
const gameBoard = Gameboard(4);
test('Gameboard insertShip nominal', () => {
    expect(gameBoard.insertShip(ship, [3,1], 'left')).toEqual([
        [[false, null],[false, null],[false, null],[false, null]],
        [[false, null],[false, ship],[false, null],[false, null]],
        [[false, null],[false, ship],[false, null],[false, null]],
        [[false, null],[false, ship],[false, null],[false, null]]
    ]);
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