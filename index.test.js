const { Ship, Gameboard } = require('./index');

const ship = Ship(3);
test('Ship is sunk?', () => {
  expect(ship.isSunk()).toBe(false);
});