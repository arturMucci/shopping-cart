require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('if it\'s a function: ', () => {
    expect.assertions(1);
    expect(fetchItem).toBeInstanceOf(Function);
  })

  test('if with an argument like \'MLB1615760527\', fetch is called: ', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  test('if with an argument like \'MLB1615760527\', fetch is called with an endpoint like \'https://api.mercadolibre.com/items/MLB1615760527\': ', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  })

  test('if fetchItem(\'MLB1615760527\') return\'s an object like the exemple: ', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toMatchObject(item);
  })

  test('if fetchItem() throw\'s an error \'You must provide an url\': ', async () => {
    expect.assertions(1);
    expect(async () => await fetchItem()).rejects.toThrow('You must provide an url');
  })
});