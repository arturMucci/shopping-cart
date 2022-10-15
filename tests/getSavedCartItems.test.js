const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('if with something like saveCartItems(\'MLB1341706310\') localStorage.setItem is called: ', () => {
    expect.assertions(1);
    getSavedCartItems('MLB1341706310');
    expect(localStorage.getItem).toHaveBeenCalled();
  })

  test('if with something like saveCartItems(\'MLB1341706310\') localStorage.setItem is called with those parameters: ', () => {
    expect.assertions(1);
    const key = 'cartItems';
    getSavedCartItems('MLB1341706310');
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
  })
});