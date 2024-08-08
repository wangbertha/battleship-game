const { Ship, Gameboard } = require('./index');

const ship = Ship(3);
// ship.hit()
// ship.hit()
// ship.hit()
// test('Ship is sunk?', () => {
//     expect(ship.isSunk()).toBe(true);
// });

const gameBoard = Gameboard();
test('insertShip test', () => {
    expect(gameBoard.insertShip(ship, [3,1], 'left')).toEqual([
        [[false, null],[false, null],[false, null],[false, null]],
        [[false, null],[false, ship],[false, null],[false, null]],
        [[false, null],[false, ship],[false, null],[false, null]],
        [[false, null],[false, ship],[false, null],[false, null]]
    ]);
})
test('insertShip insert not ship', () => {
    expect(gameBoard.insertShip(1, [3,1], 'left')).toBeNull();
})

