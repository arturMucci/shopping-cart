require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('if fetchProducts is a function: ', () => {
    expect.assertions(1);
    expect(fetchProducts).toBeInstanceOf(Function);
  })

  test('if fetchProducts(\'computador\') calls fetch function: ', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  test('if fetchProducts(\'computador\') calls fetch with https://api.mercadolibre.com/sites/MLB/search?q=computador: ', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  })

  test('if fetch\'s function return equals computadorSearch: ', async () => {
    expect.assertions(1);
    expect(await fetchProducts('computador')).toMatchObject(computadorSearch);
  })

  test('if fetchProducts() with no parameters returns the error \'You must provide an url\': ', async () => {
    expect.assertions(1);
    expect(async () => await fetchProducts()).rejects.toThrow('You must provide an url');
  })
});