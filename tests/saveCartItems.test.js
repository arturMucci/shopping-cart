const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('if with something like saveCartItems(\'MLB1341706310\') localStorage.setItem is called: ', () => {
    expect.assertions(1);
    saveCartItems('MLB1341706310');
    expect(localStorage.setItem).toHaveBeenCalled();
  })

  test('if with something like saveCartItems(\'MLB1341706310\') localStorage.setItem is called with those parameters: ', () => {
    expect.assertions(1);
    const key = 'cartItems';
    const value = 'MLB1341706310';
    saveCartItems('MLB1341706310');
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  })
});