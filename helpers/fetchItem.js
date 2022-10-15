const fetchItem = async (endpoint) => {
  if (!endpoint) throw new Error('You must provide an url');
  const url = `https://api.mercadolibre.com/items/${endpoint}`;
  const result = await fetch(url)
    .then((data) => data.json());
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}